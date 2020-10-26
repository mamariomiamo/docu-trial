---
hide_title: true
sidebar_label: stereo
---

# stereo

in stereo.cpp, implement a class `StereoUpdater` with param 

``` cpp
    StereoUpdater::StereoUpdater(LinDistMap *dmap, DevMap *dev_map,
                                StereoParams p):
        MapUpdater(dmap,dev_map),
        _sp(p)
    {
        allocMem(_sp.rows,_sp.cols);
    }
```

allocate, free, reallocate memory for depth and confidence on device, `_D_depth`, `_D_confi_map`


implement a function `makeStereoPt`
``` cpp
    // Get the current camera pose
    updateProjection(trans);

    // Copty the depthmap, etc into the device
    topic2Dmem(depthPoint,confidence_ptr);

    // Start the GPU kernel to construct the probability map
    stereo::stereoKernelWrapper(_sp,_mp,_D_depth,_D_confi_map,_dev_map);
```