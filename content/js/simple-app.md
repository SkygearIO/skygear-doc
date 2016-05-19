## Creating users

```js
skygear.signup(username, email, password).then(() => {
  console.log('access token: %s', skygear.currentAccessToken);
}, (error) => {
  console.log('error signing up: %o', error);
});
```

## Saving records

```js
record = skygear.Record({
  _type: 'note',
  content: 'I am a note.'
})
skygear.privateDB().save(record).then((record) => {
  console.log('record saved successfully: %o', record);
}, (error) => {
  console.log('error saving record: %o', error)
});
```

## Fetching records (not implemented)

```js
skygear.privateDB().fetch('note', 'id').then((record) => {
  console.log('record fetched successfully: %o', record);
}, (error) => {
  console.log('error fetching record note/id: %o', error)
});
```

## Querying records

```js
let query = new Query('note');
skygear.privateDB().query(query).then((notes) => {
  console.log('received %d notes', notes.length);
  // do something with your notes
}, (error) => {
  console.log('error querying notes: %o', error);
});
```
