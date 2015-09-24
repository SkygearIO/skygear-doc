+++
date = "2015-09-18T17:02:47+08:00"
draft = true
title = "Plugin Development Guide"

+++

When you have set up your first plugin, you can begin extending Ourd
functionality by hooking into Ourd extension points.

## Database Extension Point

Pyourd provides the following decorators to implement Database Extension Point:

* `before_save` — executes decorated function before a record save operation occurs
* `before_delete` — executes decorated function before a record delete operation occurs
* `after_save` — executes decorated function before a record save operation occurs
* `after_delete` — executes decorated function before a record save operation occurs

For example, to have Ourd calls your plugin when a `note` record is about to be saved, you defined a function like this and decorate it with `before_save`:

```
@pyourd.before_save("note", async=False)
def update_word_count(record, original_record, db):
    word_list = record["content"].split(" ")
    record["word_count"] = len(word_list)
    return record
```

When your app sends a `record:save` operation for a `note` record, Ourd sends a message to your plugin to handle this event. Pyourd will call this function in the list of registered hooks.

In this example, the function update the `word_count` attribute with the number of words in the article. The changes are sent back to Ourd by returning the record object.

To reject the saving operation, you can raise an exception in the function. Raising an exception signal to pyourd and Ourd that the record should not be saved:

```
@pyourd.before_save("note", async=False)
def update_word_count(record, original_record, db):
    if contains_banned_words(record["content"]):
        raise Exception("Should not be saved.")
    return record
```

In this example, Ourd will not save the record if `contains_banned_words(record["content"])` returns `True`.

The `async=False` specified in `before_save` is important here. With `async=False`, ourd waits for your plugin before proceeding to save the record. Without it, Ourd will not wait for the plugin, hence the plugin will not be able to make changes to the record. Likewise, you cannot reject an operation if `async=True`. `async=True` is the default.

If the record is modified instead of newly created, a record object will be passed to the function in
the `original_record` parameter. This is how you detect what data is changed in the record.

The `after_save` and `after_delete` works similarly to the `before_save` and `before_delete` counterparts. They are different in that the relevant operation has already completed when the function is called. Changing record attributes will not affect the saved record.

## Handler Extension Point

To define a function as a custom handler, decorate it with `pyourd.handler`.

```
@pyourd.handler("chima:echo", auth_required=True)
def meow(payload, io):
    io.write(payload)
    return
```

This will allows your app to send a `chima:echo` request to Ourd, with the request sent to your plugin for processing. In this example, the request is echoed back to the app when calling `io.write`.

`auth_required=True` allows Ourd to restrict requests to authenticated users only.

## Lambda Function

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

## Authentication Provider

A common use case of a social app is to authenticate user with popular social network. Authentication Provider allows a plugin to authenticate user based on credentials from a third-party. The Authentication Provider respond to Ourd whether the credentials are accepted.

When authenticated, Ourd creates new user account for new user or fetches an existing user account for an existing user. Ourd distinguish user account by User ID, which your Authentication Provider has to generate based on the supplied credentials.

Here is a simple example to implement Facebook login for your app.

```
import pyourd
import pyourd.providers
import facebook

@pyourd.provides("auth", "com.facebook")
class FacebookProvider(pyourd.providers.BaseAuthProvider):
    def login(self, auth_data):
        graph = facebook.GraphAPI(access_token=auth_data['access_token'])
        auth_data.update(graph.get_object(id='me'))
        return {"principal_id": auth_data['id'], "auth_data": auth_data}
```

To create an Authentication Provider, you have to declare a class that implements `pyourd.providers.BaseAuthProvider`. In this example, you need`import pyourd.providers` as well as `import facebook` to use the Facebook SDK.

The decorator `@pyourd.provides("auth", "com.facebook")` decorates the class and register it to Ourd. The first argument denotes that this is an Authentication Provider, and the provider has the name `com.facebook`. The provider name can be arbitrary, but it should adopt the reverse DNS name of your company as a convention.

Your app needs to obtain an access token by calling Facebook SDK from the client side. If you use relevant Ourd framework, the Facebook authentication flow will be handled for you automatically. In this example, the Authentication Provider will validates access token with Facebook and return teh user’s Facebook ID to Ourd.

Plugin can also return additional authentication data to Ourd. Doing this allows you to store additional data to User object.

## Scheduled Tasks

You can decorate a function with `pyourd.every` so that the function is executed periodically. To schedule that a task to be executed every minute:

```
@pyourd.every("@every 1m")
def watch(io):
    open('/tmp/messages.txt', 'a').write('Hello World!\n')
```

