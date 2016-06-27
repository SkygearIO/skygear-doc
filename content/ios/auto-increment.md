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

- You can omit the `noteID` on update, the value will remain unchange.
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
