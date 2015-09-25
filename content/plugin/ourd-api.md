+++
date = "2015-09-25T17:48:25+08:00"
draft = true
title = "Calling Ourd API"

+++

The Ourd API is also available to plugins. You can make use of the Ourd API
to save records, send notification or perform any actions that are also
available to the client SDK.

Pyourd contains a lightweight Ourd API wrapper so that you can call
the Ourd API in your python program.

The first thing you need to do is to import `OurdContainer` from
`pyourd.container` module.

```
from pyourd.container import OurdContainer
```

For example, to send a push notification to a user:

```
container = OurdContainer()
container.send_action('push:user', {
    'user_id': "user@example.com"
    })
```
