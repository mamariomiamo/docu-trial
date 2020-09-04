---
hide_title: true
sidebar_label: PX4 Toolchian & Setup
---

# PX4 Toolchian & Setup

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