+++
date = "2015-09-25T21:36:30+08:00"
draft = true
title = "Using Pubsub"

+++

Pubsub allows you to publish messages into a channel and have that messages
sent to all the clients subscribed to a channel. This allows you to make
an app that listens to events as it happens so that user gets a fast
and responsive experience.

Pubsub works out of the box and this feature is built into Skygear. To have
a server event trigger an message to be sent to the client, you have to
create a plugin that hooks into extension point, where you will determine
whether and what messages to publish to channel.

For example, you can make an app that automatically sends a pubsub message
when a create a new `note` record containing special words.

To build pubsub into Skygear, you have to import `SkygearContainer`.

```
from skygear.container import SkygearContainer
```

When you have an instance of SkygearContainer, you can create a pubsub socket
so that you can send messages over the pubsub channel.

```python
container = SkygearContainer()
pubsub = container.pubsub()
```

To send a message to a channel, simply use the `publish` function.

```python
pubsub.publish("notes_channel", {"message": "Hello World!"})
```

To subscribe to a channel, define a function and decorate it with `skygear.subscribe`

```python
@skygear.subscribe("ping")
def pinger(payload):
    # publish to another channel
    pubsub.publish("pong", {"message": "I have got a ping."})
    return
```
