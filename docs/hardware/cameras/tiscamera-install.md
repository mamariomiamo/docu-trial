---
hide_title: true
sidebar_label: Tiscamera
---

[The Imaging Source USB3.1 IMX Board Cameras](https://www.theimagingsource.com/products/board-cameras/usb-3.1-monochrome/)
![](https://s1.www.theimagingsource.com/application-1.5825.43292/img/hero/default/products/board_cameras/usb_31_monochrome.png)

## Install by .deb Packages

Link: https://github.com/TheImagingSource/tiscamera/releases

## Build From Source
0. Install GStreamer through apt first
1. Clone `https://github.com/TheImagingSource/tiscamera`
2. Change CMakeList.txt `BUILD_TOOLS` to `ON`
3. (Jetson TX2) Install dependencies `gstreamer-1.0 libusb-1.0 libglib2.0 libgirepository1.0-dev libudev-dev libtinyxml-dev libzip-dev libnotify-dev`
4. Install python dependencies `python3-gi python3-pyqt5`
5. use CMake build and install
