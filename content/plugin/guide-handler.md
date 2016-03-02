+++
date = "2015-09-25T12:30:58+08:00"
draft = true
title = "Handler Extension Point"

+++

To define a function as a custom handler, decorate it with `skygear.handler`.

```
@skygear.handler("chima:echo")
def meow(request):
    return request.body
```

This will allows your app to send a `chima:echo` request to Skygear, with the 
request sent to your plugin for processing. In this example, the request is
echoed back to the app.


## Required user

```
@skygear.handler("chima:food", user_required=True)
def cats(request):
    food_name = request.get('food_name')
    if food_name in eatible:
        return "meow"
    else:
        response = Response(418)
        response.body = "I am chima"
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

