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
push_users(
  container, [
    '9deef430-fbca-4d4b-b039-bd0a707c6c81',
    'e7dec437-87f5-41b9-b9f7-f6989204a17a'
  ], {
    'apns': {
        'aps': {
            'alert': 'Greetings from Skygear Plugin',
        },
        'from': 'skygear',
        'operation': 'notification',
    },
    'gcm': {
        'notification': {
            'title': 'Exciting News for you',
            'body': 'Skygear Plugin sending notifications',
        },
        'data': {
            'from': 'skygear',
            'operation': 'notification',
        },
    },
});

# notification can also be sent to devices, see push_devices in the same package
```

## Impersonate user using master key

With master key, you can act on behalf of an existing user. When creating
a container, you need to specify the master key as the API key and specify
the user ID of the user. Access token is no required.

```python
from .options import options
container = SkygearContainer(api_key=options.masterkey, user_id='abcdef1234')
```
