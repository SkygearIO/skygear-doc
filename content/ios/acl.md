1. Only records in public database honour access control. Records in private
   databases are always private.
2. Default public. Once set it becomes whitelist-based.
3. Come in three favours: User, Role and Relation.
4. Grant write/read access to the entities above.
5. Record Owner (i.e. record creator atm) always has read write access.

## Access controls by relations

Example: Grant read to friends

```objective-c
SKYRecord *post = [SKYRecord recordWithRecordType:@"post"];
[post setReadOnlyForRelation:[SKYRelation relationFriend]];
```

TODO: remember to save the record to make the access control effective
