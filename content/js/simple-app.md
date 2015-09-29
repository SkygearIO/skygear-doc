+++
date = "2015-09-25T18:57:01+08:00"
draft = true
title = "Simple Application"

+++

## Creating users

```js
jsourd.signup(username, email, password).then(function() {
  console.log('access token: %s', jsourd.currentAccessToken);
}, function(error) {
  console.log('error signing up: %o', error);
});
```

## Saving records

```js
record = jsourd.Record({
  _type: 'note',
  content: 'I am a note.'
})
jsourd.privateDB().save(record).then(function(record) {
  console.log('record saved successfully: %o', record);
}, function(error) {
  console.log('error saving record: %o', error)
});
```

## Fetching records (not implemented)

```js
jsourd.privateDB().fetch('note', 'id').then(function(record) {
  console.log('record fetched successfully: %o', record);
}, function(error) {
  console.log('error fetching record note/id: %o', error)
});
```

## Querying records

```js
let query = Query('note');
jsourd.privateDB().query(query).then(function(notes) {
  console.log('received %d notes', notes.length);
  // do something with your notes
}, function(error) {
  console.log('error querying notes: %o', error);
});
```
