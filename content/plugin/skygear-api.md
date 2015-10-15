+++
date = "2015-09-25T17:48:25+08:00"
draft = true
title = "Calling Skygear API"

+++

The Skygear API is also available to plugins. You can make use of the Skygear API
to save records, send notification or perform any actions that are also
available to the client SDK.

Py-skygear contains a lightweight Skygear API wrapper so that you can call
the Skygear API in your python program.

The first thing you need to do is to import `SkygearContainer` from
`py-skygear.container` module.

```
from py-skygear.container import SkygearContainer
```

For example, to send a push notification to a user:

```
container = SkygearContainer()
container.send_action('push:user', {
    'user_id': "user@example.com"
    })
```
