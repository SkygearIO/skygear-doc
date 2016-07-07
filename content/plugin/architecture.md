In Skygear, the plugin architecture consists of Skygear that acts as a
message broker among all plugins. When processing an extension point, Skygear Server communicate
with each plugin.

Plugin is an out-of-process program running alongside Skygear. One advantage of
utilising an out-of-process and a message architecture, you can develop plugin
in your favourite language. Currently, you can create a plugin using the Python
SDK.

This also makes plugin to be scalable because you can run plugin on remote
systems.

When handling a message, there are two ways a plugin may talk back to Skygear. The
simplest way is to include data in the respond of the message. This case is most
common when using a Database Extension Point, in which the plugin may reject an
operation by returning an error.

Secondly, you can call other Skygear API or Plugin API by sending an API request
via a side channel. This is similar to how your app communicates to Skygear.
