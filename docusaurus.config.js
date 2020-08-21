var themeConfig = require('./docs/themeConfig.js').themeConfig

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
  projectName: 'tech-details', // Usually your repo name.
  
  themeConfig,
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'examples/doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
