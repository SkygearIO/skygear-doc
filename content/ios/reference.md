+++
date = "2015-09-23T07:46:29+08:00"
draft = true
title = "Record Relations"

+++

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

## Eager Loading

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

## Reference Actions (not implemented)

`ON DELETE CASCADE` TBC.
