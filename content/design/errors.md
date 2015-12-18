+++
date = "2015-10-16T13:48:45+08:00"
draft = true
title = "Errors"

+++

*tldr*: Scroll down to bottom for platform differences and the list.

There is a call for better handling across various skygear components. This document is focused on how an occurred error from the backend should be reported to the client app, among other things.

# Error Code

Error code is an integer that indicates what kind of error has occurred. The purpose of an error code is to facilitate programmatic error handling, so that an app will be able to communicate to the user or resolve the error on the user's behalf. Developer can use error code to troubleshoot an issue.

Error code should uniquely identify an error. The same error can be reused at multiple locations, but single error code cannot mean two different kind of errors.

Error code are divided into two groups: Normal Error and Unexpected Error.

## Normal Error

Normal Error (100 - 999): Errors that are likely or expected to occur in normal operation. Client should handle such error gracefully. Error of this kind should be high level and as generic as possible to reduce the number of errors that the client has to handle.

## Unexpected Error

Unexpected Error (> 10000): Errors that are unlikely or unexpected to occur in normal operation. Client should treat all errors of this kind as internal error. Error of this kind should be as specific as possible.

When returning an error, the handler must assign an error code in the response.

Plugin may indicates an error code to Skygear to be passed to client.

## Error Message

Error message is a high level technical description of the error that occurred. The message helps the developer understand why an error has occurred and to provide a hint for how to troubleshoot the error.

When returning an error, the handler should return a high level description of the error rather than an internal low level description of an error.

Error message is not intended to be shown to a user and the error message is never localized.

## Error Info

Error info is a dictionary of data providing details for the error occurred. The content of error info is specific to each kind of error.

# Notes

* Define error code to be as generic as possible. Generic error code helps limit the number of errors for client app need to handle.
* Refrain from defining a new error code for different calling context. The caller is likely to know the context in which the error has occurred.
* Refrain from defining a new error code because a specific input is unexpected. Include additional information in the returned error instead.

# Examples

* In record fetch handler, it should return a “resource not found” error instead of a “record not found” because the client already knew the context that the error has occurred.
* In record save handler, it should not return a “unable to save” error code because returning an Unexpected Error implies that the record cannot be saved.

# Wrapping error

Discussion: Handler should wrap Unexpected Error with a Normal Error. The Unexpected Error should be available for debug mode.

# Platform differences

## iOS

SKYKit encapsulates the returned error in NSError. The `code` property contains the error code as returned from the server. If an error originates from the client side, an error code between 0-99 maybe used. The `localizedDescription` property contains a localized description of the error based on the `code` property. Localized description can be shown to the user.

The `userInfo` dictionary contains further details about the error, such as the server-side error message and error info dictionary.

## JS

The promise should be rejected with an Error object indicating an error code and a client-supplied error message. The server-side error message and error info dictionary should be available.

## Python

By default, the plugin handler would raise SkygearError to Skygear, which indicates an unexpected error has occurred. The Plugin may raise SkygearException with a error code and message to be returned to the client.

