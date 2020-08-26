---
hide_title: true
sidebar_label: Verify by Triangulation
---

## Verify Calibration by Triangulation

by triangulation

@jalvin

Verify calibration by checking the depth of different points in the images.

Git Repository:
https://github.com/STEMO-CS5340/position_proposal_estimator

**Clone and Build**
```bash
git clone (source link)
# go to cloned directory
git submodule update --init --recursive
mkdir build
cd build
cmake ..
```

**Usage** 
```bash
# open file src/depth_verification_test.cpp
# set imageFileNames and yaml file
# go to build directory
make 
./depth_verification_test
```

Click on the same point in both images. Terminal will display the direction unit vertor and the distance between the point and origin, and also displays the world coordinates of the point in the next line.
