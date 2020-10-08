---
hide_title: true
sidebar_label: ECL EKF Sensor Fusion
---

## GPS usage in EKF

PX4 Firmware version, 1.10.1

### EKF Status

ekf status, global position valid:
```cpp Title="ekf_helper.cpp"
bool Ekf::global_position_is_valid()
{
	// return true if the origin is set we are not doing unconstrained free inertial navigation
	// and have not started using synthetic position observations to constrain drift
	return (_NED_origin_initialised && !_deadreckon_time_exceeded && !_using_synthetic_position);
}
```

### `Ekf2::Run()` in `modules/ekf2/ekf2_main.cpp`
In the `Ekf2::Run()` function, the GPS updates are attempted when new `sensor_combined` data is available. If GPS have updates and enabled in EKF fusion, then `blend_gps_data()` is performed, where it should fail because we only have 1 GPS? Then the hardcoded logic is used to set the `_gps_select_index`. Eventually, the selected GPS data, is set to EKF by `setGpsData()`, and also output as logged `ekf_gps_position` uORB topic.

Within `setGpsData()`, there is a logic `collect_gps(const gps_message &gps)`, it has a treatment of GPS relative position initialisation. It supports GPS initialisation, after the filter has been running. WHat it does is to take the current state estimate from the filter, perform `map_projection_reproject` with the negative of the state estimate, so we can obtain the starting position's latitude and longitude, and use that to `map_projection_init_timestamped`. It will return with `_NED_origin_initialised && (gps.fix_type >= 3)`. At last, a sample is prepared, and `_gps_buffer` is updated, stored as NE earth frame position in meters. 

### `Ekf::update()` in `lib/ecl/EKF/control.cpp`

Ekf is a member variable within the EKF2 class, and its member function `update()` is called within `Ekf2::Run()` function, after all the sensor data gathering logic. 

Within the update function, it calls `controlFusionModes()` when there is imu update. It in turn calls `controlGpsFusion()`. `tilt_align` flags signify the convergence of roll and pitch with in +- 3 degree.

If the fusion of GPS yaw is enabled, then after convergence of tilt, the `gps_yaw` flag will be turned on, and all other yaw fusion (EV) would be disabled. It will not be turned off ever again. With the flag on, it will run `fuseGpsAntYaw()`. It is a bit strange that the yaw fusion is never turned of regardless of the subsequent GPS quality. If the GPS fusion starts it should emit:

```cpp
if (_control_status.flags.gps) {
	ECL_INFO_TIMESTAMPED("EKF commencing GPS fusion");
	_time_last_gps = _time_last_imu;
}
```

#### Case when GPS fails (but EV valid)

```cpp
		// Handle the case where we are using GPS and another source of aiding and GPS is failing checks
		if (_control_status.flags.gps  && gps_checks_failing && (_control_status.flags.opt_flow || _control_status.flags.ev_pos || _control_status.flags.ev_vel)) {
			_control_status.flags.gps = false;
			// Reset position state to external vision if we are going to use absolute values
			if (_control_status.flags.ev_pos && !(_params.fusion_mode & MASK_ROTATE_EV)) {
				resetPosition();
			}
			ECL_WARN_TIMESTAMPED("EKF GPS data quality poor - stopping use");
		}
```

#### After Innovation Calculation

controlVelPosFusion();

controlExternalVisionFusion();


## About GPS and External Vision Fusion

GPS sample is in meters relative to home.

```cpp title="estimator_interface.cpp"
		// Only calculate the relative position if the WGS-84 location of the origin is set
		if (collect_gps(gps)) {
			float lpos_x = 0.0f;
			float lpos_y = 0.0f;
			map_projection_project(&_pos_ref, (gps.lat / 1.0e7), (gps.lon / 1.0e7), &lpos_x, &lpos_y);
			gps_sample_new.pos(0) = lpos_x;
			gps_sample_new.pos(1) = lpos_y;

		} else {
			gps_sample_new.pos(0) = 0.0f;
			gps_sample_new.pos(1) = 0.0f;
		}

/* Transforms a point in the geographic coordinate system to the local
 * azimuthal equidistant plane using the projection given by the argument
* @param x north
* @param y east
* @param lat in degrees (47.1234567°, not 471234567°)
* @param lon in degrees (8.1234567°, not 81234567°)
* @return 0 if map_projection_init was called before, -1 else
*/
```

#### External Vision location fusion, when GPS fusion is enabled
for `_fuse_hpos_as_odom` is enabled if GPS is used

```cpp
// Use an incremental position fusion method for EV position data if GPS is also used
        if (_params.fusion_mode & MASK_USE_GPS) {
            _fuse_hpos_as_odom = true;
        } else {
            _fuse_hpos_as_odom = false;
        }
```

ecl seems to use EV as relative pose measurement, using variable `_hpos_pred_prev`
```cpp
					// use the change in position since the last measurement
					_vel_pos_innov[3] = _state.pos(0) - _hpos_pred_prev(0) - ev_delta_pos(0);
					_vel_pos_innov[4] = _state.pos(1) - _hpos_pred_prev(1) - ev_delta_pos(1);
```


vision yaw is disabled, if gps is enabled


may try disable magnetometer 3d fusion. use `fuseHeading()`


GPS position and velocity fusion is lumped together
```cpp
// Only use GPS data for position and velocity aiding if enabled
		if (_control_status.flags.gps) {
			_fuse_pos = true;
			_fuse_vert_vel = true;
			_fuse_hor_vel = true;

			// correct velocity for offset relative to IMU
			Vector3f ang_rate = _imu_sample_delayed.delta_ang * (1.0f / _imu_sample_delayed.delta_ang_dt);
			Vector3f pos_offset_body = _params.gps_pos_body - _params.imu_pos_body;
			Vector3f vel_offset_body = cross_product(ang_rate, pos_offset_body);
			Vector3f vel_offset_earth = _R_to_earth * vel_offset_body;
			_gps_sample_delayed.vel -= vel_offset_earth;

			// correct position and height for offset relative to IMU
			Vector3f pos_offset_earth = _R_to_earth * pos_offset_body;
			_gps_sample_delayed.pos(0) -= pos_offset_earth(0);
			_gps_sample_delayed.pos(1) -= pos_offset_earth(1);
			_gps_sample_delayed.hgt += pos_offset_earth(2);

			// calculate observation process noise
			float lower_limit = fmaxf(_params.gps_pos_noise, 0.01f);

			if (_control_status.flags.opt_flow || _control_status.flags.ev_pos || _control_status.flags.ev_vel) {
				// if we are using other sources of aiding, then relax the upper observation
				// noise limit which prevents bad GPS perturbing the position estimate
				_posObsNoiseNE = fmaxf(_gps_sample_delayed.hacc, lower_limit);

			} else {
				// if we are not using another source of aiding, then we are reliant on the GPS
				// observations to constrain attitude errors and must limit the observation noise value.
				float upper_limit = fmaxf(_params.pos_noaid_noise, lower_limit);
				_posObsNoiseNE = math::constrain(_gps_sample_delayed.hacc, lower_limit, upper_limit);
			}

			_velObsVarNED(2) = _velObsVarNED(1) = _velObsVarNED(0) = sq(fmaxf(_gps_sample_delayed.sacc, _params.gps_vel_noise));

			// calculate innovations
			_vel_pos_innov[0] = _state.vel(0) - _gps_sample_delayed.vel(0);
			_vel_pos_innov[1] = _state.vel(1) - _gps_sample_delayed.vel(1);
			_vel_pos_innov[2] = _state.vel(2) - _gps_sample_delayed.vel(2);
			_vel_pos_innov[3] = _state.pos(0) - _gps_sample_delayed.pos(0);
			_vel_pos_innov[4] = _state.pos(1) - _gps_sample_delayed.pos(1);

			// set innovation gate size
			_posInnovGateNE = fmaxf(_params.gps_pos_innov_gate, 1.0f);
			_hvelInnovGate = _vvelInnovGate = fmaxf(_params.gps_vel_innov_gate, 1.0f);
		}
```