// Enable Latex displays
const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");

module.exports = {
  title: 'TSL Tech Details',
  tagline: 'Landing Page for TSL Technical Details and Tutorials',
  url: 'http://172.18.72.192',
  baseUrl: '/tech-details/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'tsl', // Usually your GitHub org/user name.
  projectName: 'tech-detail', // Usually your repo name.


  themeConfig: {
        prism: {
          theme: require('prism-react-renderer/themes/github'),
        },
    
        navbar: {
          title: 'TSL Tech Details',
          logo: {
            alt: 'My Site Logo',
            src: 'img/android-chrome-192x192.png',
          },
          items: [
    
            // Hardware
              {
              to: 'docs/hardware/',
              activeBasePath: 'docs/hardware',
              label: 'Hardware',
              position: 'left',
              items: [
                {
                  activeBasePath:'docs/hardware/jetson',
                  label: 'Jetson TX2',
                  to: 'docs/hardware/jetson/flash-existing-image'
                },
                {
                  activeBasePath:'docs/hardware/cameras',
                  label: 'Cameras',
                  to: 'docs/hardware/cameras/tiscamera-install'
                },
                {
                  activeBasePath:'docs/hardware/px4-firmware',
                  label: 'PX4 Firmware',
                  to: 'docs/hardware/px4-firmware/time-synchronisation'
                },
              ]
            },
    
            // Systems
            {
              to: 'docs/systems/vicon',
              activeBasePath: 'docs/systems',
              label: 'Systems',
              position: 'left',
              items: [
                {
                  // activeBasePath:'docs/systems/',
                  label: 'Ddrone V2',
                  to: 'docs/systems/ddrone_v2/ddrone'
                },
                {
                  // activeBasePath:'docs/systems/',
                  label: 'Simulations',
                  to: 'docs/systems/unity-SITL'
                },
                {
                  // activeBasePath:'docs/systems/',
                  label: 'Vicon',
                  to: 'docs/systems/vicon'
                },
              ]
            },
    
            // Linux
            {
              to: 'docs/linux/desktop/gnome-shell-extensions',
              activeBasePath: 'docs/linux/',
              label: 'Linux',
              position: 'left',
              items: [
                {
                  activeBasePath:'docs/linux/desktop/',
                  label: 'Desktop',
                  to: 'docs/linux/desktop/gnome-shell-extensions'
                },
                {
                  activeBasePath:'docs/linux/packages',
                  label: 'Software Packages',
                  to: 'docs/linux/packages/file-systems'
                },
                {
                  activeBasePath:'docs/linux/ros',
                  label: 'ROS',
                  to: 'docs/linux/ros/using-catkin-build'
                },
                {
                  activeBasePath:'docs/linux/kernel',
                  label: 'Drivers & Kernel',
                  to: 'docs/linux/kernel/grub-default-kernel'
                },
              ]
            },

            // Productivity
            {
              to: 'docs/productivity/git/git',
              activeBasePath: 'docs/productivity/',
              label: 'Productivity',
              position: 'left',
              items: [
                {
                  activeBasePath:'docs/productivity/git',
                  label: 'Git Version Control',
                  to: 'docs/productivity/git/git'
                },
                {
                  activeBasePath:'docs/productivity/cmake_debug',
                  label: 'CMake and Debugging',
                  to: 'docs/productivity/cmake_debug/cmake'
                },
                {
                  activeBasePath:'docs/productivity/uiux',
                  label: 'UI/UX Tools',
                  to: 'docs/productivity/uiux/pangolin'
                },
              ]
            },

            // Research
            {
              to: 'docs/research/',
              activeBasePath: 'docs/research/',
              label: 'Research',
              position: 'left',
    
              items: [
                {
                  activeBasePath:'docs/research/calibration',
                  label: 'Sensor Calibration',
                  to: 'docs/research/calibration/index'
                },
                {
                  activeBasePath:'docs/research/vio',
                  label: 'VIO',
                  to: 'docs/research/vio/basalt-backend'
                },
              ]
            },

            // Examples
            {
              to: 'docs/examples/doc1',
              activeBasePath: 'docs/examples',
              label: 'Examples',
              position: 'left',
            },
            {to: 'blog', label: 'Blog', position: 'left'},
            {
              href: 'https://bitbucket.org/nusuav/tl-tech-details/',
              label: 'BitBucket',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: 'Style Guide',
                  to: 'docs/doc1',
                },
                {
                  label: 'Second Doc',
                  to: 'docs/doc2',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Stack Overflow',
                  href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                },
              ],
            },
            {
              title: 'More',
              items: [
                {
                  label: 'Blog',
                  to: 'blog',
                },
                {
                  label: 'BitBucket',
                  href: 'https://bitbucket.org/nusuav/tl-tech-details/',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} TSL. Built with Docusaurus.`,
        },
      },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          // homePageId: 'examples/doc1',
          sidebarPath: require.resolve('./docs/sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'file://deptnas.nus.edu.sg/TSL/Research/Centre%20Flight%20Science/Intelligent%20Unmanned%20Systems/Research%20Data%20Backup/Users/00_Tech_Details',
          
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, {strict: false}]],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'file://deptnas.nus.edu.sg/TSL/Research/Centre%20Flight%20Science/Intelligent%20Unmanned%20Systems/Research%20Data%20Backup/Users/00_Tech_Details',
          remarkPlugins: [remarkMath],
          rehypePlugins: [[rehypeKatex, {strict: false}]],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
