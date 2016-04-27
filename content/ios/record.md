## Saving a record

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

1. First we created a `todo` _record_ and assigned some attributes to it.
2. We fetched the _container_ of our app, and took a reference to the private
   database of the current user.
3. We actually saved the `todo` record and registered a block to be executed
   after the action is done.

We have mentioned _record_, _container_ and _database_. Let's look at them
one by one.

### SKYRecord

`SKYRecord` is a key-value data object which can be stored in a _database_. Each
record has a _type_, which describes what kind of data this record holds.

A record can store whatever values that's JSON-serializable, it include
strings, numbers, booleans, dates, plus several custom type that Skygear
supports (TODO: add references to other pages).

### SKYContainer

`SKYContainer` is the uppermost layer of `SKYKit`. It represents the root of all
resources accessible by an application and one application should have exactly
one container. In `SKYKit`, such container is accessed via the singleton
`defaultContainer`:

```obj-c
SKYContainer *container = [SKYContainer defaultContainer];
```

Container provides [User Authentication]({{< relref "user.md" >}}),
[Asset Storage]({{< relref "asset.md" >}}) and access to
[public and private databases]({{< relref "#SKYDatabase" >}}).

### SKYDatabase

`SKYDatabase` is the central hub of data storage in `SKYKit`. The main
responsibility of database is to store [records]({{< relref "#SKYRecord" >}}),
the data storage unit in Skygear.

Every container has one _pubic database_, which stores data accessible to
every users. Every user also has its own _private database_, which stores data
only accessible to that user alone.

## Modifying a record

Now let's return to our to-do item example:

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

If you run the code above, you console should show:

```
2015-09-22 16:16:37.893 todoapp[89631:1349388] saved todo with recordID = <SKYRecordID: 0x7ff93ac37940; recordType = todo, recordName = 369067DC-BDBC-49D5-A6A2-D83061D83BFC>
```

The `recordID` property on your saved todo is an id which uniquely identifies
the record in a database. With it you can modify the record later on. Say if
you have to mark this todo as done:

```obj-c
SKYRecord *todo = [SKYRecord recordWithRecordType:@"todo" name:@"369067DC-BDBC-49D5-A6A2-D83061D83BFC"];
todo[@"done"] = @YES;
[privateDB saveRecord:todo completion:nil];
```

Note that the data in the returned record in the completion block may be
different from the originally saved record. This is because additional
fields maybe applied on the server side when the record is saved. You may
want to inspect the returned record for any changes applied on the server side.

## Fetching an existing record

With the record ID we could also fetch the record from a database:

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

## Deleting a record

Deleting a record requires its id too:

```obj-c
SKYRecordID *recordID = [SKYRecordID recordIDWithRecordType:@"todo" name:@"369067DC-BDBC-49D5-A6A2-D83061D83BFC"];
[privateDB deleteRecordWithID:recordID completionHandler:nil];
```

If you are to delete records in batch, you could also use the
`SKYDatabase-deleteRecordsWithIDs:completionHandler:perRecordErrorHandler:`
method.

## Queries

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
`NSSortDescription` to ask Skygear Server to sort the `todo` records by `order` field
ascendingly.

`SKYQuery` utilizes `NSPredicate` to apply filtering on query results. For
an overview of features support, please refer to the
[Query Guide]({{< relref "query.md" >}}).
