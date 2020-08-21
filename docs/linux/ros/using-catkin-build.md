---
hide_title: true
sidebar_label: Using Catkin Build
---


### Install Missing Dependencies Automatically

``` bash
# Navigate to the root path of the caktin workspace, e.g. cd /home/user/catkin_ws/
rosdep install --from-paths src --ignore-src -r -y
```

Reference:
http://wiki.ros.org/rosdep 