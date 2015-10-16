+++
date = "2015-09-25T18:57:01+08:00"
draft = true
title = "Simple Application"

+++

## Creating users

```js
skygear.signup(username, email, password).then(function() {
  console.log('access token: %s', skygear.currentAccessToken);
}, function(error) {
  console.log('error signing up: %o', error);
});
```

## Saving records

```js
record = skygear.Record({
  _type: 'note',
  content: 'I am a note.'
})
skygear.privateDB().save(record).then(function(record) {
  console.log('record saved successfully: %o', record);
}, function(error) {
  console.log('error saving record: %o', error)
});
```

## Fetching records (not implemented)

```js
skygear.privateDB().fetch('note', 'id').then(function(record) {
  console.log('record fetched successfully: %o', record);
}, function(error) {
  console.log('error fetching record note/id: %o', error)
});
```

## Querying records

```js
let query = Query('note');
skygear.privateDB().query(query).then(function(notes) {
  console.log('received %d notes', notes.length);
  // do something with your notes
}, function(error) {
  console.log('error querying notes: %o', error);
});
```
