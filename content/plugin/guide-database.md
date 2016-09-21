Py-skygear provides the following decorators to implement Database Extension Point:

* `before_save` — executes decorated function before a record save operation occurs
* `before_delete` — executes decorated function before a record delete operation occurs
* `after_save` — executes decorated function before a record save operation occurs
* `after_delete` — executes decorated function before a record save operation occurs

For example, to have Skygear Server calls your plugin when a `note` record is about to be saved, you defined a function like this and decorate it with `before_save`:

```
@skygear.before_save("note", async=False)
def update_word_count(record, original_record, db):
    word_list = record["content"].split(" ")
    record["word_count"] = len(word_list)
    return record
```

When your app sends a `record:save` operation for a `note` record, Skygear Server sends a message to your plugin to handle this event. Py-skygear will call this function in the list of registered hooks.

In this example, the function update the `word_count` attribute with the number of words in the article. The changes are sent back to Skygear Server by returning the record object.

To reject the saving operation, you can raise an exception in the function. Raising an exception signal to py-skygear and Skygear Server that the record should not be saved:

```
@skygear.before_save("note", async=False)
def update_word_count(record, original_record, db):
    if contains_banned_words(record["content"]):
        raise Exception("Should not be saved.")
    return record
```

In this example, Skygear Server will not save the record if `contains_banned_words(record["content"])` returns `True`.

The `async=False` specified in `before_save` is important here. With `async=False`, skygear server waits for your plugin before proceeding to save the record. Without it, Skygear Server will not wait for the plugin, hence the plugin will not be able to make changes to the record. Likewise, you cannot reject an operation if `async=True`. `async=False` is the default.

If the record is modified instead of newly created, a record object will be passed to the function in
the `original_record` parameter. This is how you detect what data is changed in the record.

The `after_save` and `after_delete` works similarly to the `before_save` and `before_delete` counterparts. They are different in that the relevant operation has already completed when the function is called. Changing record attributes will not affect the saved record.

## Getting user context

The user context is available in database hook by calling the `current_user_id`
function.

``` python
from skygear.utils.context import current_user_id

@skygear.before_save("note", async=False)
def update_note(record, original_record, db):
    record["annotation"] = "This note is created by user: " + current_user_id()
    return record
```

## Using database outside Database Extension Point

py-skygear provide a database connection context function for developer to use db
connection at `handler`, `lambda` and `schedule`.

``` python
from skygear.utils.db import conn


@skygear.op('user:reset-password')
def reset_password(email, password):
    if not email:
        return {'success': False}

    with conn() as conn:
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        result = conn.execute(
            'UPDATE _user SET password = %s WHERE email = %s',
            hashed.decode('utf-8'),
            email,
        )

        if result.rowcount == 0:
            return {'success': False}
        else:
            return {'success': True}
```
