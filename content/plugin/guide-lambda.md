+++
date = "2015-09-25T12:31:04+08:00"
draft = true
title = "Lambda Function"

+++

Lambda function is the easiest to implement. In fact, you can decorate any python function with this decorator to instantly make it available to your app via Ourd.

```
@pyourd.op("hello:world")
def say(name="world!"):
    return {"message": "Hello " + name}
```

In this function, a `hello:world` lambda function is created, ready to be called by your app. Pyourd calls your function with argument converted from the request payload. The returned dict is returned to the app.

For example, the app can sends this request payload to Ourd:

```
{
  "action": "hello:world",
  "args": ["Bob"]
}
```

When calling this function, the `name` variable contains the string `"Bob"`, which the function will include in the response like this:

```
{
  "message": "Hello Bob"
}
```
