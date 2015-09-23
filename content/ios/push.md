+++
date = "2015-09-23T11:39:05+08:00"
draft = true
title = "Push Notifications"

+++

1. Send push to user / device

## Sending push notification to users

```obj-c
ODNotificationInfo *info = [ODNotificationInfo notificationInfo];
info.alertBody = @"Hi there!";

ODSendPushNotificationOperation *operation = [ODSendPushNotificationOperation operationWithNotificationInfo:info userIDsToSend:@[kenji, rick]];
operation.sendCompletionHandler = ^(NSArray *userIDs, NSError *error) {
    if (error) {
        NSLog(@"error sending push notification");
        return;
    }

    NSLog(@"Sent %@ notification to 2 users", @(userIDs.count));
};

[[[NSOperationQueue alloc] init] addOperation:operation];
```

## Sending push notification to devices

```
ODNotificationInfo *info = [ODNotificationInfo notificationInfo];
info.alertBody = @"Hi device!";

ODSendPushNotificationOperation *operation = [ODSendPushNotificationOperation operationWithNotificationInfo:info deviceIDsToSend:@[@"device0", @"device1"]];
operation.sendCompletionHandler = ^(NSArray *deviceIDs, NSError *error) {
    if (error) {
        NSLog(@"error sending push notification");
        return;
    }

    NSLog(@"Sent %@ notification to %@ devices", @(deviceIDs.count));
};

[[[NSOperationQueue alloc] init] addOperation:operation];
```

### TODO: Problems with the interface

1. There are no expored interfaces for SDK to fetch device ids. Sending to device
   is basically unusable.
2. Cannot really think of a valid use case to send notification from one device
   to another device. Sending to devices is more of a plugin thing: e.g. send
   notification to devices that have an outdated version of app.
3. The first array argument of `sendCompletionHandler` is always of `NSString`
   In the case of sending to users, it would be expected to be an array of
   `ODUserRecordID`.
