## Introduction

Plugins extend Skygear to provide additional functionalities or
modify existing behaviors. For example, a chatroom application may require
instant messaging on the server, but Skygear does not provide built-in instant
messaging functionality. In this case, a plugin can be used to provide the
required feature.

With Plugin, you can build additional functionality into Skygear while keeping them
integrated under the same core functionality provided by Skygear, such as user
accounts, push notification and record database.

Plugins are enabled by hooking into one of the extension points provided by
Skygear. When the event associated with the extension point is triggered,
the corresponding plugin will be called.  Skygear currently implement 5 types of
extension points: Database, Handler, Lambda, Authentication and Scheduled Tasks.

## Types of Extension Points

### Database Extension Point

The Database Extension Point allows a plugin to intercept database-related API
requests. At a database extension point, a plugin can modify the data to be
persisted, or otherwise reject the save or delete operations.

For example, when Skygear Server receives a request to save a `note` record,
Skygear Server calls the registered plugins so that the plugins have a chance to
add additional data to the record, such as the number of words in the note body.

It is also possible for plugins to prevent the `note` from saving by raising an
error. Skygear Server interprets an error as a reject to save a record.

The plugin can also perform other operations based on the record change, e.g.
sending a push notification after the `note` record has been saved.

### Lambda Function

A Lambda Function allows you to implement custom API between your app and
Skygear. You can call the lambda function from an SDK; the request will be
forwarded to the plugin by the Skygear Server, executing the custom code
of the Lambda Function.

The Lambda Function can make calls to Skygear APIs, plugin APIs or other
third-party APIs, before returning values back to the client.

For example, an app for online shopping can create a Lambda Function that processes
payments and order confirmations using a third-party payment processor.

### Handler Extension Point

A Handler Extension Point is similar to a Lambda Function, with the following
differences:

- a handler is exposed by a URL, e.g. `endpoint.skygeario.com/chima/echo`
- a handler is essentially an HTTP request handler
- the handler accepts a request object, and can return a variety of values,
  thus allowing more flexibility compared to using the lambda functions

### Authentication Provider

Authentication Provider allows you to use an existing user database or social
network to authenticate users. As part of the user creation and authentication
process, Skygear sends the user credentials to the authentication plugin so that
the plugin can verify the credentials against a third-party service.

For example, a social app can request Facebook login. Once authorized by the user,
you can send the Facebook access token to Skygear to create a Skygear user
associated with the corresponding Facebook user by using an authentication provider.

If you develop an enterprise app, you can create an authentication provider to
check the password against your corporate directory.

### Scheduled Tasks

Scheduled Tasks work similar to the cron daemon in UNIX: You may schedule a
plugin to run at a certain time or at regular intervals.
