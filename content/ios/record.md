Before we get to CRUD (creating, reading, updating and deleting) _records_, we need to talk about _container_, _database_ and _record_ first. Let's look at them one by one.

### SKYContainer

To read about `SKYContainer`, please go to [Getting Started]({{< relref "getting-started.md" >}}) section.

### SKYDatabase

`SKYDatabase` is the central hub of data storage in `SKYKit`. The main
responsibility of database is to store [records]({{< relref "#SKYRecord" >}}),
the data storage unit in Skygear.

Every container has one _public database_, which stores data accessible to
every users.

Every user also has its own _private database_, which stores data
only accessible to that user alone.

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
