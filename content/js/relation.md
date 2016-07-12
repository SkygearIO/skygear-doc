<a name="friends-and-followers"></a>
## User relations (Friends & Followers)

Skygear provide three default relations: friend, following and follower.
- `follower` and `following` are one non-mutual relation with direction. You can
follow a user without his explicit approval.
- `friend` is mutual relation without direction. If you add Ben as your friend
and Ben add you as his friend, then you two will have `friend` relationship.

### Add relations

If the current user wants to follow Ben:

``` javascript
const toFollow = new skygear.relation.Following([ben]);
// ben is a user object
skygear.relation.add(toFollow).then((ok) => {
  console.log(ok);
}, (error) => {
  console.error(error);
});
```

How can you get the user object? You can either search by email or simply
construct a new user object with the correct user id. Read the section
about [Users](/js/guide/users#current-user) to learn more about search by email.

``` javascript
const ben = new skygear.User({
  user_id: "<ben's-user-id>"
});
```

If the current user wants to add friend with Ben:

``` javascript
const beFriend = new skygear.relation.Friend([ben]);
skygear.relation.add(beFriend).then(...);
```

### Query relations

You may query the relations of the current user or other users.

To get Ben's follower list:

``` javascript
skygear.relation.queryFollower(ben).then((users) => {
  console.log(users);
}, (error) => {
  console.error(error);
});
```

To get the current user's friend list:

``` javascript
skygear.relation.queryFriend(skygear.currentUser).then(...);
```

To get the current user's following list:

``` javascript
skygear.relation.queryFollowing(skygear.currentUser).then(...);
```

To get the 101-200th friends of the current user:

``` javascript
skygear.relation.queryFriend(skygear.currentUser, {
  page: 2, limit: 100
}).then((users) => {
  console.log(users);
}, (error) => {
  console.error(error);
});
```

Alternatively you can use the query syntax.
Learn more in the [Queries](/js/guide/query) section.

``` javascript
const query = new skygear.relation.Query(skygear.relation.Friend);
query.user = skygear.currentUser;
query.limit = 100;
query.page = 2;
skygear.relation.query(query).then((users) => {
  console.log(users.overallCount); // The total count match the relation
}, (error) => {
  console.error(error);
});
```

### Removing relations

``` javascript
const unFollow = new skygear.relation.Follower([ben]);
skygear.relation.remove(unFollow).then((result) => {
  console.log(result.success); // Return an array of user, here is [ben]
}, (error) => {
  console.error(error);
});
```


### Custom relation (**Coming Soon**)

``` javascript
const FansOf = skygear.relation.extend('fans', skygear.relation.Outward);
const becomeFans = new FansOf([coldPlay]);
skygear.relation.save(becomeFans).then((result) => {
  console.log(result.success);
}, (error) => {
  console.error(error);
});
```
