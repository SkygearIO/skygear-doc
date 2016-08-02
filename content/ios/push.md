1. Send push to user / device

## Sending push notification to users

```obj-c
// send notification through APNS
SKYAPSNotificationInfo *apsInfo = [SKYAPSNotificationInfo notificationInfo];
apsInfo.alertBody = @"Hi iOS!";

SKYNotificationInfo *info = [SKYNotificationInfo notificationInfo];
info.apsNotificationInfo = apsInfo;

SKYSendPushNotificationOperation *operation = [SKYSendPushNotificationOperation operationWithNotificationInfo:info userIDsToSend:@[kenji, rick]];
operation.sendCompletionHandler = ^(NSArray *userIDs, NSError *error) {
    if (error) {
        NSLog(@"error sending push notification");
        return;
    }

    NSLog(@"Sent %@ notification to 2 users", @(userIDs.count));
};

[[SKYContainer defaultContainer] addOperation:operation];
```

## Sending push notification to devices

```
// send notification through both APNS and GCM
SKYAPSNotificationInfo *apsInfo = [SKYAPSNotificationInfo notificationInfo];
apsInfo.alertBody = @"Hi iOS!";

SKYGCMNotificationInfo *gcmInfo = [SKYGCMNotificationInfo notificationInfo];
gcmInfo.collapseKey = @"hello";
gcmInfo.notification.title = @"Greetings from Skygear";
gcmInfo.notification.body = @"Hi Android!";

SKYNotificationInfo *info = [SKYNotificationInfo notificationInfo];
info.apsNotificationInfo = apsInfo;
info.gcmNotificationInfo = gcmInfo;

SKYSendPushNotificationOperation *operation = [SKYSendPushNotificationOperation operationWithNotificationInfo:info deviceIDsToSend:@[@"device0", @"device1"]];
operation.sendCompletionHandler = ^(NSArray *deviceIDs, NSError *error) {
    if (error) {
        NSLog(@"error sending push notification");
        return;
    }

    NSLog(@"Sent %@ notification to %@ devices", @(deviceIDs.count));
};

[[SKYContainer defaultContainer] addOperation:operation];
```

### TODO: Problems with the interface

1. There are no exported interfaces for SDK to fetch device ids. Sending to device
   is basically unusable.
2. Cannot really think of a valid use case to send notification from one device
   to another device. Sending to devices is more of a plugin thing: e.g. send
   notification to devices that have an outdated version of app.
3. The first array argument of `sendCompletionHandler` is always of `NSString`
   In the case of sending to users, it would be expected to be an array of
   `SKYUserRecordID`.
