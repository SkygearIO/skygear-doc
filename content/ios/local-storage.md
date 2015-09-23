+++
date = "2015-09-23T09:57:05+08:00"
draft = true
title = "Local Storages"

+++

## Cached Query

```obj-c
ODQuery *query = [ODQuery queryWithRecordType:@"todo" predicate:nil];
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
- (void)container:(ODContainer *)container didReceiveNotification:(ODNotification *)notification
{
    // ...
    [[ODRecordStorageCoordinator defaultCoordinator] handleUpdateWithRemoteNotification:notification];
}

```

### Creating a record storage

```obj-c
ODQuery *query = [[ODQuery alloc] initWithRecordType:@"note" predicate:nil];
ODRecordStorageCoordinator *coordinator = [ODRecordStorageCoordinator defaultCoordinator];
ODRecordStorage* recordStorage = [coordinator recordStorageWithDatabase:self.database
                                                                  query:query options:nil];
```

### Saving records

```obj-c
ODRecord *note = [ODRecord recordWithRecordType:@"note"];
note[@"content"] = @"record storage is fun!";
[recordStorage saveRecord:note];
```

### Deleting records

```obj-c
[recordStorage deleteRecord:noteToDelete];
```

### Fetching records

```obj-c
ODRecord *record = [recordStorage recordWithRecordID:recordID];
```

### Querying records

```obj-c
for (ODRecord *note in [recordStorage recordsWithType:@"note"]) {
    // do something with note
}
```

```obj-c
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"done == false"];
NSArray *records = [recordStorage recordsWithType:@"todo"
                                        predicate:predicate
                                  sortDescriptors:nil];
for (ODRecord *note in records) {
    // do something with note
}
```

### Listening to change event

```obj-c
[[NSNotificationCenter defaultCenter] addObserverForName:ODRecordStorageDidUpdateNotification
                                                  object:recordStorage
                                                   queue:[NSOperationQueue mainQueue]
                                              usingBlock:^(NSNotification *note) {
                                                  self.notes = [self.categoryStorage recordsWithType:@"note"];
                                                  [self.tableView reloadData];
                                              }];
```

### 