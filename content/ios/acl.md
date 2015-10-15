+++
date = "2015-09-23T08:38:03+08:00"
draft = true
title = "Access Controls"

+++

1. Only records in public database honour access control. Records in private
   databases are always private.
2. Default public. Once set it becomes whitelist-based.
3. Come in two favours: User and Relation.
4. Grant write/read access to the entities above.
5. Record Owner (i.e. record creator atm) always has read write access.

## Access controls by relations

Example: Grant read to friends

```obj-c
ODRecord *post = [ODRecord recordWithRecordType:@"post"];
[post.accessControl addReadAccessForRelation:[ODRelation relationFriend]];
```

TODO: remember to save the record to make the access control effective

## Access controls by role

[Access Control by role]({{< relref "ios/acl-role.md" >}})

## Access controls by User

Example: Share docs to colleages

```obj-c
// supervisor is a placeholder of user id
ODRecord *document = [ODRecord recordWithRecordType:@"doc"];
[document.accessControl addWriteAccessForUserID:supervisor];
```
