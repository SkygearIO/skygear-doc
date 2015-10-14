+++
date = "2015-09-21T19:38:14+08:00"
draft = true
title = "Subscriptions"

+++

## Getting started

Creating a subscription requires your application to register the current device
on remote server. This is required for subscription to notify the client that
a subscription is triggered.

When a subscription is triggered, remote server notifies the client through
the publish-subscribe (pubsub) mechanism). It is also recommended that your
application requests a remote notification through the
`-registerForRemoteNotifications`. When a device token is available for
a device, the remote server also send a remote notification through Apple Push
Notification Service.

Having registered a device, your application should create a subscription by
specifying a query. The container will associate the device to the subscription
when you call the `-saveSubscription:completionHandler:` on the database.

### Registering device

It is suggested that you register a device with remote server on every launch.
Since the container remembers the device ID when the device is registered
on the remote server, it will reuse an existing device ID whenever you try
to register the current device.

You should also request a remote notification token at some point in the
program. If it is appropriate to ask the user for permission for remote
notification, you can also do so when the application launches.

```obj-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [[ODContainer defaultContainer] registerDeviceCompletionHandler:^(NSString *deviceID, NSError *error) {
        if (error) {
            NSLog(@"Failed to register device: %@", error);
            return;
        }
    
        // You should put subscription creation logic in the following method
        [self addSubscriptions];
    }];

    // This will prompt the user for permission to send remote notification
    [application registerForRemoteNotifications];

    // Other application initialization logic here
}
```

When a device token is registered with Apple Push Notification Service, you
should register the device once again by updating the registration
with a device token.

```obj-c
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    NSLog(@"Registered for Push notifications with token: %@", deviceToken);
    [[ODContainer defaultContainer] registerRemoteNotificationDeviceToken:deviceToken completionHandler:^(NSString *deviceID, NSError *error) {
        if (error) {
            NSLog(@"Failed to register device token: %@", error);
            return;
        }

        // You should put subscription creation logic in the following method
        [self addSubscriptions];
    }];
}
```

When the device is registered on the remote server, a device ID will be
available to the client application. If you register the current device
using the above convenient methods, the device ID is returned from
`registeredDeviceID` property on the container.

After you have registered device, you can create a subscription.

### Adding subscription

```obj-c
ODQuery *query = [[ODQuery alloc] initWithRecordType:@"note" predicate:nil];
ODSubscription *subscription =
[[ODSubscription alloc] initWithQuery:query subscriptionID:@"my notes"];
[[[ODContainer defaultContainer] privateCloudDatabase] saveSubscription:subscription
                                                       completionHandler:^(ODSubscription *subscription, NSError *error) {
    if (error) {
        NSLog(@"Failed to subscribe for my note: %@", error);
        return;
    }

    NSLog(@"Subscription successful.");
}];
```

### Implementing `ODContainerDelegate` to receive notification

Add protocol declaration in `AppDelegate`.

```obj-c
@interface AppDelegate : UIResponder <UIApplicationDelegate, ODContainerDelegate>
```

Implement the delegate method

```obj-c
- (void)container:(ODContainer *)container didReceiveNotification:(ODNotification *)notification
{
    NSLog(@"received notification = %@", notification);
    // do more with the notification (not implemented)
}
```

Set `AppDelegate` as container's delegate

```obj-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [ODContainer defaultContainer].delegate = self;
    // ...
}
```
