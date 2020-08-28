---
hide_title: true
sidebar_label: System Level Tests
---

# System Level Tests

## Major Improvement over Stability

**Work Done:**
- Redesign the mounting plate (credit Yanfeng)
- Recalibrated the Pixhawk (credit Yanfeng)
- Recalibrating the prototype rig, by covering all corners of the image
    - Calibration verified by Kalibr's validator, and Jalvin's triangulation code
- Increase the IMU rates from 100Hz to 200 Hz, to make the pre-integration more stable (20ms is too long an interval)
    - Use `HIGHRES_IMU` aka `/mavros/imu/data_raw` topic
    - It has certain filtering delay, but should be negligible (few ms?)
- Discovered incorrect time sync matches between camera-imu. Fixed it (50ms delay on laptop)
    - Do not confuse the mean delay between camera and imu, and the OS delay (a measure between kernel v4l2 image reception and ros image reception). The mean delay on laptop is normally smaller than 80ms.
    - Observe the visualisation on basalt, when there is large rotation motion. If the camera is out of sync, the optimisation will shift the observing point by a lot. THIS INDICATES THE ERROR.
- Fixed various crashing bugs
    - shrinking the viewing angle to < 165 degree, by adding `alpha_offset`
    - fixed std::map error which occured in visualising the keypoints' original observation locations
    - fixed a divide by zero bug in front-end

:::note
This framework rely highly upon **calibration** and correct **hardware synchronisation**. All sensor measurement timings should be precise at few-milliseconds level.
:::

### Some Video Demos    

#### Indoor
<iframe width="560" height="315" src="https://www.youtube.com/embed/3ISeNw7O7JQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/H4uas0846cs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

#### Outdoor

<iframe width="560" height="315" src="https://www.youtube.com/embed/1LemsSnps4w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

**TODO:**
- The config `vio_filter_iteration` effectiveness is still to be determined
- Performance of GN and LM optimisation method test
- Test `vio_enforce_realtime` option
- Port over to TX2 to verify the performance again, try to hit >10Hz update rate.

**Full Config File**
```json title="tis_config.json"
{
    "value0": {
        "config.optical_flow_type": "frame_to_frame",
        "config.optical_flow_detection_grid_size": 60,
        "config.optical_flow_max_recovered_dist2": 5.0,
        "config.optical_flow_pattern": 51,
        "config.optical_flow_max_iterations": 5,
        "config.optical_flow_epipolar_error": 0.05,
        "config.optical_flow_levels": 4,
        "config.optical_flow_skip_frames": 1,
        "config.feature_match_show": false,
        "config.vio_max_states": 3,
        "config.vio_max_kfs": 7,
        "config.vio_min_frames_after_kf": 3,
        "config.vio_new_kf_keypoints_thresh": 0.6,
        "config.vio_debug": false,
        "config.vio_obs_std_dev": 0.5,
        "config.vio_obs_huber_thresh": 1.0,
        "config.vio_min_triangulation_dist": 0.15,
        "config.vio_outlier_threshold": 10,
        "config.vio_filter_iteration": 4,
        "config.vio_max_iterations": 7,
        "config.vio_enforce_realtime": false,
        "config.vio_use_lm": true,
        "config.vio_lm_lambda_min": 1e-32,
        "config.vio_lm_lambda_max": 1e2,
        "config.vio_init_pose_weight": 1e12,
        "config.vio_init_ba_weight": 1e1,
        "config.vio_init_bg_weight": 1e2,

        "config.mapper_obs_std_dev": 0.25,
        "config.mapper_obs_huber_thresh": 1.5,
        "config.mapper_detection_num_points": 800,
        "config.mapper_num_frames_to_match": 30,
        "config.mapper_frames_to_match_threshold": 0.04,
        "config.mapper_min_matches": 20,
        "config.mapper_ransac_threshold": 5e-5,
        "config.mapper_min_track_length": 5,
        "config.mapper_max_hamming_distance": 70,
        "config.mapper_second_best_test_ratio": 1.2,
        "config.mapper_bow_num_bits": 16,
        "config.mapper_min_triangulation_dist": 0.07,
        "config.mapper_no_factor_weights": false,
        "config.mapper_use_factors": true,
        "config.mapper_use_lm": true,
        "config.mapper_lm_lambda_min": 1e-32,
        "config.mapper_lm_lambda_max": 1e3
    }
}

```
