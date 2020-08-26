---
hide_title: true
sidebar_label: Using Catkin Build
---

# Installing Catkin

It is a one line command
```bash
sudo apt install python-catkin-tools
```

### Install Missing Dependencies Automatically

```bash
# Navigate to the root path of the caktin workspace, e.g. cd /home/user/catkin_ws/
rosdep install --from-paths src --ignore-src -r -y
```

Reference:
http://wiki.ros.org/rosdep 