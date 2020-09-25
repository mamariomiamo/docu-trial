

## About GPS and External Vision Fusion

GPS sample is in meters relative to home?

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