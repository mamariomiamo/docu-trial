---
hide_title: true
sidebar_label: Multirotor Overview
---

# Overview

Multirotor is a class of rotor craft that our group uses for control, perception and swarm algorithm development and testing.

# How to build a UAV platform
### 1. Solder the ESC to the PCB base plate
![](./UAVphoto/s1.jpg)

:::warning
Be careful with the polarity
:::

### 2. Put PCB base plate to drone frame
![](./UAVphoto/s2.jpg)

:::tip
Check if there is enough room for the battery.If not, expand the space 
:::

### 3. Connect ESC to flight control board and check whether it can be calibrated
### 4. Put motors on the frame
### 5. Compelete calibrations in Qgroundcontrol
### 6. Arrange wires and put propellers

---

## Platform

1. Solder ESC GND pads to AUAV Power Module 

![](./UAVphoto/YJ1.jpg)

2. Place the flight control board on the layer above with buzzer and safety switch connected

![](./UAVphoto/YJ2.jpg)

3. Connect ESC servo to flight control board 


>Connect ESC servo to **MAIN OUT** (_not AUX OUT_) according to the labelled numbers 


4. Connect receiver to RC on flight control board

![](./UAVphoto/YJ3.jpg)

:::tip
Always keep the cables neatly arranged and components fixed in place. It is recommended to use cable ties and double-sided tape to help with the practice. 
:::

:::caution
Try not to bundle the cable near the propellers for safety purposes.
:::

## QGroundControl 

1. Download QGroundControl on [DroneCode](https://docs.qgroundcontrol.com/master/en/getting_started/download_and_install.html) (Code is available on [GitHub](https://github.com/mavlink/qgroundcontrol))
2. Run _./QGroundControlAppImage_ on terminal
3. Connect the flight control board to computer via USB port
4. Update the firmware
5. Select correct airframe
6. Connect the vehicle to battery and calibrate ESC PWM Minimum and Maximum
7. Calibrate sensors
8. Set up and calibrate radio (controller)


>In order to connect the controller to receiver, press the LINK/MODE on receiver until the red light start blinking and then turn on the controller. When the light turns green, the connection is done.

9. Set up flight mode

:::note
More detailed information can be found on [Vehicle Setup](https://docs.qgroundcontrol.com/master/en/SetupView/SetupView.html).
:::

:::tip
Safety switch: Double blinking suggests that vehicle can be armed while single blinking suggest that vehicle is not allowed to be armed.
:::

## Pixhawk 

Check out the [website](https://dev.px4.io/master/en/companion_computer/pixhawk_companion.html) to set up the TELEM2 port for companion computer.

## Nvidia Jetson Xavier NX

#### 1. Set up [Jetson Xavier NX Developer Kit](https://developer.nvidia.com/embedded/learn/get-started-jetson-xavier-nx-devkit#write)

#### 2. Install [ROS Melodic](http://wiki.ros.org/melodic/Installation/Ubuntu)

#### 3. Follow the instructions at [DroneCode](https://dev.px4.io/master/en/ros/mavros_installation.html) or [TSL page](172.18.72.192) to compile [MAVROS](https://github.com/mavlink/mavros/blob/master/mavros/README.md)

:::note
Add the following lines into .bashrc

```
$ sudo apt install nano
$ nano .bashrc
```
```
# Lines to be added
source /opt/ros/melodic/setup.bash
source /home/yt/catkin_ws/devel/setup.bash
```
:::

#### 4. Check serial port (TX/RX) using [loopback test](https://amitasinghchauhan.medium.com/serial-port-debugging-101-loopback-test-4a7e40da9055)

4.1. Connect the TX and RX port using one cable in order to perform loopback test

:::note
The pin configuration of Jetson Xavier NX Developer Kit can be found [here](https://www.jetsonhacks.com/nvidia-jetson-xavier-nx-gpio-header-pinout/).
:::

4.2. Set up Minicom

```
$ sudo apt-get install minicom
$ minicom
```

4.3. Open up Minicom and perform loopback test
```
$ sudo minicom -D /dev/ttyTHS0 
```

- Press Ctrl A-Z 
- Press O to configure minicom 
- Select serial port setup
- Change serial device 

Or 

- Open the minicom in terminal using different tty*

:::note
List of tty* can be found by typing the following code in terminal
```
$ ls /dev/tty*
```
:::

>To verify the TX/RX ports, make sure the content you type in shows on the terminal.

#### 5. Modify the line shown below in _px4.launch_ file

![](./UAVphoto/YJ4.jpg)

- Set tty to the tty verified in previous step (For example: ttyASM0 -> ttyTHS0)
- Change the baudrate (the number behind tty) to the baudrate of TELEM2 

:::note
Check the baudrate of TELEM2 on QGroundControl by searching the parameter _SER_TEL2_BAUD_.
:::

#### 5. Check the connection between PX4 and Jetson Xavier

5.1. Connect RX, TX and GND pin on Jetson Xavier to TELEM2 on PX4

:::note
Pin configuration of TELEM2 on PX4 (from left to right) is 5V, RX, TX, CTS, RTS, GND.
:::

5.2. Boot up PX4 and check if anything shows up on the Minicom on Jetson Xavier

#### 6. Run roslaunch mavros px4.launch
```
# Can try the following line if encounter error 
# DeviceError: serial: open: Permission denied
$ sudo chmod a+rw /dev/ttyTHS0
```

:::tip
Compiled information can be found [here](https://github.com/DiegoHerrera1890/Pixhawk-connected-to-Jetson-Tx2-devkit).
:::

## Tuning