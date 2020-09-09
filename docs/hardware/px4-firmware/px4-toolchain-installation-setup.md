---
hide_title: true
sidebar_label: Toolchain Installation & Setup
---

# Toolchain & Setup

## Toolchain installation

It is recommended to use Liux machine for PX4 development as it takes :fire:**excruciatingly**:fire: long time to compile in Windows.

If you have Ubuntu 18.04 installed, go ahead to this [link](https://dev.px4.io/master/en/setup/dev_env_linux_ubuntu.html).

> **Note** Instructions below are based on the PX4 firmware master branch. To work with different branches, simply toggle between the branches at the top of the dev guide side bar.

Download the two scripts: "[ubuntu.sh](https://raw.githubusercontent.com/PX4/Firmware/master/Tools/setup/ubuntu.sh)" and "[ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh)" to install Gazebo 9, jMAVSim simuilator and NuttX/Pixhawk tools.

Give permission to the downloaded script and the scripts for toolchain installation.

```
chmod +x ubuntu.sh
./ubuntu.sh
chmod +x ubuntu_sim_ros_melodic.sh
./ubuntu_sim_ros_melodic.sh
```
Reboot the system to complete installation.

## Test run

To verify succesful toolchain installation and setup, we will try to compile the PX4 firmware for both simulation and fmu-v2.
First, we will download the PX4 firmware:
```
git clone https://github.com/PX4/Firmware.git --recursive
```
Next, try to compile PX4 firmware and run gazebo simulation, more details on simulation with gazebo [here](https://dev.px4.io/master/en/simulation/gazebo.html).
```
make px4_sitl gazebo
```
Then, try to compile PX4 firmware for fmu-v2 target, more details on different targets [here](https://dev.px4.io/master/en/setup/building_px4.html#nuttx).
```
make px4_fmu-v2
```
> **Tip 1:** If there is built-error like [this](https://github.com/PX4/Firmware/issues/13809), follow the guide [here](https://dev.px4.io/master/en/setup/dev_env_linux_centos.html#gcc-toolchain-installation) to check compiler version.

> **Tip 2:** If you forget the make command, use ```make list_config_targets``` to remind yourself.