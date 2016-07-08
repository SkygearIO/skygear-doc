<a name="basic-queries"></a>
## Basic Queries

Skygear provides query of records with conditions. Here is a straight-forward
example of getting the note that has the `title` as `First note` inside the
private database. If you don't know what `Note` is or the difference between
privateDB and publicDB, please read [Records](/js/guide/record) section first.

``` javascript
let query = new skygear.Query(Note);
query.equalTo('title', 'First note');
skygear.privateDB.query(query).then((notes) => {
  // notes is an array of Note records that has its "title" equals "First note"
}, (error) => {
  console.error(error);
});
```

Say if you want to query all the notes owned by the current user, then you
need to make a query matching a reserved column. If you wish to learn the list
of reserved columns, please read the [Records](/js/guide/record#reserved) section.

``` javascript
let query = new skygear.Query(Note);
query.equalTo('_owner', skygear.currentUser.id);
// '_owner' is an alias for '_owner_id'
skygear.publicDB.query(query).then((notes) => {
  // an array of Note records owned by the current user
}, (error) => {
  console.error(error);
});
```

Of course, you can put multiple conditions in same query object:

``` javascript
let query = new skygear.Query(Note);
query.lessThan('order', 10);
query.equalTo('category', 'diary');
skygear.privateDB.query(query).then((notes) => {
  console.log('Received note with order less then 10 and is a diary');
}, (error) => {
  console.error(error);
});
```

By default, the condition added to the query are combined with `AND`. To
construct an `OR` query, we need to specify it with the following syntax.

``` javascript
let likeQuery = new skygear.Query(Note);
likeQuery.greaterThan('like', 50);
let shareQuery = new skygear.Query(Note);
shareQuery.greaterThan('share', 10);
let query = skygear.Query.or(likeQuery, shareQuery);
query.equalTo('category', 'diary');
skygear.publicDB.query(query).then((notes) => {
  console.log('Received notes with (like > 50 || share > 10) && category == diary');
}, (error) => {
  console.error(error);
});
```

<a name="conditions"></a>
## Conditions

Here is a list of simple conditions you can apply on a query:

``` javascript
query.equalTo('title', 'First note');
query.notEqualTo('category', 'dangerous');
query.lessThan('age', 10);
query.lessThanOrEqualTo('age', 10);
query.greaterThan('size', 50);
query.greaterThanOrEqualTo('size', 50);
```

### Contains condition

The `contains` condition can be used to query a key for value that matches one
of the items in a specified array. Suppose here we are querying for movies,
and each movie has exactly one genre.

``` javascript
query.contains('genre', ['science-fiction', 'adventure']);
query.notContains('genre', ['romance', 'horror']);
```

If the value is an array, the `containsValue` condition can be used to query for
a key that has an array as its value containing the specified value. Suppose
further that each movie has multiple tags as an array, for example
_Independence Day: Resurgence_ may have tags "extraterrestrial" and "war".

``` javascript
query.containsValue('tags', 'war');
query.notContainsValue('tags', 'hollywood');
// both matches our example movie
```

### Like condition

The `like` function can be used to query a key for complete or partial matches
of a specified string. The percent character (`%`) can be used in place
for any number of characters while the underscore (`_`) can be used in place
for a single character.

``` javascript
query.like('category', 'science%'); // science, science-fiction, etc.
```

The above query will match notes with category `science` or `science-fiction`.
Use `caseInsensitiveLike` for case insensitive match.

### Having relation condition

The `havingRelation` can be used to query for records having a relation with
the current user. For this kind of query, the record has an relation with
the current user if the record has an attribute that contains a user having
the relation with the current user.

For example, to query for records owned by a user that the current user is following,
or to discard all records created by friends:

``` javascript
query.havingRelation('_owner', skygear.relation.Following);
query.notHavingRelation('_created_by', skygear.relation.Friend);
```

See [Social](/js/guide/relation) section for more relations.

### Geolocation condition

Please visit [Geo-location](/js/guide/geolocation) section for more.

<a name="pagination-ordering"></a>
## Pagination and Ordering

### Ordering of records

You can sort the records based on certain field in ascending or descending order.
You can also sort on multiple fields as well.

``` javascript
query.addAscending('age');    // sorted by age increasing order
query.addDescending('price'); // sorted by price decreasing order
```

The above query will first sort from small age to large age, and records
with the same age will be then sorted from high price to low price. Just like
this SQL statement: `ORDER BY age, price DESC`.

### Pagination of records

You can limit the number of records returned, skip certain number of records,
and access certain part of records via pagination. For the following example,
assume we have more than 150 Note records.

``` javascript
var query = new skygear.Query(Note);
query.limit = 20; // 20 records per query/page
// default query.limit is 50 if not specified
query.page = 3; // skip the first two pages of records
skygear.publicDB.query(query).then(...);
/* The above query will return the 41th to 60th records */

// you can also achieve the same thing with offset
var query = new skygear.Query(Note);
query.limit = 20;
query.offset = 40; // skip the first 40 records
skygear.publicDB.query(query).then(...);
/* The above query will show the 41th to 60th records */

// however, if offset and page are both set, page will be ignored
var query = new skygear.Query(Note);
query.limit = 25;
query.offset = 10;
query.page = 2;
skygear.publicDB.query(query).then(...);
/* The above query will show the 11th to 35th records */
```

### Counting the records

To get the number of records matching a query, set the `overallCount`
of the Query to `true`.

``` javascript
query.overallCount = true;
skygear.privateDB.query(query).then((notes, count) => {
  console.log('%d records matching query.', count);
}, (error) => {
  console.error(error);
});
```

The count is not affected by the limit set on the query. So, if you only want
to get the count without fetching any records, simply set `query.limit = 0`.

<a name="relational-queries"></a>
## Relational Queries

### Eager Loading

If you have a record that references another record, you can perform eager
loading using the transient syntax. It is possible to eager load records from
multiple keys, but doing so will impair performance. If you don't know about
reference, please read [Records](/js/guide/record#reference) section first.

``` javascript
// Suppose we have Delivery and Address
const Delivery = skygear.Record.extend('delivery');
const Address = skygear.Record.extend('address');

// Suppose delivery has set destination reference to address
var address = new Address({ ... });
var delivery = new Delivery({ destination: skygear.Reference(address) });
skygear.publicDB.save([address, delivery]).then(...);

// Now when we are retrieving delivery, we want to include address as well
var query = new skygear.Query(Delivery);
query.transientInclude('destination');
// 'destination' is the column name where Reference to Address record is stored
skygear.publicDB.query(query).then((records) => {
  records.map((record) => {
    console.log(record.destination); // skygear.Reference
    console.log(record.$transient.destination); // Address record
  });
}, (error) => {
  console.error(error);
});

var query = new skygear.Query(Delivery);
query.transientInclude('destination', 'deliveryAddress');
// you can also provide an optional alias in the second argument
skygear.publicDB.query(query).then((records) => {
  records.map((record) => {
    console.log(record.$transient.deliveryAddress); // Address record
  });
}, (error) => {
  console.log(error);
});
```

<a name="cached-query"></a>
## Cached Query

Skygear provides a simple cached query mechanism for application that wants to
display the data last seen before it gets new data from Skygear Server. To make
use of this, you just need to provide an extra callback function to the `query`
function, and Skygear will try to return an cached result before it gets the
latest result from the Skygear server.

``` javascript
let query = new skygear.Query(Note);
query.equalTo('title', 'First note');
function successCallback(notes, cached = false) {
  if (cached) {
    console.log('The result is a cached one');
  }
  console.log('Result', notes);
}
skygear.publicDB.query(query, successCallback)
.then(successCallback, (error) => {
  console.error(error);
});
```

### Note:

- It is not guaranteed that the callback is called before a request takes
  place, especially if a cached result of the query is not available.
  In other words, if the result is not in the cache, the callback is only
  called once, after the requested result is returned from the server.
- It is guaranteed once the callback from server is called, cached callback will
  not get called.
- You may use one callback to handle both cached callback and server
  callback as above. But you are free to use two callbacks if it works
  better in your use cases.
