1. PrivateDB are truly private. Setting ACL will have no effect (and no exception)
1. Record saved to PublicDB will default grant read access to public.
1. Able to grant individual user read/write permission.
1. Able to grant permission base on owner relations.
1. Record must have owner, and owner always have full access.

Relation-based access control is suitable for making social application in
which access to records are defined by whether the user has certain relationship
with the creator of the record.

There are two types of user relationships: Friend is a mutual relationship
while follow is a directional relationship.

In this guide, we are going to walk you through making a blogging application
in which users can create posts that their friends can see.

## Add relation-based access for each record

In relation-based access control, you add access to a record by specifying
which type of relation will have access to it, and which type of access is
added.

In our example, suppose that a post can only be see by friends of the owner of
the record:

```javascript
const post = new Post({
  'content': 'This is a funny joke: ...'
});
post.acl.addReadAccess(skygear.FRIEND);
skygear.publicDB.save(post);
```

For an existing post, the access control for a record can be changed this way:

``` javascript
skygear.publicDB.query(query).then((records) => {
  const post = records[0];
  post.acl.addReadAccess(skygear.FRIEND);
  skygear.publicDB.save(post);
}, (error) => {
  console.log(error);
});
```

When adding a read access to a record, the default access control for
the record is ignored, and hence the record is no longer public readable.

## Remove relation-based access for each record

Suppose that the social application support a feature to hide a post from
all users, you can do that by removing both public read access and removing
friend read access from record:

``` javascript
skygear.publicDB.query(query).then((records) => {
  const post = records[0];
  post.acl.removePublicReadAccess();
  post.acl.removeReadAccess(skygear.FRIEND);
  skygear.publicDB.save(post);
}, (error) => {
  console.log(error);
});
```

Since the owner of a record have full access to it, the creator of the post
can still see it.

## Relationship sub-types

It is possible to define sub-types of relationship. You do this by giving
a sub-type name to an existing relation type. For example, you
can add a `special`, and a `acquaintance` sub-type to the friend relation type.
If you add read access to friends having the `special` sub-type, only
friends who have this `special` relationship will be able to see this record.

```javascript
const specialFriend = new skygear.FriendRelation("special");
const post = new Post({
  'content': 'This is super secret: ...'
});
post.acl.addReadAccess(specialFriend);
skygear.publicDB.save(post);
```

## Examine a record access

After you query a record. You can query its access control. And modify it if
wished.

_Querying a record and examine the access control_

``` javascript
skygear.publicDB.query(query).then((records) => {
  const acl = records[0].acl;
  console.log(acl.getFullAccess()); // All access entities
  console.log(acl.getReadAccess(skygear.FOLLOWER)); // Boolean value 
  console.log(acl.getWriteAccess(ben));
}, (error) => {
  console.log(error);
});
```
