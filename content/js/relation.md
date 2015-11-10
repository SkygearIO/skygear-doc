+++
date = "2015-11-10T16:07:01+08:00"
draft = true
title = "User to user relation, Friends and Followers"

+++

# Friends and Followers

Skygear provide two default relations: friend and follower.

## Current user follow a user (ben)

The save user relation operation is operation on currently logged in user.

``` javascript
const toFollow = skygear.Relation.Following([ben]); // skygear.currentUser follow;
skygear.Relation.save(toFollow).then((ok) => {
  console.log(ok);
}, (error) => {
  console.warn(error);
});
```

## Querying relations

You may query the follower of another user.

### Get friends list

``` javascript
skygear.Relation.queryFriend(skygear.currentUser).then((users) => {
  console.log(users);
}, (error) => {
  console.warn(error);
});
```

### Get followers list

Get ben's follower list.

``` javascript
skygear.Relation.queryFollower(ben).then((users) => {
  console.log(users);
}, (error) => {
  console.warn(error);
});
```

### Complex user query by relation

``` javascript
skygear.Relation.queryFriend(skygear.currentUser, {
  page: 2, limit: 100
}).then((users) => {
  console.log(users);
}, (error) => {
  console.log(error);
});

const query = skygear.Relation.Query('follower');
query.direction = skygear.Relation.Active; // Passive, Mutual
query.user = skygear.currentUser;
query.limit = 10;
query.page = 3;
skygear.Relation.query(query).then((users) => {
  console.log(users);
}, (error) => {
  console.log(error);
});
```

## Removing relations

``` javascript
const unFollow = skygear.Relation.Follower([ben]);
skygear.Relation.remove(unFollow).then((ok) => {
  console.log(ok);
}, (error) => {
  console.warn(error);
});
```


# Custom relation **[Furture release]**

We are supporting unary relation and mutual relation.

`follower` and `following` are one unary relation with direction.

`friend` is mutual relation without direction.

## Add custom relation between users

``` javascript
const FansOf = skygear.Relation.extend('fans', skygear.Relation.Passive);
const becomeFans = FansOf(coldPlay);
skygear.Relation.save(becomeFans).then((ok) => {
  console.log(ok);
}, (error) => {
  console.warn(error);
});
```