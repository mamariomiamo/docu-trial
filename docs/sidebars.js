module.exports = {
  // examples
  examplesSidebar: {
    Docusaurus: [
    'examples/doc1', 
    'examples/doc2',
    'examples/doc3'
    ],
    Features: ['examples/mdx'],
  },

  // hardware
  tx2Sidebar: {
    'All About Images': [
    'hardware/jetson/prepare-bsp-rfs',
    'hardware/jetson/flash-existing-image',
    'hardware/jetson/backup-procedures',
    'hardware/jetson/mount-image-as-loopback',
    
    ],
    'Getting Started': [
    'hardware/jetson/tx2-post-flashing',
    'hardware/jetson/uart-setup',
    'hardware/jetson/usb-setup',
    'hardware/jetson/power-button',
    'hardware/jetson/external-sd-card',
    'hardware/jetson/hotspot-setup',
    'hardware/jetson/network-sharing',
    'hardware/jetson/misc',
    'hardware/jetson/fan',
    'hardware/jetson/performance-monitoring'
    ],
    'Software Packages': [
    'hardware/jetson/pytorch-install',
    'hardware/jetson/vscode-install'
    ]
  },
  camerasSidebar: {
      'USB Cameras': [
      'hardware/cameras/tiscamera-install',
      'hardware/cameras/realsense-install',
      'hardware/cameras/zed-install',
      ]
  },
  px4firmwareSidebar: {
      'PX4 Firmware': [
      'hardware/px4-firmware/time-synchronisation',
      ]
  },

  // linux
  linuxSidebar: {
      'Desktop Convenience': [
          'linux/desktop/gnome-shell-extensions',
      ],
      'Software Packages': [
          'linux/packages/file-systems',
          'linux/packages/gstreamer',
          'linux/packages/latex',
          'linux/packages/nodejs',
          'linux/packages/nginx',
          'linux/packages/opencv',
      ],
      'ROS': [
          'linux/ros/using-catkin-build',
          'linux/ros/roslib.js',
      ],
      'Drivers & Kernel': [
          'linux/kernel/grub-default-kernel',
          'linux/kernel/nvidia-intel-driver',
          'linux/kernel/usb'
      ]
  },

  // productivity
  gitSidebar: {
      'Git Version Control': [
          'productivity/git/git',
      ],
  },
  cmakedebuggingSidebar: {
      'CMake': [
          'productivity/cmake_debug/cmake',
      ],
      'Debugging Techniques': [
          'productivity/cmake_debug/debugging',
      ],
  },
  uiuxSidebar: {
      'C++ Visualisation': [
          'productivity/uiux/pangolin',
      ],
      'ROS Web': [
          'productivity/uiux/roslibjs',
      ],
  },

  // research
  researchSidebar: {
      'Camera Calibration': [
      'research/calibration/index',
      'research/calibration/using-kalibr-calibration',
      'research/calibration/verify-calibration',
      ],
      'VIO': [
      'research/vio/basalt-backend',
      'research/vio/basalt-frontend',
      ],
  },

  // systems
  systemsSidebar: {
      'DDrone V2': [
          'systems/ddrone_v2/ddrone',
      ],
      'Simulations': [
          'systems/unity-SITL',
          'systems/unity-HITL',
      ],
      'Vicon': [
          'systems/vicon',
      ],
  },

};