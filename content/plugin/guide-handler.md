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

## Restful Resource Decorator

Restful resource is a special kind of `skygear.handler` that implements
restful HTTP API. To use, define a class that subclass
`restful.RestfulResource` and decorate this class with the `skygear.rest`
decorator.

```python
import skygear

@skygear.rest('/notes')
class RestfulNote(skygear.RestfulResource):
    pass
```

The mapping of functions to implement and the HTTP restful endpoints are
as follows:

* `index(self)` (`GET /notes`) - list resources
* `create(self)` (`POST /notes`) - create a resource
* `delete(self, ident)` (`DELETE /notes/id`) - delete a resource
* `update(self, ident)` (`PUT /notes/id`) - update a resource
* `get(self, ident)` (`GET /notes/id`) - fetch a resource

In order to get the payload for creating and updating a resource, you
can call `self.get_payload()` in the above functions. It returns the
dict sent to the restful resource from the client.

```python
import skygear

@skygear.rest('/notes')
class RestfulNote(skygear.RestfulResource):
    def create(self):
        payload = self.get_payload()
        # save the payload here
        return payload
```

### Restful Record

`skygear.RestfulRecord` is a restful class that manipulates
skygear Record. To use it,

```python
import skygear

@skygear.rest('/notes', user_required=True)
class RestfulUser(skygear.RestfulRecord):
    record_type = 'note'
    database_id = '_public'
```

If your skygear database has a record type called `note`, You can fetch
a list of your `note` records from `GET /notes`. You do not need to
implement methods such as `index()` and `create()`.

The `user_required=True` parameter will ensures that only authenticated
user can access the restful resource and actions will be taken on
behalf of the user. The usual Record ACL applies.

You can modify the behavior of the `index()` function by implementing
the following functions:

* `predicate()` - This can be used to filter the returned resources
  from Skygear Server. The returned value should be an array
  containing Skygear query predicate.
* `query_options()` - This function should return a dict containing
  parameters to be sent to the Skygear Server `record:query` action.

Here is an example of how to implement a restful record with pagination
support:

```python
import skygear

@skygear.rest('/notes')
class RestfulUser(skygear.RestfulRecord):
    record_type = 'note'
    database_id = '_public'

    def query_options(self):
        # /notes?limit=50&offset=100 returns the 100th to 150th records,
        # ordered by the `title` field
        return {
            'limit': self.request.values.get('limit', 100),
            'offset': self.request.values.get('offset', 0),
            'sort': [[{'$val': 'title', '$type': 'keypath'}, 'asc']],
            'count': True
        }

    def predicate(self):
        # Only records with the `genre` field equals to `funny` will be
        # returned
        return ['eq', {'$type': 'keypath', '$val': 'genre'}, 'funny']
```
