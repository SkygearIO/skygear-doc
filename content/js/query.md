+++
date = "2015-10-16T13:48:45+08:00"
draft = true
title = "Querying Records"

+++

Skygear provie query of records with condition. You can put condition to Skygear
query, only geting the records you want.

To start with a simple query with `equalTo`

``` javascript
let query = Query(Note);
query.equalTo('title', 'First note');
skygear.privateDB.query(query).then(function(notes) {
  console.log('Received note with title === First note', notes[0].title);
  // do something with your notes
}, function(error) {
  console.log('error: ', error);
});
```

You can put multiple consitions in same query object

``` javascript
let query = Query(Note);
query.lessThan('order', 10);
query.equalTo('category', 'diary');
skygear.privateDB.query(query).then(function(notes) {
  console.log('Received note with order less then 10 and is a diary');
}, function(error) {
  console.log('error: ', error);
});
```

Instead of querying with `order` attributes with less than. We can attain the
same result by applyinh `limit` and other to the `query`

``` javascript
let query = Query(Note);
query.addAscending('order');
query.equalTo('category', 'diary');
query.limit = 10;
skygear.privateDB.query(query).then(function(notes) {
  console.log('Received 10 note with order');
}, function(error) {
  console.log('error: ', error);
});
```

By default, the condition add to query are compose with `AND`. To construct an
`OR` query, we need to specific it with following syntax.

``` javascript
let likeQuery = Query(Note);
likeQuery.greaterThan('like', 50);
let shareQuery = Query(Note);
shareQuery.greaterThan('share', 10);
let query = Query.or(likeQuery, shareQuery);
query.equalTo('category', 'diary');
query.addAscending('share');
query.limit = 10;
skygear.publicDB.query(query).then(function(notes) {
  console.log('Received max 10 notes with (like > 50 || share > 10) && category == diary');
}, function(error) {
  console.log('error: ', error);
});
```

You can configure complex condition as following

``` javascript
let clickQuery = Query(Note);
clickQuery.greaterThan('like', 50);
clickQuery.greaterThan('click', 100);
let shareQuery = Query(Note);
shareQuery.greaterThan('share', 10);
let query = Query.or(clickQuery, shareQuery);
query.equalTo('category', 'diary');
skygear.publicDB.query(query).then(function(notes) {
  console.log('Too complex for words.');
  // Translate to SQL
  // SELECT * from note WHERE categoty = 'category' AND share > 10 OR (like > 50 AND click > 100);
}, function(error) {
  console.log('error: ', error);
});
```
