+++
date = "2015-09-25T12:30:58+08:00"
draft = true
title = "Handler Extension Point"

+++

To define a function as a custom handler, decorate it with `skygear.handler`.

```
@skygear.handler("chima:echo")
def meow(request):
    return request.get_data(as_text=True)
```

This will allows your app to send a `chima:echo` request to Skygear, with the
request sent to your plugin for processing. In this example, the request is
echoed back to the app.

## Return format of handlers

You can return one of the followings in a custom handler function:

* `str`, user will get the string in response body

* `dict`, `list` or `int`, `py-skygear` will try to serialize the dict into json
  object. User will get a JSON object in response body with `Content-Type` set to
  `application/json`

* `skygear.Response`, return a Response object with the custom headers and body
  you want. It will return to user directly.

## Accept specific HTTP method only

By default, handler accepts all the supported HTTP method, i.e. 'GET', 'POST'
and 'PUT'. If you want your custom handler to accept specific action only,
do the followings:

```
@skygear.handler("chima:where", method=['GET'])
def chima_location(request):
    return request.values.get('size', 'too large')
```

The query string is parsed and store at `request.values`.

You can have another function that accepts a different method by decorating
your function with a different `method` value:

```
@skygear.handler("chima:where", method=['PUT'])
def chima_move(request):
    return "you can move me, but I will return to corner"
```

## Required user

```
@skygear.handler("chima:food", user_required=True)
def cats(request):
    food_name = request.get('food_name')
    if food_name in eatible:
        return "meow"
    else:
        response = skygear.Response(
            status=418,
            headers={
                "X-Skygear-Server": "faseng"
            },
            body="I am chima")
```

`user_required=True` allows Skygear Server to restrict requests to authenticated users only.

## Require Role

**NOT IMPLEMENTED**

```
@skygear.handler("chima:age", role_required="admin")
def age(request):
    return 2
```

`role_required="admin"` allows Skygear Server to restrict requests to authenticated
users with admin role only.
