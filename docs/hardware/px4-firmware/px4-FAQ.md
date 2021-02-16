---
hide_title: true
sidebar_label: PX4 FAQ
---
# PX4 FAQ
- [Cannot Arm the Drone?](#cannot-arm-the-drone)

## Cannot Arm the Drone?

Check for any (<b>Preflight checks fail</b>) error messages from QGC.

Check for the <b>throttle position</b> (it must be <i>"low"</i>).

Check whether you are using <b>Arming Gesture</b> or <b>Arming Buttom/Switch</b> (they are either or). More info [`here`](https://docs.px4.io/master/en/advanced_config/prearm_arm_disarm.html#arming-gesture)

Check the parameter <b>`COM_RC_IN_MODE`</b>, it should be the default value 0.