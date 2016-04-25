Plugin extends functionality of Skygear to provide additional functionality or
modify existing behaviour. For example, a chatroom application may require
instant messaging on the server. Skygear does not provide instant messaging
functionality, but a plugin with instant messaging functionality can be called
by Skygear to provide the app with such function.

With Plugin, you can build additional functionality into Skygear while keeping them
integrated under the same core functionality provided by Skygear, such as user
accounts, push notification and record database.

Plugin can hook into extension points defined by Skygear. Each plugin hooked to an
extension point may be called by Skygear so that Plugin can run additional code
when certain events occurred. Skygear currently implement 5 types of extension
points: Database, Handler, Lambda, Authentication and Scheduled Tasks.

### Database Extension Point

Database Extension Point allows plugin to intercept database-related API
requests. At a database extension point, Plugin can modify the data to be
persisted, or otherwise reject save or delete operation.

For example, when Skygear Server receives a request to save a `note` record,
Skygear Server calls registered plugin so that the plugin has a change to add
additional data to the record, such as the number of words in the note content.

It is also possible for plugin to reject the `note` from saving by returning an
error. Skygear Server interprets an error as a reject to save a record.

A third example is for plugin to send a push notification after the `note`
record has been saved.

### Handler Extension Point

Handler Extension Point allows you to implement custom API between your app and
Skygear. When an app sends a request to Skygear Server with a registered custom API,
the request is forwarded to plugin. In turn, a plugin is able to call Skygear APIs,
Plugin APIs or other third-party APIs to perform custom login required by an
app.

For example, an app for online shopping can create a handler that process
payment and order confirmation using a third-party payment processor.

### Lambda Function

Lambda Function are similar to Handler Extension Point. However, it is easier to
set up and the processing overhead is less than a handler. A lambda function
also has less flexibility in handling a request. If you want a quick way to get
started using a plugin in, creating a lambda function is a great way to start

### Authentication Provider

Authentication Provider allows you to use an existing user database or social
network to authenticate users. As part of user creation and authentication, Skygear
sends user credentials to plugin so that the plugin can check credentials with
a third-party service.

For example, a social app may request Facebook login. Once authorized by user,
you can send the Facebook access token to Skygear to create a user associated with
this Facebook user.

If you develop an enterprise app, you can create an authentication provider so
that password can be checked with your corporate directory.

### Scheduled Tasks

Scheduled Tasks work similar to UNIX cron daemon: You may schedule a plugin to
run at certain time or interval. At the right time, Skygear Server sends a message
to plugin so that plugin can run periodic tasks.

## Plugin Architecture

In Skygear, plugin architecture consists of Skygear that acts as a message broker
among all plugins. When processing an extension point, Skygear Server communicate
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
