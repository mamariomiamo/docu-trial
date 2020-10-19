module.exports = {
  // examples
  examplesSidebar: {
    'Docusaurus': [
        'examples/doc0', 
        'examples/doc1', 
        'examples/doc2',
        'examples/doc3',
        // 'examples/mypage',
    ],
    'Features': ['examples/mdx'],
  },

  // hardware
  tx2Sidebar: {
    'All About Images': [
    'hardware/jetson-tx2/prepare-bsp-rfs',
    'hardware/jetson-tx2/flash-existing-image',
    'hardware/jetson-tx2/backup-procedures',
    'hardware/jetson-tx2/mount-image-as-loopback',
    
    ],
    'Getting Started': [
    'hardware/jetson-tx2/tx2-post-flashing',
    'hardware/jetson-tx2/uart-setup',
    'hardware/jetson-tx2/usb-setup',
    'hardware/jetson-tx2/power-button',
    'hardware/jetson-tx2/external-sd-card',
    'hardware/jetson-tx2/hotspot-setup',
    'hardware/jetson-tx2/network-sharing',
    'hardware/jetson-tx2/misc',
    'hardware/jetson-tx2/fan',
    'hardware/jetson-tx2/performance-monitoring'
    ],
    'Software Packages': [
    'hardware/jetson-tx2/pytorch-install',
    'hardware/jetson-tx2/vscode-install'
    ]
  },
  xavierNxSidebar:{
    'Getting Started': [
        'hardware/jetson-xavier-nx/getting-started'
    ],
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
        'hardware/px4-firmware/px4-overview',
        'hardware/px4-firmware/px4-toolchain-installation-setup',
        'hardware/px4-firmware/px4-log-analysis',
        'hardware/px4-firmware/px4-sitl',
        'hardware/px4-firmware/mavlink-imu',
        'hardware/px4-firmware/time-synchronisation',
        'hardware/px4-firmware/px4-camera-trigger',
        'hardware/px4-firmware/px4-ecl-sensor-fusion',
      ]
  },
  UAVplatformSidebar: {
    'UAV platform': [
      'hardware/UAV-platform/Multirotor-overview',
    ]
},

  // linux
  linuxSidebar: {
      'Getting Started': [
          'linux/getting-started/installation',
          'linux/getting-started/overview',
          'linux/getting-started/basics-linux-os',
          'linux/getting-started/basics-bash-file-system',
          'linux/getting-started/basics-bash-scripting',
          'linux/getting-started/basics-package-mgt',
          'linux/getting-started/basics-query-devices',
          'linux/getting-started/intermediate-network-drive-samba',
          'linux/getting-started/intermediate-ssh-scp',
          'linux/getting-started/gnome-shell-extensions',
      ],
      'Common Package Install': [
          'linux/packages/file-systems',
          'linux/packages/gstreamer',
          'linux/packages/latex',
          'linux/packages/nodejs',
          'linux/packages/nginx',
          'linux/packages/opencv',
      ],
      'ROS': [
          'linux/ros/installation',
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
      'Flight Data': [
        'research/flight-data/flight-data-analysis',
      ],
      'Camera Calibration': [
      'research/calibration/getting-started',
      'research/calibration/calibration-target-params',
      'research/calibration/kalibr-result-conventions',
      'research/calibration/calibration-procedures',
      'research/calibration/verify-by-kalibr-validator',
      'research/calibration/verify-by-triangulation-depth',
      ],
      'VIO': [
      'research/vio/basalt-overview',
      'research/vio/basalt-backend',
      'research/vio/basalt-frontend',
      'research/vio/basalt-tests',
      ],
  },

  // systems
  systemsSidebar: {
      'DDrone V2': [
          'systems/ddrone_v2/ddrone',
          'systems/ddrone_v2/getting-started',
          'systems/ddrone_v2/VIO',
          'systems/ddrone_v2/motion-planning',
          'systems/ddrone_v2/tracking-and-detection',
          'systems/ddrone_v2/simulator',
          'systems/ddrone_v2/web-ui',
      ],
      'Simulations': [
          'systems/unity-SITL',
          'systems/unity-HITL',
          'systems/unity-simulator',
      ],
      'Vicon': [
          'systems/vicon',
      ],
  },

};