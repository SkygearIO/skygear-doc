+++
date = "2015-09-25T12:30:11+08:00"
draft = true
title = "Database Extension Point"

+++

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


