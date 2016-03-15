+++
date = "2015-09-18T17:01:59+08:00"
draft = true
title = "Include plugin by git submodule"

+++

Skygear community provide a wide range of ready-to-use plugin, you can easily
load the plugin by using git submodule.

First, find some plugin you want to use on skygeario repos:

https://github.com/SkygearIO/


For example, we want to add chat functionality. Let's install
https://github.com/SkygearIO/chat


Assuming your cloud code have standard folder layout like the following:

``` python
__init__.py
utils.py
```

## Add the chat plugin as submodule by following command

`git submodule add git@github.com:SkygearIO/chat.git`

You will have a new folder called `chat`.

Load the chat plugin by adding the following code at the top of your
`__init__.py`

``` python
from .chat import plugin
```

All done, start your plugin like you normally do. The chat plugin will
register itself to Skygear.

## Using utils provided by plugin

For example, you need the unread message count of a special pinned chat, for
some feature like system announcement. In your own cloud code. You can
write the following

``` python
import skygear
from .chat import plugin as chat_plugin

ANNOUNCE_ID = 1


@skygear.op("chat:announcement")
def pinned_unread():
    return {
        'unread_count': chat_plugin.get_unread_message_count(ANNOUNCE_ID)
    }

```


## Upgrading plugin

To upgrade plugin, you just upgrade the submodule.

```shell
$ git submodule foreach git pull origin master
```

