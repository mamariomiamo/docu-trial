---
hide_title: true
sidebar_label: PX4 Dynamic Control Allocation
---

import Mermaid from '@theme/Mermaid';

# PX4 Dynamic Control Allocation

<https://www.youtube.com/watch?v=xjLM9whwjO4>

<https://github.com/PX4/PX4-Autopilot/pull/13351>

## Introduction

![control allocation](./img/PX4_High-Level_Flight-Stack.svg)

Control allocation is a part of the PX4 system that computes the actuator commands from torque and thrust setpoints.

It does so by first calculating a effectiveness matrix which consists of coefficients that can be multiplied to actuator setpoints to get thrust and torque setpoints. Then, it calculates the pseudo-inverse of the effectiveness matrix to obtain the mixer matrix that can be used to calculte actuator setpoints from thrust and torque setpoints.

Currently, PX4 uses static mixing tables that are generated from airframe configurations during compilation. With the new dynamic control allocation modules, we can dynamically modify the effectiveness matrix in case of tiltrotor VTOL tilting its motors or motor failure of multirotors.

## Overall Structure

Temporarily located [here](https://lirc572.github.io/PX4-Notes/#/content/Control-Allocation)

<details>
<summary>angular_velocity_controller</summary>

<details>
<summary>Parameters</summary>

Parameter     | Description
---           | ---
AVC_*_P       | Body * axis angular velocity P gain (unit 1/s)
AVC_*_I       | Body * axis angular velocity I gain (unit Nm/rad)
AVC_*_D       | Body * axis angular velocity D gain
AVC_*_I_LIM   | Body * axis angular velocity integrator limit (unit Nm)
AVC_*_FF      | Body * axis angular velocity feedforward gain (unit Nm/(rad/s))
AVC_*_K       | Body * axis angular velocity controller global gain
VM_MASS       | Mass (unit kg)
VM_INERTIA_XX | Inertia matrix, XX component (unit kg m^2)
VM_INERTIA_YY | Inertia matrix, YY component (unit kg m^2)
VM_INERTIA_ZZ | Inertia matrix, ZZ component (unit kg m^2)
VM_INERTIA_XY | Inertia matrix, XY component (unit kg m^2)
VM_INERTIA_XZ | Inertia matrix, XZ component (unit kg m^2)
VM_INERTIA_YZ | Inertia matrix, YZ component (unit kg m^2)
MPC_THR_HOVER | Hover thrust (Vertical thrust required to hover)
MPC_USE_HTE   | Hover thrust source selector (Set false to use the fixed parameter MPC_THR_HOVER Set true to use the value computed by the hover thrust estimator) see [this PR for details](https://github.com/PX4/PX4-Autopilot/pull/13981#issue-364553361)

</details>

<details>
<summary>uORB Subscriptions</summary>

Topic                        | Description
---                          | ---
control_allocator_status     | ...
vehicle_angular_acceleration | ...
vehicle_control_mode         | ...
vehicle_land_detected        | ...
vehicle_rates_setpoint       | `timestamp`, `roll`, `pitch`, `yaw`, `thrust_body[3]` (for multicopter, [0] and [1] are usually 0 and [2] is negative throttle demand, normalized in body NED frame [-1, 1])
vehicle_status               | ...
hover_thrust_estimate        | ...
vehicle_angular_velocity     | ...

</details>

<details>
<summary>uORB Publications</summary>

Topic                                 | Description
---                                   | ---
rate_ctrl_status                      | `timestamp`, `rollspeed_integ`, `pitchspeed_integ`, `yawspeed_integ`
vehicle_angular_acceleration_setpoint | `timestamp`, `timestamp_sample`, `xyz[3]`
vehicle_thrust_setpoint               | `timestamp`, `timestamp_sample`, `xyz[3]` (unit N)
vehicle_torque_setpoint               | `timestamp`, `timestamp_sample`, `xyz[3]` (unit N.m)

</details>

</details>

<details>
<summary>control_allocator</summary>

...

</details>

<Mermaid chart={`
	graph LR;
		A-->B;
		B-->C;
		B-->D[plop lanflz eknlzeknfz];
`}/>

### Control Allocator

![control allocator class diagram](./img/control_allocation.png)

[Draw.io source](./img/ca.drawio)

The source of the control allocation module can be found at `PX4-Autopilot/src/modules/control_allocator/`

The ControlAllocator class has two important members:

- `_control_allocation` which defines how to calculate mixer matrix from effectiveness matrix
- `_actuator_effectiveness` which provides the actuator effectiveness matrix based on airframe configurations and other settings

## Parameter Reference

| Name                | Type  | Description                                                                                                                  | Default |
| ----                | ----  | -----------                                                                                                                  | ------- |
| **VM_INERTIA_XX**   | FLOAT | Inertia matrix, XX component                                                                                                 | 0.01    |
| **VM_INERTIA_YY**   | FLOAT | Inertia matrix, YY component                                                                                                 | 0.01    |
| **VM_INERTIA_ZZ**   | FLOAT | Inertia matrix, ZZ component                                                                                                 | 0.01    |
| **VM_MASS**         | FLOAT | Mass                                                                                                                         | 1.0     |
| **AVC_x_K**         | FLOAT | Body * axis angular velocity controller gain  [0.0 > 5.0 (0.0005)]                                                           | 1.0     |
| **AVC_x_P**         | FLOAT | Body * axis angular velocity P gain           [0.0 > 20.0 (0.01)] (1/s)                                                      | 18.0    |
| **AVC_x_I**         | FLOAT | Body * axis angular velocity I gain           [0.0 > ? (0.01)] (Nm/rad)                                                      | 0.2     |
| **AVC_x_D**         | FLOAT | Body * axis angular velocity D gain           [0.0 > 2.0 (0.01)]                                                             | 0.36    |
| **AVC_x_I_LIM**     | FLOAT | Body * axis angular velocity integrator limit [0.0 > ? (0.01)] (Nm)                                                          | 0.3     |
| **AVC_x_FF**        | FLOAT | Body * axis angular velocity feedforward gain [0.0 > ?] (Nm/(rad/s))                                                         | 0.0     |
| **CA_ACTx_MAX**     | FLOAT | Maximus value for actuator `x` (0.0-1.0)                                                                                     | 0.0     |
| **CA_ACTx_MIN**     | FLOAT | Minumum value for actuator `x` (0.0-1.0)                                                                                     | 0.0     |
| **CA_AIRFRAME**     | INT32 | Airframe ID (0: Multirotor, 1: Standard VTOL, 2: Tiltrotor VTOL)                                                             | 0       |
| **CA_AIR_SCALE_EN** | INT32 | Airspeed scaler (compensates for the variation of flap effectiveness with airspeed)                                          | 0       |
| **CA_BAT_SCALE_EN** | INT32 | Battery power level scaler (compensates for voltage drop of the battery by attempting to normalize performance across the operating range of the battery) | 0 |
| **CA_MC_Rx_AX**     | FLOAT | Axis of rotor `x` thrust vector, X body axis component                                                                       | 0.0     |
| **CA_MC_Rx_AY**     | FLOAT | Axis of rotor `x` thrust vector, Y body axis component                                                                       | 0.0     |
| **CA_MC_Rx_AZ**     | FLOAT | Axis of rotor `x` thrust vector, Z body axis component                                                                       | -1.0    |
| **CA_MC_Rx_CT**     | FLOAT | Thrust coefficient of rotor `x` (`Thrust` = `CT` * `u`^2, u: output between CA_ACTx_MIN and CA_ACTx_MAX)                     | 0.0     |
| **CA_MC_Rx_KM**     | FLOAT | Moment coefficient of rotor `x` (`Torque` = `KM` * `Thrust`, +ve for CCW rotation, -ve for CW rotation)                      | 0.05    |
| **CA_MC_Rx_PX**     | FLOAT | Position of rotor `x` along X body axis	                                                                                     | 0.0     |
| **CA_MC_Rx_PY**     | FLOAT | Position of rotor `x` along Y body axis	                                                                                     | 0.0     |
| **CA_MC_Rx_PZ**     | FLOAT | Position of rotor `x` along Z body axis	                                                                                     | 0.0     |
| **CA_METHOD**       | INT32 | Control allocation method (0: Pseudo-inverse with output clipping, 1: Pseudo-inverse with sequential desaturation technique) | 0       |

- CA_ACTx...: `x` is from 0 - 15
- CA_MC_Rx...: `x` is from 0 - 7
- AVC_x_K: *=X/Y/Z. Global gain of the controller. This gain scales the P, I and D terms of the controller: output = AVC_X_K * (AVC_X_P * error + AVC_X_I * error_integral + AVC_X_D * error_derivative) Set AVC_X_P=1 to implement a PID in the ideal form. Set AVC_X_K=1 to implement a PID in the parallel form.
- AVC_x_P: x=X/Y/Z. i.e. control output for angular speed error 1 rad/s.
- AVC_x_I: x=X/Y/Z. Can be set to compensate static thrust difference or gravity center offset.
- AVC_x_D: x=X/Y/Z. Small values help reduce fast oscillations. If value is too big oscillations will appear again.
- AVC_x_I_LIM: x=X/Y/Z. Can be set to increase the amount of integrator available to counteract disturbances or reduced to improve settling time after large roll moment trim changes.


<https://docs.px4.io/master/en/advanced_config/parameter_reference.html#control-allocation>

## Run the Default Hexrotor x (Typhoon H480) Simulation

Airframe reference: <https://docs.px4.io/master/en/airframes/airframe_reference.html#hexarotor-x>

<details>
<summary>Deprecated</summary>

:::note
15/2/2021:

The steps below is based on [PX4 master branch commit 40a452d](https://github.com/PX4/PX4-Autopilot/tree/40a452dcd2f470541d923ff8a9556fc9a40916ca) which contains a basic version of the dynamic control allocation module. Since the module is still under development, some changes may need to be made to work with later version of the upstream repository.

Refer to [this wiki page](https://github.com/lirc573/PX4-Autopilot/wiki/Changes-Made-to-Work-With-gazebo_typhoon_h480) for the changes made to the upstream repo to work with `gazebo_typhoon_ctrlalloc`
:::

- Make sure you have installed the toolchain. If not, follow [Toolchain Installation & Setup](./px4-toolchain-installation-setup).

- Clone the repository:

```bash
git clone -b tsl-lirc572 https://github.com/lirc573/PX4-Autopilot.git --recursive
```

- Compile and run Gazebo simulation:

```bash
cd PX4-Autopilot
make px4_sitl_ctrlalloc gazebo_typhoon_ctrlalloc
# Re-run the above command if Gazebo shows a blank window
```

- To takeoff and stop one rotor, in PX4 shell:

```
commander takeoff
param set CA_ACT0_MAX 0
```

- Other [commands](https://docs.px4.io/master/en/modules/modules_controller.html#description):

```
# Control_allocator commands:
control_allocator start
control_allocator status
control_allocator start

# Use pseudo-inverse:
param set CA_METHOD 0

# Use sequential-desaturation:
param set CA_METHOD 1
```

</details>

<details open>
<summary>New</summary>

- Make sure you have installed the toolchain. If not, follow [Toolchain Installation & Setup](./px4-toolchain-installation-setup).

- Clone the repository:

```bash
git clone -b pr-control_allocation_testing https://github.com/PX4/PX4-Autopilot.git --recursive
```

- Compile and run Gazebo simulation:

```bash
cd PX4-Autopilot
make px4_sitl_ctrlalloc gazebo_typhoon_ctrlalloc
# Re-run the above command if Gazebo shows a blank window
```

- To takeoff and stop one rotor, in PX4 shell:

```
commander takeoff
param set CA_MC_R0_CT 0
```

:::note
15/2/2021:

When one of R0/R2/R5 is stopped, the multirotor can no longer turn left, when one of R1/R3/R4 is stopped, the multirotor can no longer turn right,

Flight log: <https://review.px4.io/plot_app?log=196aa41b-8af6-46dd-b3b3-645da3448a32>
:::

- Other [commands](https://docs.px4.io/master/en/modules/modules_controller.html#description):

```
# control_allocator commands:
control_allocator start
control_allocator status
control_allocator start
```

</details>

## Octo-Coaxial

Airframe reference: <https://docs.px4.io/master/en/airframes/airframe_reference.html#octorotor-coaxial>

<details open>
<summary>init script</summary>

(`ROMFS/px4fmu_common/init.d/airframes/12001_octo_cox`)

```bash
#!/bin/sh
#
# @name Octo Coaxial
#
# @type Octorotor Coaxial
# @class Copter
#
# @output MAIN1 motor 1
# @output MAIN2 motor 2
# @output MAIN3 motor 3
# @output MAIN4 motor 4
# @output MAIN5 motor 5
# @output MAIN6 motor 6
# @output MAIN7 motor 7
# @output MAIN8 motor 8
#
# @board intel_aerofc-v1 exclude
# @board bitcraze_crazyflie exclude
#

sh /etc/init.d/rc.mc_defaults
sh /etc/init.d/rc.ctrlalloc

if [ $AUTOCNF = yes ]
then
    param set MPC_XY_VEL_I_ACC 4
    param set MPC_XY_VEL_P_ACC 3

    param set RTL_DESCEND_ALT 10
    param set RTL_LAND_DELAY 0

    param set MNT_MODE_IN 0
    param set MAV_PROTO_VER 2

    param set MPC_USE_HTE 0

    # Set according to actual vehicle model
    param set VM_MASS 1.4995 # 2.05
    param set VM_INERTIA_XX 0.018343 # 0.029125
    param set VM_INERTIA_YY 0.019718 # 0.029125
    param set VM_INERTIA_ZZ 0.032193 # 0.055225

    param set CA_AIRFRAME 0
    param set CA_METHOD 1

    param set CA_ACT0_MIN 0.0
    param set CA_ACT1_MIN 0.0
    param set CA_ACT2_MIN 0.0
    param set CA_ACT3_MIN 0.0
    param set CA_ACT4_MIN 0.0
    param set CA_ACT5_MIN 0.0
    param set CA_ACT6_MIN 0.0
    param set CA_ACT7_MIN 0.0
    param set CA_ACT0_MAX 1.0
    param set CA_ACT1_MAX 1.0
    param set CA_ACT2_MAX 1.0
    param set CA_ACT3_MAX 1.0
    param set CA_ACT4_MAX 1.0
    param set CA_ACT5_MAX 1.0
    param set CA_ACT6_MAX 1.0
    param set CA_ACT7_MAX 1.0

    # X: front, Y: right Z: down
    # KM: CCW: +ve, CW: -ve
    # PZ: 5.5cm / 22.0cm = 0.25
    # https://docs.px4.io/master/en/airframes/airframe_reference.html#octorotor-coaxial

    param set CA_MC_R0_PX 0.7071068
    param set CA_MC_R0_PY 0.7071068
    param set CA_MC_R0_PZ -0.25
    param set CA_MC_R0_CT 11.7 # 12.523
    param set CA_MC_R0_KM 0.0137 # 0.0135

    param set CA_MC_R1_PX 0.7071068
    param set CA_MC_R1_PY -0.7071068
    param set CA_MC_R1_PZ -0.25
    param set CA_MC_R1_CT 11.7 # 12.523
    param set CA_MC_R1_KM -0.0137 # -0.0135

    param set CA_MC_R2_PX -0.7071068
    param set CA_MC_R2_PY -0.7071068
    param set CA_MC_R2_PZ -0.25
    param set CA_MC_R2_CT 11.7 # 12.523
    param set CA_MC_R2_KM 0.0137 # 0.0135

    param set CA_MC_R3_PX -0.7071068
    param set CA_MC_R3_PY 0.7071068
    param set CA_MC_R3_PZ -0.25
    param set CA_MC_R3_CT 11.7 # 12.523
    param set CA_MC_R3_KM -0.0137 # -0.0135

    param set CA_MC_R4_PX 0.7071068
    param set CA_MC_R4_PY -0.7071068
    param set CA_MC_R4_PZ 0.25
    param set CA_MC_R4_CT 11.7 # 12.523
    param set CA_MC_R4_KM 0.0137 # 0.0135

    param set CA_MC_R5_PX 0.7071068
    param set CA_MC_R5_PY 0.7071068
    param set CA_MC_R5_PZ 0.25
    param set CA_MC_R5_CT 11.7 # 12.523
    param set CA_MC_R5_KM -0.0137 # -0.0135

    param set CA_MC_R6_PX -0.7071068
    param set CA_MC_R6_PY 0.7071068
    param set CA_MC_R6_PZ 0.25
    param set CA_MC_R6_CT 11.7 # 12.523
    param set CA_MC_R6_KM 0.0137 # 0.0135

    param set CA_MC_R7_PX -0.7071068
    param set CA_MC_R7_PY -0.7071068
    param set CA_MC_R7_PZ 0.25
    param set CA_MC_R7_CT 11.7 # 12.523
    param set CA_MC_R7_KM -0.0137 # -0.0135
fi

set MAV_TYPE 13

# set MIXER octo_cox
set MIXER direct
set PWM_OUT 12345678

```
</details>
