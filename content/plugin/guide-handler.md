+++
date = "2015-09-25T12:30:58+08:00"
draft = true
title = "Handler Extension Point"

+++

To define a function as a custom handler, decorate it with `pyourd.handler`.

```
@pyourd.handler("chima:echo", auth_required=True)
def meow(payload, io):
    io.write(payload)
    return
```

This will allows your app to send a `chima:echo` request to Ourd, with the request sent to your plugin for processing. In this example, the request is echoed back to the app when calling `io.write`.

`auth_required=True` allows Ourd to restrict requests to authenticated users only.
