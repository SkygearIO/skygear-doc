+++
date = "2015-09-23T07:35:16+08:00"
draft = true
title = "Queries"

+++

## Basic Queries

## Querying with NSPredicate

### Basic Comparisons

### Strings

### Full-text search (**NOT IMPLEMENTED**)

### References

SkyKit's query supports filtering records by the reference field of records:

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

## Limiting and Offset

## Cached Queries
