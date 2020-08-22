---
id: doc0
title: New Page Creation
sidebar_label: New Page Creation
---

## Overview
0. All website generation files is located at our server within NUS intranet
    - `smb://172.18.72.192/techdetails/` for Linux
        ![](./img/smb_linux.png)
        , and 
    - `\\172.18.72.192\techdetails` for Windows
1. Each page is one `.md` file located in the `docs` subfolder, arranged according to the navigation bar (e.g. `./docs/hardware/` and `./docs/systems`).
2. To make the page appear on the sidebar, file `./docs/sidebars.js` requires modification
3. In rarer cases, if a new tab or sub-entries need to be created at the navigation bar (on the top of the website), `docusaurus.config.js` requires modification

## Create a Page

Creating a page is as simple as by creating a file like `mypage.md`. For example, if we create the file under the path `./docs/examples/mypage.md`, then the page should be immediately accessible through the live preview at port 8888: 
> http://172.18.72.192:8888/tech-details/docs/examples/mypage

Within the empty `mypage.md`, add the front matter to configure the title

``` markdown
---
hide_title: true
sidebar_label: My Page
---

# My Title

The rest of your content...
```

The end result should look like this:

![](./img/new_page_created.png)

Notice that there is no sidebar available for this page, which means the page is currently not browsable unless the exact URL is keyed in. Therefore we will add the page to sidebar next.

## Add a Page to the Sidebar

The file `./docs/sidebars.js` is organised in blocks like this:

``` js
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
```

Each block has a name like `systemsSidebar` which is arbitrary (does not affect the website display), but it logically links all relevant documents under one sidebar group.

Within each block, there can be nested levels of sidebar entries, and the format should be self-explanatory. But be reminded of the `,` at various places for the correct syntax. The `.md` postfix should be omitted when mentioning each file.

After adding content in `sidebars.js`, the page should now be rendered like this:

![](./img/sidebar_added.png)

## Add Important Pages to Navigation Bar

The navigation bar is configured within the main `docusaurus.config.js` file. It is under the object `themeConfig.navbar.items`.

Each item can be nested, an example would be:

``` js
    // Systems
    {
        to: 'docs/systems/vicon',
        activeBasePath: 'docs/systems',
        label: 'Systems',
        position: 'left',
        items: [
        {
            // activeBasePath:'docs/systems/ddrone_v2',
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
```

Again the syntax should be self-explanatory.

## Preview Your Changes
Preview your live changes at http://172.18.72.192:8888/tech-details/