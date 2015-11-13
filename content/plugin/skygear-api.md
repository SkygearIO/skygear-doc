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
`skygear.container` module.

```
from skygear.container import SkygearContainer
```

For example, to send a push notification to some users:

```
from skygear.action import push_users
container = SkygearContainer()
push_users(container, ['jodn.doe@example.com', 'jane.doe@example.com'], {
    'aps': {
        'alert': 'Greetings from Skygear Plugin',
    },
    'gcm': {
        'notification': {
            'title': 'Exciting News for you',
            'body': 'Skygear Plugin sending notifications',
        },
    },
    # put custom fields here
    # will be applied to both aps and gcm
    'data': {
        'from': 'skygear',
        'operation': 'notification',
    },
})

# notification can also be sent to devices, see push_devices in the same package
```
