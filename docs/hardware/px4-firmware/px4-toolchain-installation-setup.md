---
hide_title: true
sidebar_label: PX4 Toolchian & Setup
---

# PX4 Toolchain & Setup

## Toolchain installation

It is recommended to use Liux machine for PX4 development as it takes **excruciatingly** long time to compile in Windows.

If you have Ubuntu 18.04 installed, go ahead to this [link](https://dev.px4.io/master/en/setup/dev_env_linux_ubuntu.html).

Download the two scripts: "[ubuntu.sh](https://raw.githubusercontent.com/PX4/Firmware/master/Tools/setup/ubuntu.sh)" and "[ubuntu_sim_ros_melodic.sh](https://raw.githubusercontent.com/PX4/Devguide/master/build_scripts/ubuntu_sim_ros_melodic.sh)" to install Gazebo 9, jMAVSim simuilator and NuttX/Pixhawk tools.

Give permission to the downloaded script and the scripts for toolchain installation.

```
chmod +x ubuntu.sh
./ubuntu.sh
chmod +x ubuntu_sim_ros_melodic.sh
./ubuntu_sim_ros_melodic.sh
```
Reboot the system to complete installation.

To verify succesful toolchain installation, we will try to compile the PX4 firmware for both simulation and fmu-v2.
```
git clone https://github.com/PX4/Firmware.git --recursive
```

## FlightPlot

FlightPlot is a desktop based tool for log analysis. It can be downloaded from https://github.com/PX4/FlightPlot/releases .

To run flightplot.jar.zip, Java need to be installed in Ubuntu.

Open terminal in the folder where flightplot.jar.zip has been saved.
```
$java -jar flightplot.jar.zip 
```
To open flightplot

Click "Open log" to choos ".ulg" file. All the data can be found in the "Field List"



## Install Java:

```
$ sudo apt update
$ sudo apt install default-jdk
```
### Verify the installation:
```
$ java -version
```
### 2.1 Build Development Environment on Ubuntu
### Steps
1. Go to https://dev.px4.io/v1.9.0/en/setup/dev_env_linux_ubuntu.html

1. Download 4 scripts ("ubuntu_sim_common_deps.sh","ubuntu_sim.sh","ubuntu_sim_nuttx.sh","ubuntu_sim_ros_melodic.sh")
 

1. Open a terminal and enter the following command: ($ sudo usermod -a -G dialout $USER)

1. Logout and login again

1. Run all the script in a bash shell
```
 $ scource__________
 (example: source ubuntu_sim_common_deps.sh)
```
All the development tools will be installed automatically.



## Install pyulog for converting .ulg to csv
For python3 :
```
$ pip3 install pyulog
```

### Convert .ulg file to .csv
Open terminal the folder with .ulg file.
```
$ ulog2csv .ulg
```


 
## Install Ninjia Build System
 ```
 $ sudo apt-get install ninja-build -y
```