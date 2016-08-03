### Calling lambda functions

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

Please refer to individual plugin documentation for expected arguments and
response content.

### Calling handler

If you defined a custom handler in a plugin, your app can make use of the
handler by creating a subclass of `SKYOperation`.

Your subclass of `SKYOperation` should implement the following methods:

*  `prepareForRequest` - Create an instance of `SKYRequest` and set the request
    to the `request` property of the `SKYOperation`. The `SKYRequest` should
    contains all data to be sent to the server.

    If this method is not implemented, you should at least call
    `initWithRequest:` or set the `request` property with an instance of
    `SKYRequest` before adding the operation to an operation queue.
     
*  `handleResponse:` - When server response is available, this method
    is called with an instance of `SKYResponse`, which the `responseDictionary`
    contains the data of server response.

    If this method is not implemented, the default implementation does nothing.

*   `handleRequestError:` - When an error occurred, this method is called
    with an instance of `NSError` containing details of an error.

    If this method is not implemented, the default implementation does nothing.

### Example

Suppose you have a custom handler that returns the current time based on
time zone. You should create a subclass of `SKYOperation` called
`SKYCurrentTimeInZoneOperation`.

You should implement the `prepareForRequest` method by creating `SKYRequest`
containing data of the request.

``` Objective-C

- (void)prepareForRequest
{
    NSDictionary *payload = @{
                              @"timezone": self.timezone
                              };
    self.request = [[SKYRequest alloc] initWithAction:self.action payload:payload];
    self.request.accessToken = self.container.currentAccessToken;
}

```

When calling this handler, you should add an instance of this operation to
an operation queue, such as by calling `-[SKYContainer addOperation:]`:

``` Objective-C

SKYCurrentTImeInZoneOperation *op = [[SKYCurrentTImeInZoneOperation alloc] init];
op.timezone = "Asia/Hong_Kong";
[[SKYContainer defaultContainer] addOperation:op];

```

When response is available from the server, your implementation of
`handleResponse:` will be called with the response.

``` Objective-C

- (void)handleResponse:(SKYResponse *)responseObject
{
    NSDictionary *response = responseObject.responseDictionary;
    NSLog("Time Now is: %@", response[@"result"][@"time"]
}

```

## Calling Authentication Provider

**NOT IMPLEMENTED**

### Facebook Authentication

If you expect your user to log in to your app with a Facebook account, you
should have the CocoaPods for SKYKit Facebook integration included. Once you did
that, you can call this method to have your user log in to Facebook.

``` Objective-C

- (void)login
{
    [[SKYContainer defaultContainer] loginUsingFacebookCompletionHandler:^(SKYUserRecordID *userID, NSError *error){
        NSLog(@"User ID: %@", userID)
    }];
}

```

You can also create an instance of `SKYFacebookLoginButton` and add it to
your view. The button calls the `loginUsingFacebookCompletionhandler:` for you.

If you want to implement your own login flow and experience, you should
obtain a Facebook access token using Facebook SDK, and call a category
method on `SKYLoginUserOperation` for logging a user in with the Facebook
access token:

``` Objective-C

- (void)loginWithFacebookAccessToken:(FBSDKAccessToken *)accessToken
{
    SKYLoginUserOperation *op = [SKYLoginUserOperation operationWithFacebookAccessToken:accessToken]
    op.loginCompletionBlock = ^(SKYUserRecordID *userID, SKYAccessToken *accessToken, NSError *error) {
        NSLog(@"User ID: %@", userID)
    };
    [[SKYContainer defaultContainer] addOperation:op];
}
```

### Custom Authentication Provider

If you implement your own authentication provider, you should create
an `NSDictionary` of authentication data and call `SKYLoginUserOperation`
`operationWithAuthenticationProvider:data:` method:

``` Objective-C

- (void)loginWithData:(NSDictionary *)dict
{
    SKYLoginUserOperation *op = [SKYLoginUserOperation operationWithAuthenticationProvider:@"com.example" data:dict]
    op.loginCompletionBlock = ^(SKYUserRecordID *userID, SKYAccessToken *accessToken, NSError *error) {
        NSLog(@"User ID: %@", userID)
    };
    [[SKYContainer defaultContainer] addOperation:op];
}
```
