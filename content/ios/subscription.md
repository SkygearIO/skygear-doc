+++
date = "2015-09-21T19:38:14+08:00"
draft = true
title = "Subscriptions"

+++

## Getting started

### Registering device

```obj-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
   [application registerForRemoteNotifications];
   // ...
}
```

```obj-c
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    NSLog(@"Registered for Push notifications with token: %@", deviceToken);
    [[ODContainer defaultContainer] registerRemoteNotificationDeviceToken:deviceToken completionHandler:^(NSString *deviceID, NSError *error) {
        if (error) {
            NSLog(@"Failed to register device token: %@", error);
            return;
        }

        // TODO: add subscriptions here
    }];
}
```

**NOT IMPLEMENTED**: Creating a device without remote notification device token.

If your app cannot get a notification device token, you can still register
the device and receive notification through a pubsub channel:

```obj-c
[[ODContainer defaultContainer] registerPusbsubNotificationCompletionHandler:^(NSString *deviceID, NSError *error) {
    if (error) {
        NSLog(@"Failed to register pubsub device: %@", error);
        return;
    }

    // TODO: add subscriptions here
}];
```

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
