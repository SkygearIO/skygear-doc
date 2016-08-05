<a name="overview"></a>
## Overview

Please make sure you know about and have already configured your
[SKYContainer](/ios/guide) before you proceed.

### The Record Class

`SKYRecord` is the data storage unit in Skygear.

- `SKYRecord` must have a type.
- Each `SKYRecord ` object is like a dictionary with keys and values; keys will be mapped to database column names, and values will be stored appropriately
based on the data type. Please refer to [Data Type](#data-type) section within this guide for more information.
- `SKYRecord` will be owned by the currently logged in user.
- `SKYRecord` object has a unique `id` (a string combination of record type and uuid is used).
- Each `SKYRecord` has a `recordType`, which describes the _type_ of data this record holds.
- `SKYRecord` has reserved keys that cannot be used, such as `ownerUserRecordID ` and `recordType `. Please refer to [Reserved Columns](#reserved-columns) section for more.

A record can store whatever values that are JSON-serializable. Possible values include
strings, numbers, booleans, dates, and several other custom types that Skygear
supports.

### Record Database

`SKYDatabase` is the central hub of data storage in `SKYKit`. The main responsibility of database is to store `SKYRecord`s.

You will be provided with a private and a public database.

- Everything in the private database is truly private, regardless of what access
control entity you set to the record. In other words, each user has his own
private database, and only himself have access to it.
- Record saved at public database is by default public. Only the owner of the record can modify the record. Even without logging in, records in the public database can be queried (but not updated).
To control the access, you may set different access control entity to the record. However, only logged in user can do write operation on databases
- The database objects can be accessed with `[[SKYContainer defaultContainer] publicCloudDatabase]` and `[[SKYContainer defaultContainer] privateCloudDatabase]`.

Head to [Access Control](/ios/guide/access-control) to read more about it.

<a name="basic-crud"></a>
## Basic CRUD

### Creating a record

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

1. First we created a `todo` _record_ and assigned some attributes to it. you can use the `[]` subscript operator as shown above, or the `setObject:forKey:` method. Your app automatically creates this Class when you first use it.
2. We fetched the _container_ of our app, and took a reference to the private
   database of the current user. So when you save a _record_, you're saving the record to the private database of the current user.
3. We actually saved the `todo` record and registered a block to be executed
   after the action is done. When you have successfully saved a _record_, there are several fields automatically filled in for you, such as `SKYRecordID`, `recordName`,`creationDate` and `modificationDate`. A `SKYRecord` will be returned and you can make use of the block to add additional logic which will run after the save completes.

You can also save multiple `SKYRecord`s at once:

```obj-c
SKYRecord *noteOne = [SKYRecord recordWithRecordType:@"note"];
SKYRecord *noteTwo = [SKYRecord recordWithRecordType:@"note"];
    
NSArray *notesToSave = [[NSArray alloc] initWithObjects: noteOne, noteTwo, nil];
    
SKYDatabase *privateDB = [[SKYContainer defaultContainer] privateCloudDatabase];
[privateDB saveRecords:(notesToSave) completionHandler:^(NSArray *savedRecords, NSError *operationError) {
    if (operationError) {
        // Error completing the operation
        NSLog(@"error completing operation");
        return;
    }
        
    NSLog(@"saved all the todo records");
} perRecordErrorHandler:^(SKYRecord *record, NSError *error) {
    if (error) {
        // Error saving an individual record
        NSLog(@"error saving todo: %@", error);
        return;
    }
        
    NSLog(@"saved todo with recordID = %@", record.recordID);
}];
```

### Reading a record

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

To get the values out of the `SKYRecord`, you can use the `[]` subscript operator as shown above, or the `objectForKey:` method:

```obj-c
NSString *title = [record objectForKey: @"title"];
NSNumber *order = [record objectForKey: @"order"];
NSNumber *done = [record objectForKey: @"done"];
```

You can construct a `SKYQuery` object by providing a `recordType`. You can configure the `SKYQuery` by mutating its state. Read the [Query](/ios/guide/query) section to learn more.

### Updating a record

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

```obj-c
SKYRecord *todo = [SKYRecord recordWithRecordType:@"todo" name:@"369067DC-BDBC-49D5-A6A2-D83061D83BFC"];
todo[@"done"] = @YES;
[privateDB saveRecord:todo completion:nil];
```

Note that the data in the returned record in the completion block may be
different from the originally saved record. This is because additional
fields maybe applied on the server side when the record is saved (e.g. the updated `modificationDate`). You may want to inspect the returned record for any changes applied on the server side.

### Deleting a record

Deleting a record requires its `recordID` too:

```obj-c
SKYRecordID *recordID = [SKYRecordID recordIDWithRecordType:@"todo" name:@"369067DC-BDBC-49D5-A6A2-D83061D83BFC"];
[privateDB deleteRecordWithID:recordID completionHandler:nil];
```

If you are to delete records in batch, you could also use the
`SKYDatabase-deleteRecordsWithIDs:completionHandler:perRecordErrorHandler:`
method.

You can also delete multiple records at once:

```obj-c
SKYRecordID *noteOneRecordID = [SKYRecordID recordIDWithRecordType:@"todo" name:@"369067DC-BDBC-49D5-A6A2-D83061D83BFC"];
SKYRecordID *noteTwoRecordID = [SKYRecordID recordIDWithRecordType:@"todo" name:@"348275VF-SKGF-69DK-10FH-D83061D83BFC"];
    
NSArray *notesToDeleteRecordID = [[NSArray alloc] initWithObjects: noteOneRecordID, noteTwoRecordID, nil];
    
[privateDB deleteRecordsWithIDs: (notesToDeleteRecordID) completionHandler:^(NSArray *deletedRecordIDs, NSError *error) {
    if (error) {
        // Error completing the operation
        NSLog(@"error completing operation");
        return;
    }
    
    NSLog(@"deleted all the todo records");
} perRecordErrorHandler:^(SKYRecordID *recordID, NSError *error) {
    if (error) {
        // Error deleting an individual record
        NSLog(@"error deleting todo: %@", error);
        return;
    }
    
    NSLog(@"deleting todo with recordID = %@", record.recordID);
}];
```

<a name="reference"></a>
## Record Relations

### What Skygear provide

Skygear supports many-to-one (aka. parent-child) relation between records via _reference_.
`SKYReference` is a pointer to a record in database. Let's say we are going to
reference _Record A_ in _Record B_, we first construct a reference of Record A
using its id.

```obj-c
// aID is a placeholder of Record A's id
SKYReference *aRef = [SKYReference referenceWithRecordID:aID];
```

Then assign this reference as a regular field of Record B:

```obj-c
// bRecord is a placeholder of Record B's object
bRecord[@"parent"] = aRef;
```

It will establish a reference from _Record B_ to _Record A_.

<a name="data-type"></a>
## Data Type

Skygear supports a lot of different data types, such as:

- String
- Number
- Boolean
- Array
- Object
- Date

There are also four other types provided by Skygear SDK:

- [Reference](#reference)
- [Sequence](#sequence)
- [Geo-location](/ios/guide/geolocation)
- [Assets (File Upload)](/ios/guide/asset)

Please refer to the [server](/server/guide/data-type) documentation for
more detail in supported data types.

<a name="auto-increment"></a>
## Auto-Incrementing Sequence Fields
<a name="sequence"></a>
### Make use of sequence object

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

### Override sequence manually

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
### Reserved Columns

For each record type stored in the database, a table with the same name as the record type is created. For example, if your record type is called `note`, there is a table called `note` in the database. Each row in the table corresponds to one record.

For each record table there exists two types of columns, those that are reserved by Skygear and those that are user-defined. Reserved columns contain metadata of a record, such as record ID, record owner and creation time. Names of reserved columns are prefixed with underscore (`_`).

It is possible to manipulate data in record tables directly. However, one should exercise cautions when modifying data directly in record tables.

Each record table contains the following reserved columns:

| Column Name   | Object Attribute           | Description                                     |
|---------------|----------------------------|-------------------------------------------------|
| `_created_at` | `creationDate`             | `NSDate` object of when record was created      |
| `_updated_at` | `modificationDate`         | `NSDate` object of when record was updated      |
| `_created_by` | `creatorUserRecordID`      | `NSString` object of user id of record creator  |
| `_updated_by` | `lastModifiedUserRecordID` | `NSString` object of user id of record updater  |
| `_owner`      | `ownerUserRecordID`        | `NSString` object of user id of owner           |
| `_id`         | `recordID`                 | `SKYRecordID` object of record id               |

You can retrieve the values from the object by accessing its properties:

```obj-c
NSDate *creationDate = [noteObject creationDate];
NSString *creatorID = [noteObject creatorUserRecordID];
SKYRecordID *recordID = [record recordID];
NSString *recordType = [record recordType];
```
Please head to [Database Schema](/server/guide/database-schema) to read more about Reserved Columns, Record Tables and Reserved Tables.

<a name="local-storage"></a>
## Local Storage (Offline)

### Setup

Record storage relies on [Query](/ios/guide/query)

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
