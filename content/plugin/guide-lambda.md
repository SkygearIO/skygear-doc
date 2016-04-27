Lambda function is the easiest to implement. In fact, you can decorate any python function with this decorator to instantly make it available to your app via Skygear.

```
@skygear.op("hello:world")
def say(name="world!"):
    return {"message": "Hello " + name}
```

In this function, a `hello:world` lambda function is created, ready to be called by your app. Py-skygear calls your function with argument converted from the request payload. The returned dict is returned to the app.

For example, the app can sends this request payload to Skygear:

```bash
curl -XPOST -H "Content-Type: application/json" \
-d @- http://localhost:3000/hello/world <<EOF
{
  "action": "hello:world",
  "args": ["Bob"]
}
EOF
```

When calling this function, the `name` variable contains the string `"Bob"`, which the function will include in the response like this:

```
{
  "message": "Hello Bob"
}
```

## Authenticated requests

By default, the lambda function created can be accessed by everyone, to restrict
access, you can specify `user_required` or `key_required` in the argument
of the `op` decorator.

* `user_required` - User access token is required to access the lambda function.
* `key_required` - Client API key is required to access the lambda function.

When logged in, information of the user who made the request is available
from the `current_user_id` function.

For example:

```
from skygear.utils.context import current_user_id

@skygear.op("hello:world", user_required=True)
def say(name="world!"):
    return {"message": "Hello " + current_user_id()}
```
