+++
date = "2015-09-23T09:57:05+08:00"
draft = true
title = "Local Storages"

+++

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

### 