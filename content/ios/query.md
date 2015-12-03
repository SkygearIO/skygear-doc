+++
date = "2015-09-23T07:35:16+08:00"
draft = true
title = "Queries"

+++

## Basic Queries

## Querying with NSPredicate

### Basic Comparisons

### Strings

### Aggregate Oprations

#### IN

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

## Record Count

To get the number of all records matching a query, set the property
`overallCount` property of `SKYQuery` to `YES`. The record count can be
retrieved from `overallCount` property of `SKYQueryOperation` when
`perRecordCompletionBlock` is first called.
