+++
date = "2015-09-23T08:37:21+08:00"
draft = true
title = "Friends and Followers"

+++

1. Two default relations: friend and follower

## Adding relation between users

```obj-c
ODAddRelationsOperation *operation = [ODAddRelationsOperation operationWithType:@"friend" usersToRelated:@[rick, ben]];
operation.container = [ODContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

## Removing relations

```obj-c
ODRemoveRelationsOperation *operation = [ODRemoveRelationsOperation operationWithType:@"follower" usersToRemove:@[faseng, chima]];
operation.container = [ODContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

## Querying users by relations

Get all friends:

```obj-c
ODQueryUsersOperation *operation = [ODQueryUsersOperation queryUsersOperationByRelation:[ODRelation relationFriend]];
operation.container = [ODContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

Get all followers:

```obj-c
ODQueryUsersOperation *operation = [ODQueryUsersOperation queryUsersOperationByRelation:[ODRelation relationFollow] direction:ODRelationDirectionPassive];
operation.container = [ODContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

`ODQueryUsersOperation-relationDirection` is only effective on `relationFollow`.

### Relation directions

TODO: talks about directional and undirectional relation, and how friend and
follower are examples of them
TODO: Discuss the values of ODRelationDirection

Get all following users:

```obj-c
ODQueryUsersOperation *operation = [ODQueryUsersOperation queryUsersOperationByRelation:[ODRelation relationFollow] direction:ODRelationDirectionActive];
operation.container = [ODContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```

Get all mutual followers:

```obj-c
ODQueryUsersOperation *operation = [ODQueryUsersOperation queryUsersOperationByRelation:[ODRelation relationFollow] direction:ODRelationDirectionMutual];
operation.container = [ODContainer defaultContainer];
[[[NSOperationQueue alloc] init] addOperation:operation];
```
