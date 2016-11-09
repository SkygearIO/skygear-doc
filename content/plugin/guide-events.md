Skygear provides an event mechanism for plugins to subscribe so that plugins
can have corresponding actions according to different status of Skygear server.

<a name="lifecycle-related"></a>
### Life cycle related events

Currently, Skygear provides the following server life cycle related events:

- Before Plugins Ready

This event is identified as `before-plugins-ready` and is sent right after all
plugins are registered in Skygear server. Plugins can have their own
initialization, like create or modify schema, when receiving this event.

Please be reminded that sending actions back to Skygear server at this state
requires a master key.

```python
import skygear
from skygear.options import options as skygear_options

@skygear.event("before-plugins-ready")
def initialization():
    # Initialize your plugin here...
    master_container = SkygearContainer(api_key=skygear_options.masterkey)
    master_container.send_action("schema:create", {
        # define your new schema here
    })

    return {
        "success": True
    }

```

- After Plugins Ready

This event is named as `after-plugins-ready`. Plugins will receive this event
after all plugins finish handling `before-plugins-ready` event. Plugins are
expected to insert seed data here if necessary.

You can need to login to a worker user before inserting seed data.

```python
import skygear
from skygear.options import options as skygear_options

WORKER_USERNAME = # get your worker username
WORKER_PASSWORD = # get your worker password

@skygear.event("after-plugins-ready")
def insert_seed_data():
    container = SkygearContainer()

    auth_info = container.send_action("auth:login", {
        "username": WORKER_USERNAME,
        "password": WORKER_PASSWORD
    })

    container.access_token = auth_info['result']['access_token']
    container.send_action("record:save", {
        # Add your seed data here...
    })

    return {
        "success": True
    }

```

<a name="non-lifecycle-related"></a>
### Non life cycle related events

Skygear will also provide some non life cycle related events. Currently, the
following events are provided:

- Schema Changed

This event is named as `schema-changed` and will be sent after the schema is
changed.

```python
import skygear

@skygear.event("schema-changed")
def schema_changed_event_changed(**data):
    log.info("Schema changed, data: {}".format(data))

    return {
        'success': True
    }

```
