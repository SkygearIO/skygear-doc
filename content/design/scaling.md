+++
date = "2015-10-30T19:29:34+08:00"
draft = true
title = "Scaling"

+++

{{< img src="/design/scaling.jpg" title="Scaling discussion" 
    caption="Showing discussion sketch">}}


V1:

- Time out disconnect
- Reconnect

V2:

- Plugin connect to multiple Skygear
- Config file at plugin on Skygear instances

Hope:

- Service Discovery
- Heart beat

## Scaling plan

Note:

 - The database scaling will scaling on its own. i.e. read-replica, master-slave
   is on DB level. Scaling Skygear application server is weakly related to DB.
 - Skygear can return a plugin failed repsonse to end user if plugin is dead
   dueing thr request.

In V1, can scaling Skygear + Plugin as a group.

- Keep using ZMQ, one to one communication with between plugin and Skygear.
- System admin got notified on plugin dead.
- The plugin and Skygear address can be config via file.

In V2, Skygear and plugin can add instances indivivudally 

- Skygear will able to connect multiple plugin instance (same type or different
  type).
- Plugin will able to accept request from multiple Skygear instance.
- Skygear and plugin will check each other status with heartbeat.
- Skygear and plugin can be discover each other by gossip protocol.
