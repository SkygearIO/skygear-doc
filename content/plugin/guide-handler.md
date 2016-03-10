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

`str`, user will get the string in response body

`dict`, `list` or `int`, `py-skygear` will try to serialize the dict into json
object. User will get a JSON object in response body with Content-Type set to
`application/json`

`skygear.Response`, return a Response object with the custom headers and body
you want. It will return to use directly.


## Only mount to specific HTTP method

By default, handler is mount to all HTTP method supported, i.e. 'GET', 'POST'
and 'PUT'. If you only want to mount to specific action, you can specific as
follow.

```
@skygear.handler("chima:where", method=['GET'])
def chima_location(request):
    return "corner"
```

You can mount multiple function to same handler with different method

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

`user_required=True` allows Skygear to restrict requests to authenticated users only.

## Require Role

```
@skygear.handler("chima:age", role_required="admin")
def age(request):
    return 2
```

`role_required="admin"` allows Skygear to restrict requests to authenticated
users with admin role only.

