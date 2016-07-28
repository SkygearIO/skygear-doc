The code below can give you a taste of what you can do with Skygear JS SDK.

## Creating users

``` javascript
skygear.signupWithUsername(username, password).then(() => {
  console.log(skygear.currentUser);
}, (error) => {
  console.error(error);
});
```

Learn to make [Authentication](/js/guide/users). 

## Saving records

``` javascript
const Note = skygear.Record.extend('note');
const record = new Note({ content: 'I am a note.' });
skygear.publicDB.save(record).then((record) => {
  console.log(record);
}, (error) => {
  console.error(error);
});
```

Learn to CRUD [Records](/js/guide/record).

## Querying records

``` javascript
const query = new skygear.Query(Note);
skygear.publicDB.query(query).then((notes) => {
  console.log(notes);
}, (error) => {
  console.error(error);
});
```

Learn to make [Queries](/js/guide/query).