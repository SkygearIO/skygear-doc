+++
date = "2015-09-25T21:36:30+08:00"
draft = true
title = "Using Pubsub"

+++

Pubsub allows you to publish messages into a channel and have that messages
sent to all the clients subscribed to a channel. This allows you to make
an app that listens to events as it happens so that user gets a fast
and responsive experience.

Pubsub works out of the box and this feature is built into Ourd. To have
a server event trigger an message to be sent to the client, you have to
create a plugin that hooks into extension point, where you will determine
whether and what messages to publish to channel.

For example, you can make an app that automatically sends a pubsub message
when a create a new `note` record containing special words.

To build pubsub into Ourd, you have to import `OurdContainer`.

```
from py-skygear.container import OurdContainer
```

When you have an instance of OurdContainer, you can create a pubsub socket
so that you can send messages over the pubsub channel.

```
container = OurdContainer()
pubsub = container.pubsub()
```

To send a message to a channel, simply use the `publish` function.

```
pubsub.publish("notes_channel", {"message": "Hello World!"})
```

