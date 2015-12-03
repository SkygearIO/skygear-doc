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
const toFollow = skygear.relation.Following([ben]); // skygear.currentUser follow;
skygear.relation.add(toFollow).then((ok) => {
  console.log(ok);
}, (error) => {
  console.warn(error);
});
```

## Querying relations

You may query the follower of another user.

### Get friends list

``` javascript
skygear.relation.queryFriend(skygear.currentUser).then((users) => {
  console.log(users);
}, (error) => {
  console.warn(error);
});
```

### Get followers list

Get ben's follower list.

``` javascript
skygear.relation.queryFollower(ben).then((users) => {
  console.log(users);
}, (error) => {
  console.warn(error);
});
```

Get follower 

``` javascript
skygear.relation.queryFollowing(skygear.currentUser).then((users) => {
  console.log(users);
}, () => {
  console.warn(error);
});
```

### Complex user query by relation

``` javascript
skygear.relation.queryFriend(skygear.currentUser, {
  page: 2, limit: 100
}).then((users) => {
  console.log(users);
}, (error) => {
  console.log(error);
});

const query = new skygear.relation.Query(skygear.relation.Follower);
query.user = skygear.currentUser;
query.limit = 10;
query.page = 3;
skygear.relation.query(query).then((users) => {
  console.log(users.overallCount); // The total count match the relation.
  console.log(users);
}, (error) => {
  console.log(error);
});
```

## Removing relations

``` javascript
const unFollow = new skygear.relation.Follower([ben]);
skygear.relation.remove(unFollow).then((result) => {
  console.log(result.success); // Return an array of user, here is [ben]
}, (error) => {
  console.warn(error);
});
```


# Custom relation **[Future release]**

We are supporting non-mutual relation and mutual relation.

`follower` and `following` are one non-mutual relation with direction. You can
follow a user without his explicit consensus.

`friend` is mutual relation without direction.

## Add custom relation between users

``` javascript
const FansOf = skygear.relation.extend('fans', skygear.relation.Outward);
const becomeFans = new FansOf([coldPlay]);
skygear.relation.save(becomeFans).then((result) => {
  console.log(result.success);
}, (error) => {
  console.warn(error);
});
```