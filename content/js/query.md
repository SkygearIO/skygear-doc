+++
date = "2015-10-16T13:48:45+08:00"
draft = true
title = "Querying Records"

+++

Skygear provides query of records with conditions. You can apply condition to
Skygear queries, only getting the records you want.

To start with a simple query with `equalTo`

``` javascript
let query = Query(Note);
query.equalTo('title', 'First note');
skygear.privateDB.query(query).then((notes) => {
  console.log('Received note with title === First note', notes[0].title);
  // do something with your notes
}, (error) => {
  console.log('error: ', error);
});
```

You can put multiple conditions in same query object

``` javascript
let query = Query(Note);
query.lessThan('order', 10);
query.equalTo('category', 'diary');
skygear.privateDB.query(query).then((notes) => {
  console.log('Received note with order less then 10 and is a diary');
}, (error) => {
  console.log('error: ', error);
});
```

Instead of querying on `order` attribute with less than. We can obtain the
same result by applying `limit` and `order` to the `query`

``` javascript
let query = Query(Note);
query.addAscending('order');
query.equalTo('category', 'diary');
query.limit = 10;
skygear.privateDB.query(query).then((notes) => {
  console.log('Received 10 note with order');
}, (error) => {
  console.log('error: ', error);
});
```

By default, the condition added to the query are combined with `AND`. To
construct an `OR` query, we need to specify it with the following syntax.

``` javascript
let likeQuery = Query(Note);
likeQuery.greaterThan('like', 50);
let shareQuery = Query(Note);
shareQuery.greaterThan('share', 10);
let query = Query.or(likeQuery, shareQuery);
query.equalTo('category', 'diary');
query.addAscending('share');
query.limit = 10;
skygear.publicDB.query(query).then((notes) => {
  console.log('Received max 10 notes with (like > 50 || share > 10) && category == diary');
}, (error) => {
  console.log('error: ', error);
});
```

You can configure complex conditions as the following:

``` javascript
let clickQuery = Query(Note);
clickQuery.greaterThan('like', 50);
clickQuery.greaterThan('click', 100);
let shareQuery = Query(Note);
shareQuery.greaterThan('share', 10);
let query = Query.or(clickQuery, shareQuery);
query.equalTo('category', 'diary');
skygear.publicDB.query(query).then((notes) => {
  console.log('Too complex for words.');
  // Translate to SQL
  // SELECT * from note WHERE categoty = 'category' AND share > 10 OR (like > 50 AND click > 100);
}, (error) => {
  console.log('error: ', error);
});
```

## Operators

### Contains

The `contains` function can be used to query a key for value that matches one of the
item in an array.

```javascript
let query = Query(Note);
query.contains('category', ['interesting', 'funny']);
```
