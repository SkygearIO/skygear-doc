<a name="basic-queries"></a>
## Basic Queries

Skygear provides query of records with conditions. Here is a straight-forward
example of getting the note that has the `title` as `First note`. If you don't
know what `Note` is or the difference between privateDB and publicDB, please
read [Records](/js/guide/record) section first.

``` javascript
let query = new skygear.Query(Note);
query.equalTo('title', 'First note');
skygear.privateDB.query(query).then((notes) => {
  // notes is an array of Note records that has its "title" equals "First note"
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

Here is a list of functions/conditions you can apply on a query:

``` javascript
query.equalTo('title', 'First note');      // ===
query.notEqualTo('category', 'dangerous'); // !==
query.lessThan('age', 10);                 // <
query.lessThanOrEqualTo('age', 10);        // <=
query.greaterThan('size', 50);             // >
query.greaterThanOrEqualTo('size', 50);    // >=
```

There are more complicated functions/conditions and querying logics available,
introduced below; there are also [Geolocation Queries](/js/guide/geolocation).

<a name="complex-queries"></a>
## Complex Queries

### Sorting the records

We can also limit the number of records returned, and we can even sort
the records based on certain field in ascending or descending order.

``` javascript
query.addAscending('age');    // sorted by age increasing order
query.addDescending('price'); // sorted by price decreasing order
query.limit = 10;             // only show the top 10 records
```

### More querying logic

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

### Counting the records

To get the number of records matching a query, set the `overallCount`
of the Query to `true`. In this case, you will get the count of all records
matching the query together with the query result.

``` javascript
let query = new Query(Note);
query.lessThan('order', 10);
query.overallCount = true;
skygear.privateDB.query(query).then((notes, count) => {
  console.log('%d records matching query.', count);
}, (error) => {
  console.log('error: ', error);
});
```

The count is not affected by the limit set on the query. So, if you only want
to get the count without fetching any records, simple set `query.limit = 0`.

### Contains condition

The `contains` function can be used to query a key for value that matches one of the
item in a specified array.

```javascript
query.contains('category', ['interesting', 'funny']);
```

If the value is an array, the `containsValue` function can be used to query for
a key that has an array as its value containing the specified value.

```javascript
query.containsValue('category', 'interesting');
```

### Like condition

The `like` function can be used to query a key for complete or partial matches
of a specified string. The percent character (`%`) can be used in place
for any number of characters while the underscore (`_`) can be used in place
for a single character.

```javascript
query.like('category', 'science%');
```

The above query will match notes with category `science` or `science-fiction`.
Use `caseInsensitiveLike` for case insensitive match.

### Having relation condition

The `havingRelation` can be used to query for records having a relation with
the current user. For this kind of query, the record has an relation with
the current user if the record has an attribute that contains a user having
the relation with the current user.

For example, to query for records owned by a user that the current user is following:

```javascript
query.havingRelation("_owner", skygear.relation.Following)
```

See [User Relations (JS SDK)](/js/guide/relation) for more relations.

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
function successCallback(notes, cached = false) => {
  if (cached) {
    console.log('The result is a cached one');
  }
  console.log('Result', notes);
}
skygear.publicDB.query(query, successCallback)
.then(successCallback, (error) => {
  console.log('error: ', error);
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
