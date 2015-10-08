+++
date = "2015-09-23T19:42:05+08:00"
draft = true
title = "Plugins"

+++

## Calling lambda functions

We can call lambda functions defined by custom plugin like this:

```obj-c
[container callLambda:@"hello:someone" arguments:@[@"world"] completionHandler:^(NSDictionary *response, NSError *error) {
    if (error) {
        NSLog(@"error calling hello:someone: %@", error);
        return;
    }

    NSLog(@"Received response = %@", response);
}];
```

Please refer to indivdual plugin documentation for expected arguments and
response content.

## Calling handler

If you defined a custom handler in a plugin, your app can make use of the
handler by creating a subclass of `ODOperation`.

Your subclass of `ODOperation` should implement the following methods:

*  `prepareForRequest` - Create an instance of `ODRequest` and set the request
    to the `request` property of the `ODOperation`. The `ODRequest` should
    contains all data to be sent to the server.

    If this method is not implemented, you should at least call
    `initWithRequest:` or set the `request` property with an instance of
    `ODRequest` before adding the operation to an operation queue.
     
*  `handleResponse:` - When server response is available, this method
    is called with an instance of `ODResponse`, which the `responseDictionary`
    contains the data of server response.

    If this method is not implemented, the default implementation does nothing.

*   `handleRequestError:` - When an error occurred, this method is called
    with an instance of `NSError` containing details of an error.

    If this method is not implemented, the default implementation does nothing.

### Example

Suppose you have a custom handler that returns the current time based on
time zone. You should create a subclass of `ODOperation` called
`ODCurrentTimeInZoneOperation`.

You should implement the `prepareForRequest` method by creating `ODRequest`
containing data of the request.

``` Objective-C

- (void)prepareForRequest
{
    NSDictionary *payload = @{
                              @"timezone": self.timezone
                              };
    self.request = [[ODRequest alloc] initWithAction:self.action payload:payload];
    self.request.accessToken = self.container.currentAccessToken;
}

```

When calling this handler, you should add an instance of this operation to
an operation queue, such as by calling `-[ODContainer addOperation:]`:

``` Objective-C

ODCurrentTImeInZoneOperation *op = [[ODCurrentTImeInZoneOperation alloc] init];
op.timezone = "Asia/Hong_Kong";
[[ODContainer defaultContainer] addOperation:op];

```

When response is available from the server, your implementation of
`handleResponse:` will be called with the response.

``` Objective-C

- (void)handleResponse:(ODResponse *)responseObject
{
    NSDictionary *response = responseObject.responseDictionary;
    NSLog("Time Now is: %@", response[@"result"][@"time"]
}

```

