<a name="#basic-crud"></a>
Before we get to CRUD (creating, reading, updating and deleting) _records_, we need to talk about _container_, _database_ and _record_ first. Let's look at them one by one.

### SKYContainer

To read about `SKYContainer`, please go to [Getting Started]({{< relref "getting-started.md" >}}) section.

### SKYDatabase

`SKYDatabase` is the central hub of data storage in `SKYKit`. The main responsibility of database is to store `SKYRecord`s, the data storage unit in Skygear.

You will be provided with a private and a public database.

- Everything in the private database is truly private, regardless of what access
control entity you set to the record. In other words, each user has his own
private database, and only himself have access to it.
- Record saved at public database is by default public. Only the owner of the record can modify the record. Even without logging in, records in the public database can be queried (but not updated).
To control the access, you may set different access control entity to the record. However, only logged in user can do write operation on databases
- The database objects can be accessed with `[[SKYContainer defaultContainer] publicCloudDatabase]` and
`[[SKYContainer defaultContainer] privateCloudDatabase]`.

Head to [Access Control](/ios/guide/access-control) to read more about it.

### SKYRecord

- `SKYRecord` must have a type.
- `SKYRecord` is a key-value data object that can be stored at _database_.
- `SKYRecord` will belong to the currently logged in user.
- `SKYRecord` object has a unique `id` (a string combination of record type and uuid is used).
- Each `SKYRecord` has a `recordType`, which describes the _type_ of data this record holds.

	A record can store whatever values that are JSON-serializable. Possible values include
strings, numbers, booleans, dates, and several other custom types that Skygear
supports. (TODO: add references to other pages).

## Creating a record

Let's imagine we are writing a To-Do app with Skygear. When user creates
an to-do item, we want to save that item on server. We probably will save that
to-do item like this:

```obj-c
SKYRecord *todo = [SKYRecord recordWithRecordType:@"todo"];
todo[@"title"] = @"Write documents for Skygear";
todo[@"order"] = @1;
todo[@"done"] = @NO;

SKYDatabase *privateDB = [[SKYContainer defaultContainer] privateCloudDatabase];
[privateDB saveRecord:todo completion:^(SKYRecord *record, NSError *error) {
    if (error) {
        NSLog(@"error saving todo: %@", error);
        return;
    }

    NSLog(@"saved todo with recordID = %@", record.recordID);
}];
```

There are couples of things we have done here:

1. First we created a `todo` _record_ and assigned some attributes to it. you can use the `[]` subscripting operator as shown above, or the `setObject:forKey:` method. Your app automatically creates this Class when you first use it.
2. We fetched the _container_ of our app, and took a reference to the private
   database of the current user. So when you save a _record_, you're saving the record to the private database of the current user.
3. We actually saved the `todo` record and registered a block to be executed
   after the action is done. When you have successfully saved a _record_, there are several fields automatically filled in for you, such as `SKYRecordID`, `recordName`,`creationDate` and `modificationDate`. A `SKYRecord` will be returned and you can make use of the block to add additional logic which will run after the save completes.
   
You can also save multiple `SKYRecord`s at once.
(TODO: Add code example)

## Reading a record

You can construct a `SKYQuery` object by providing a `recordType`. You can configure the `SKYQuery` by mutating its state. Read the [Query]({{< relref "query.md" >}}) section to learn more.

(TODO: Add code example)

## Updating a record

Now let's return to our to-do item example. This is how you save a `SKYRecord`:

```obj-c
SKYRecord *todo = [SKYRecord recordWithRecordType:@"todo"];
todo[@"title"] = @"Write documents for Skygear";
todo[@"order"] = @1;
todo[@"done"] = @NO;

SKYDatabase *privateDB = [[SKYContainer defaultContainer] privateCloudDatabase];
[privateDB saveRecord:todo completion:^(SKYRecord *record, NSError *error) {
    if (error) {
        NSLog(@"error saving todo: %@", error);
        return;
    }

    NSLog(@"saved todo with recordID = %@", record.recordID);
}];
```

After you have successfully saved the `SKYRecord`, the server will return an updated `SKYRecord`. Your console should look like this:

```
2015-09-22 16:16:37.893 todoapp[89631:1349388] saved todo with recordID = <SKYRecordID: 0x7ff93ac37940; recordType = todo, recordName = 369067DC-BDBC-49D5-A6A2-D83061D83BFC>
```

As you can see, the returned `SKYRecord` now has a `recordID`. The `recordID` property on your saved todo `SKYRecord` is a unique `recordID` which identifies the record in a database.

With the `recordID` you can modify the record later on. Say if
you have to mark this todo as done:

(TODO: I think we should use the `SKYRecordID` instead of the `recordName`? It seems a bit confusing to me.)

```obj-c
SKYRecord *todo = [SKYRecord recordWithRecordType:@"todo" name:@"369067DC-BDBC-49D5-A6A2-D83061D83BFC"];
todo[@"done"] = @YES;
[privateDB saveRecord:todo completion:nil];
```

Note that the data in the returned record in the completion block may be
different from the originally saved record. This is because additional
fields maybe applied on the server side when the record is saved (e.g. the updated `modificationDate`). You may want to inspect the returned record for any changes applied on the server side.

## Fetching an existing record

With the `recordID` we could also fetch the record from a database:

```obj-c
SKYRecordID *recordID = [SKYRecordID recordIDWithRecordType:@"todo" name:@"369067DC-BDBC-49D5-A6A2-D83061D83BFC"];
[privateDB fetchRecordWithID:recordID completionHandler:^(SKYRecord *record, NSError *error) {
    if (error) {
        NSLog(@"error fetching todo: %@", error);
        return;
    }

    NSString *title = record[@"title"];
    NSNumber *order = record[@"order"];
    NSNumber *done = record[@"done"];

    NSLog(@"Fetched a note (title = %@, order = %@, done = %@)", title, order, done);
}];
```

To get the values out of the SKYRecord, you can use the `[]` subscripting operator as shown above, or the `objectForKey:` method.
(TODO: add the `objectForKey:` example code here)

Some of the values are provided as properties:
(TODO: add the example code here to show that some properties like `creationDate`, `modificationDate`, `recordID`, `recordType` etc.)

## Deleting a record

Deleting a record requires its `recordID` too:

```obj-c
SKYRecordID *recordID = [SKYRecordID recordIDWithRecordType:@"todo" name:@"369067DC-BDBC-49D5-A6A2-D83061D83BFC"];
[privateDB deleteRecordWithID:recordID completionHandler:nil];
```

If you are to delete records in batch, you could also use the
`SKYDatabase-deleteRecordsWithIDs:completionHandler:perRecordErrorHandler:`
method.

You can also delete multiple records at once.
(TODO: Add code example)

<a name="auto-increment"></a>
# Auto-Incrementing Sequence Fields

##Make use of sequence object

Skygear reserves the `id` field in the top level of all record as a primary key.
`id` must be unique and default to be Version 4 UUID. If you want to
auto-incrementing id for display purpose, Skygear provide a sequence for this 
purpose. The sequence is guaranteed unique.

```obj-c
SKYRecord *todo = [SKYRecord recordWithRecordType:@"todo"];
todo[@"title"] = @"Write documents for Skygear";
todo[@"noteID"] = [SKYSequence sequence];

SKYDatabase *privateDB = [[SKYContainer defaultContainer] privateCloudDatabase];
[privateDB saveRecord:todo completion:^(SKYRecord *record, NSError *error) {
    if (error) {
        NSLog(@"error saving todo: %@", error);
        return;
    }

    NSLog(@"saved todo with auto increment noteID = %@", record[@"noteID"]);
}];
```

- You can omit the `noteID` on update, the value will remain unchanged.
- All the other `Note` in the database will now automatically have their
  `noteID` as well.
- You can migrate any integer to auto-incrementing sequence.
- Our JIT schema at development will migrate the DB schema to sequence. All
  `noteID` at `Note` will be a sequence type once migrated.

## Override sequence manually

```obj-c
SKYRecord *todo = [SKYRecord recordWithRecordType:@"todo"];
todo[@"title"] = @"Override noteID";
todo[@"noteID"] = @43;

SKYDatabase *privateDB = [[SKYContainer defaultContainer] privateCloudDatabase];
[privateDB saveRecord:todo completion:^(SKYRecord *record, NSError *error) {
    if (error) {
        NSLog(@"error saving todo: %@", error);
        return;
    }

    NSLog(@"saved todo with noteID == 43, %@", record[@"noteID"]);
}];
```

<a name="reserved-columns"></a>
# Reserved Columns

<a name="local-storage"></a>
# Local Storage (Offline)

## Cached Query

```obj-c
SKYQuery *query = [SKYQuery queryWithRecordType:@"todo" predicate:nil];
[publicDB performCachedQuery:query completionHandler:^(NSArray *results, BOOL cached, NSError *error) {
    if (cached) {
        // results from cache
        // it will be called first if cache is available
    } else {
        // results from server, resulted in a second call
    }
}];
```

## Record storage

### Setup

Record storage relies on [subscription]({{< relref "subscription.md" >}})

```obj-c
- (void)container:(SKYContainer *)container didReceiveNotification:(SKYNotification *)notification
{
    // ...
    [[SKYRecordStorageCoordinator defaultCoordinator] handleUpdateWithRemoteNotification:notification];
}

```

### Creating a record storage

```obj-c
SKYQuery *query = [[SKYQuery alloc] initWithRecordType:@"note" predicate:nil];
SKYRecordStorageCoordinator *coordinator = [SKYRecordStorageCoordinator defaultCoordinator];
SKYRecordStorage* recordStorage = [coordinator recordStorageWithDatabase:self.database
                                                                  query:query options:nil];
```

### Saving records

```obj-c
SKYRecord *note = [SKYRecord recordWithRecordType:@"note"];
note[@"content"] = @"record storage is fun!";
[recordStorage saveRecord:note];
```

### Deleting records

```obj-c
[recordStorage deleteRecord:noteToDelete];
```

### Fetching records

```obj-c
SKYRecord *record = [recordStorage recordWithRecordID:recordID];
```

### Querying records

```obj-c
for (SKYRecord *note in [recordStorage recordsWithType:@"note"]) {
    // do something with note
}
```

```obj-c
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"done == false"];
NSArray *records = [recordStorage recordsWithType:@"todo"
                                        predicate:predicate
                                  sortDescriptors:nil];
for (SKYRecord *note in records) {
    // do something with note
}
```

### Listening to change event

```obj-c
[[NSNotificationCenter defaultCenter] addObserverForName:SKYRecordStorageDidUpdateNotification
                                                  object:recordStorage
                                                   queue:[NSOperationQueue mainQueue]
                                              usingBlock:^(NSNotification *note) {
                                                  self.notes = [self.categoryStorage recordsWithType:@"note"];
                                                  [self.tableView reloadData];
                                              }];
``` 

<a name="reference"></a>
# Record Relations

1. Two default relations: friend and follower

## Adding relation between users

```obj-c
SKYAddRelationsOperation *operation = [SKYAddRelationsOperation operationWithType:@"friend" usersToRelated:@[rick, ben]];
operation.container = [SKYContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

## Removing relations

```obj-c
SKYRemoveRelationsOperation *operation = [SKYRemoveRelationsOperation operationWithType:@"follower" usersToRemove:@[faseng, chima]];
operation.container = [SKYContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

## Querying users by relations

Get all friends:

```obj-c
SKYQueryUsersOperation *operation = [SKYQueryUsersOperation queryUsersOperationByRelation:[SKYRelation friendRelation]];
operation.container = [SKYContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

Get all followers:

```obj-c
SKYQueryUsersOperation *operation = [SKYQueryUsersOperation queryUsersOperationByRelation:[SKYRelation followRelation] direction:SKYRelationDirectionPassive];
operation.container = [SKYContainer defaultContainer];
__weak SKYQueryUsersOperation *weakOperation = operation;
operation.queryUserCompletionBlock = ^(NSArray *users, NSError *operationError) {
    NSLog(@"Operation will have overallCount after execution, %d", weakOperation.overallCount);
};

[[[NSOperationQueue alloc] init] addOperation:operation];
```

`SKYQueryUsersOperation-relationDirection` is only effective on `followRelation`.

### Relation directions

TODO: talks about directional and undirectional relation, and how friend and
follower are examples of them
TODO: Discuss the values of SKYRelationDirection

Get all following users:

```obj-c
SKYQueryUsersOperation *operation = [SKYQueryUsersOperation queryUsersOperationByRelation:[SKYRelation followRelation] direction:SKYRelationDirectionActive];
operation.container = [SKYContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

Get all mutual followers: **[Not implemented]**

```obj-c
SKYQueryUsersOperation *operation = [SKYQueryUsersOperation queryUsersOperationByRelation:[SKYRelation followRelation] direction:SKYRelationDirectionMutual];
operation.container = [SKYContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

<a name="subscription"></a>
# Subscription

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
    [[SKYContainer defaultContainer] registerDeviceCompletionHandler:^(NSString *deviceID, NSError *error) {
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
    [[SKYContainer defaultContainer] registerRemoteNotificationDeviceToken:deviceToken completionHandler:^(NSString *deviceID, NSError *error) {
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
SKYQuery *query = [[SKYQuery alloc] initWithRecordType:@"note" predicate:nil];
SKYSubscription *subscription =
[[SKYSubscription alloc] initWithQuery:query subscriptionID:@"my notes"];
[[[SKYContainer defaultContainer] privateCloudDatabase] saveSubscription:subscription
                                                       completionHandler:^(SKYSubscription *subscription, NSError *error) {
    if (error) {
        NSLog(@"Failed to subscribe for my note: %@", error);
        return;
    }

    NSLog(@"Subscription successful.");
}];
```

### Implementing `SKYContainerDelegate` to receive notification

Add protocol declaration in `AppDelegate`.

```obj-c
@interface AppDelegate : UIResponder <UIApplicationDelegate, SKYContainerDelegate>
```

Implement the delegate method

```obj-c
- (void)container:(SKYContainer *)container didReceiveNotification:(SKYNotification *)notification
{
    NSLog(@"received notification = %@", notification);
    // do more with the notification (not implemented)
}
```

Set `AppDelegate` as container's delegate

```obj-c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [SKYContainer defaultContainer].delegate = self;
    // ...
}
```
