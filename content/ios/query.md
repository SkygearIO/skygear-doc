<a name="basic-queries"></a>
## Basic Queries

We have shown how to fetch individual records by ids, but in real-world
application there are usually needs to show a list of items according to
some criteria. It is supported by queries in Skygear.

Let's see how to fetch a list of to-do items to be displayed in our
hypothetical To-Do app:

```obj-c
SKYQuery *query = [SKYQuery queryWithRecordType:@"todo" predicate:nil];

NSSortDescriptor *sortDescriptor = [NSSortDescriptor sortDescriptorWithKey:@"order" ascending:YES];
query.sortDescriptors = @[sortDescriptor];

[privateDB performQuery:query completionHandler:^(NSArray *results, NSError *error) {
    if (error) {
        NSLog(@"error querying todos: %@", error);
        return;
    }

    NSLog(@"Received %@ todos.", @(results.count));
    for (SKYRecord *todo in results) {
        NSLog(@"Got a todo: %@", todo[@"title"]);
    }
}];
```

We constructed a `SKYQuery` to search for `todo` records. There are no additional
criteria needed so we put the predicate to `nil`. Then we assigned a
`NSSortDescription` to ask Skygear Server to sort the `todo` records by `order` field ascendingly.

<a name="conditions"></a>
## Conditions

To use `SKYQuery` with ease, we recommend using the methods provided to add constraints. However, you can also use `NSPredicate` to add constraints if you wish. The following features are supported:

### Basic Comparisons

### Strings

### IN

The `IN` operator can be used to query a key for value that matches one of the
item in an `NSArray`.

```obj-c
NSPredicate *inPredicate =
            [NSPredicate predicateWithFormat: @"attribute IN %@", aCollection];
```

If the key being queried is a JSON type, the `IN` operator can also be used to
query the key to check if it contains a particular value:

```obj-c
NSPredicate *inPredicate =
            [NSPredicate predicateWithFormat: @"%@ IN attribute", aValue];
```

### Relation Predicate

The `SKYRelationPredicate` can be used to query for records having a relation with
the current user. For this kind of query, the record have an relation with
the current user if the record has an attribte that contains a user having
the relation with the current user.

For example, to query for records owned by a user that the current user is following:

```obj-c
NSPredicate *p =
            [SKYRelationPredicate predicateWithRelation:[SKYRelation followingRelation]
                                                    key:@"_owner"]
```

### Full-text search (**NOT IMPLEMENTED**)

### References

SKYKit's query supports filtering records by the reference field of records:

```obj-c
SKYReference *resturantRef = [SKYReference referenceWithRecordID:[SKYRecordID recordIDWithRecordType:@"restaurant" name:@"my resturant"]];
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"resturant = %@", resturantRef];
SKYQuery *query = [SKYQuery queryWithRecordType:@"order" predicate:predicate];

SKYDatabase *privateDB = database;

[privateDB performQuery:query completionHandler:^(NSArray *orders, NSError *error) {
    if (error) {
        NSLog(@"error querying orders: %@", error);
        return;
    }

    for (SKYRecord *order in orders) {
        // work with the fetched order
    }
}];
```

<a name="pagination-ordering"></a>
## Pagination and Ordering

### Sorting the records
We can sort records returned by:

```obj-c
NSSortDescriptor *sortDescriptor = [NSSortDescriptor sortDescriptorWithKey:@"_updated_at" ascending:NO];     // sorted by modificationDate
query.sortDescriptors = @[sortDescriptor];     // apply the NSSortDescriptor to the query
```

`SKYQuery` utilizes `NSPredicate` to apply filtering on query results. You can use other parameters to sort your quries.

### Limiting and Offset

We can limit the numbers of records returned by:

```obj-c
query.limit = 10;     // only show the top 10 records
```

We can also set an offset number to the query by:

```obj-c
query.offset = 5;     // ignore the first 5 records
```

Setting an `offset` number means skipping that many rolls before beginning to return rows. If the `offset` number is 0, then no rows will be skipped. If you use both `limit` and `offset`, then `offset` numbers of rows will be skipped before starting to limit the number of rows returned.

Now the first 5 records in the result list are skipped. The query result starts with the 6th record. It works just like SQL offset.

### Record Count

To get the number of all records matching a query, set the property
`overallCount` property of `SKYQuery` to `YES`. The record count can be
retrieved from `overallCount` property of `SKYQueryOperation` when
`perRecordCompletionBlock` is first called.

<a name="relational-queries"></a>
## Relational Queries

### Eager Loading

Skygear support eager loading of referenced records when you are querying the
referencing records. It's done by supplying a key path expression to
`[SKYQuery -transientIncludes]`:

```obj-c
SKYQuery *query = [SKYQuery queryWithRecordType:@"child" predicate:nil];
NSExpression *keyPath = [NSExpression expressionForKeyPath:@"parent"];
query.transientIncludes = @{@"parentRecord": keyPath};

[privateDB performQuery:query completionHandler:^(NSArray *results, NSError *error) {
    if (error) {
        NSLog(@"error fetching child: %@", error);
        return;
    }

    NSLog(@"received %@ children", @(results.count));
    for (SKYRecord *child in results) {
        SKYRecord *parent = child.transient[@"parentRecord"];
        NSLog(@"%@'s parent is %@", child.recordID, parent.recordID);
    }
}];
```

It is possible to eager load records from multiple keys, but doing so will
impair performance.

### Reference Actions **[not implemented]**

`ON DELETE CASCADE` TBC.

<a name="cached-queries"></a>
## Cached Queries

Skygear provides a simple cached query mechanism for application that wants to display data when the device is offline, or when the app has just started and hasn't had enough time to complete query requests to Skygear service yet. To make use of this, you just need to provide an extra callback function to the `query` function, and the SDK will try to return the cached result before it gets the latest result from the Skygear server.

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

<a name="subscription"></a>
## Subscribe to Query Change

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
