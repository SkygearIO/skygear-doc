1. Two default relations: friend and follower

## Adding relation between users

```obj-c
SKYAddRelationsOperation *operation = [SKYAddRelationsOperation operationWithType:@"friend" usersToRelated:@[rick, ben]];
operation.container = [SKYContainer defaultContainer];
[[SKYContainer defaultContainer] addOperation:operation];
```

## Removing relations

```obj-c
SKYRemoveRelationsOperation *operation = [SKYRemoveRelationsOperation operationWithType:@"follower" usersToRemove:@[faseng, chima]];
operation.container = [SKYContainer defaultContainer];
[[SKYContainer defaultContainer] addOperation:operation];
```

## Querying users by relations

Get all friends:

```obj-c
SKYQueryUsersOperation *operation = [SKYQueryUsersOperation queryUsersOperationByRelation:[SKYRelation friendRelation]];
operation.container = [SKYContainer defaultContainer];
[[SKYContainer defaultContainer] addOperation:operation];
```

Get all followers:

```obj-c
SKYQueryUsersOperation *operation = [SKYQueryUsersOperation queryUsersOperationByRelation:[SKYRelation followRelation] direction:SKYRelationDirectionPassive];
operation.container = [SKYContainer defaultContainer];
__weak SKYQueryUsersOperation *weakOperation = operation;
operation.queryUserCompletionBlock = ^(NSArray *users, NSError *operationError) {
    NSLog(@"Operation will have overallCount after execution, %d", weakOperation.overallCount);
};

[[SKYContainer defaultContainer] addOperation:operation];
```

`SKYQueryUsersOperation-relationDirection` is only effective on `followRelation`.

### Relation directions

TODO: talks about directional and undirectional relation, and how friend and
follower are examples of them
TODO: Discuss the values of SKYRelationDirection

Get all following users:

```obj-c
SKYQueryUsersOperation *operation = [SKYQueryUsersOperation queryUsersOperationByRelation:[SKYRelation followRelation] direction:SKYRelationDirectionActive];
operation.container = [SKYContainer defaultContainer];
[[SKYContainer defaultContainer] addOperation:operation];
```

Get all mutual followers: **[Not implemented]**

```obj-c
SKYQueryUsersOperation *operation = [SKYQueryUsersOperation queryUsersOperationByRelation:[SKYRelation followRelation] direction:SKYRelationDirectionMutual];
operation.container = [SKYContainer defaultContainer];
[[SKYContainer defaultContainer] addOperation:operation];
```
