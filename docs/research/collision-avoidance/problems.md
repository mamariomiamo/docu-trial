---
hide_title: true
sidebar_label: CA Current Problems
---

## CA Current Framework
Using the velocity obstacles implementation, with relative velocity vector and Protected Zone to prevent collision.

Refer to paper : https://ieeexplore.ieee.org/document/6094677

## Problems Identified from Current CA


1. Collisions occur, especially when congested​

2. Unnecessary avoidance, disrupting mission​

3. Not following rules properly all the time​

4. Unfairness, some drones do all the work to avoid​

5. Deadlock in tight spaces​

6. Shallow crossing encounter, the two drones struggle to pass each other and could go into deadlock​

7. Simplify the parameters (update rate, latency, detection range, etc) – too many and they are actually related and not easy to determine what value to assign​

8. Priority issue – when a drone is given highest priority, are we sure others would be able to avoid it while it ignores everyone else​

9. Handling static obstacles​
