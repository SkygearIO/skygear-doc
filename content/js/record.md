<a name="basic-crud"></a>
## Basic CRUD

<a name="record"></a>
### Record

- `Record` must have a type.
- `Record` is a key-value-pair data object that is stored at _database_.
- `Record` will belong to the currently logged in user.
- `Record` object has unique `id` (a string combination of record type and
    uuid used in the database as `_id`).

You can design different `Record` type to model your app. Just like defining
tables in SQL.

``` javascript
const Note = skygear.Record.extend('note');
const Blog = skygear.Record.extend('blog');

let note = new Note({ 'content': 'Hello World' });
// { _id: "123456...", id: "note/123456...", recordType: "note", access: [Object object] }
```

### Create a record

You can save a public record to server as the following.

``` javascript
skygear.publicDB.save(new Note({
  'content': 'Hello World!'
})).then((record) => {
  console.log(record);
}, (error) => {
  console.error(error);
});
```

You can also save multiple records at one time.

``` javascript
let helloNote = new Note({
  content: 'Hello world'
});

let foobarNote = new Note({
  content: 'Foo bar'
});

skygear.publicDB.save([helloNote, foobarNote])
.then((result) => {
  let {
    savedRecords: [savedHelloNote, savedFoobarNote],
    errors: [helloError, foobarError]
  } = result;
  // errors here indicate saving error
}, (error) => {
  // error here indicates request error
});
```

### Read a record

You can construct a Query object by providing a Record Type.
You can config the query by mutating its state.
Read the section about [Query](/js/guide/query) to learn more.

``` javascript
let query = new skygear.Query(Blog);
query.greaterThan('popular', 10);
query.addDescending('popular');
query.limit = 10;

skygear.publicDB.query(query).then((records) => {
  console.log(records)
}, (error) => {
  console.error(error);
})
```

### Update a record

See the [above](#record) section about `id` and `_id` if you are confused.

``` javascript
let query = new skygear.Query(Note);
query.equalTo('_id', '<your-note-_id>');
// NOTE: This is the _id, not id, so no 'note/' in the front

skygear.publicDB.query(query)
.then((records) => {
  let note = records[0];
  note['content'] = 'Hello New World';
  return skygear.publicDB.save(note);
}).then((record) => {
  console.log(record);
}, (error) => {
  console.error(error);
});
```

After saving a record, any attributes modified from the server side will
be updated on the saved record object in place. The local transient fields of
the records are merged with any remote transient fields applied on the server
side.


### Delete a record

See the [above](#record) section about `id` and `_id` if you are confused.

``` javascript
// NOTE: This is the id, not _id, so there is 'note/' in the front
skygear.publicDB.delete({
  'id': '<your-note-id>'
}).then((record) => {
  console.log(record);
}, (error) => {
  console.error(error);
});
```

You can also delete multiple records at one time.

``` javascript
let query = new skygear.Query(Note);
query.lessThan('rating', 3);

let foundNotes = [];
skygear.publicDB.query(query)
.then((notes) => {
  console.log(`Found ${notes.length} notes, going to delete them.`);
  foundNotes = notes;
  return skygear.publicDB.delete(notes); // return a Promise object
})
.then((errors) => {
  errors.forEach((perError, idx) => {
    if (perError) {
      console.error('Fail to delete', foundNotes[idx]);
    }
  });
}, (reqError) => {
  console.error('Request error', reqError);
});
```

<a name="auto-increment"></a>
## Create an Auto-Incrementing Field

### Make use of sequence object

Skygear reserves the `id` field in the top level of all record as a primary key.
If you want an auto-incrementing id for display purpose, Skygear provide
`Sequence` for this purpose.

``` javascript
let note = new Note({
  content: 'Hello World'
});
note.noteID = new skygear.Sequence();

skygear.publicDB.save(note).then((note) => {
  console.log(note.noteID); // Actual value from server populated, say 42.
}, (error) => {
  console.log(error);
});
```

- You can omit the `noteID` on update, the value will remain unchanged.
- All the other `Note` in the database will now automatically have their
  `noteID` as well.
- You can migrate any integer to auto-incrementing sequence.
- Our JIT schema at development will migrate the DB schema to sequence. All
  `noteID` at `Note` will be a sequence type once migrated.

### Override sequence manually

``` javascript
let note = new Note({
  content: 'Hello World'
});
note.noteID = 43;

skygear.publicDB.save(note).then((note) => {
  console.log(note.noteID); // 43 if save successfully
  // the next noteID will be 44 if 43 is now the largest noteID
}, (error) => {
  console.log(error); // Fails if 43 already taken by other note
});
```

<a name="reference"></a>
## Records Relations (References)

### What Skygear provide

Skygear supports parent-child relation between records via _reference_.
`skygear.Reference` is a pointer class, which will translate to foreign key in
skygear server database for efficient query.

You can even reference a user from a record. To learn more about user object or
how to retrieve user objects, you can read the [Users](/js/guide/users) section.
Notice that we are not using the `new` keyword creating reference.

``` javascript
let note = new Note({
  heading: 'Working Draft',
  content: 'People involved please fill in'
});
let involved = skygear.Reference(rick); // rick is a user object
note.involved = involved;
skygear.publicDB.save(note);
```

You can build up reference between records.

``` javascript
let note1 = new Note({
  heading: 'Specification',
  content: 'This is first section'
});
let note2 = new Note({
  heading: 'Specification page 2',
  content: 'This is second section'
});
note1.nextPage = skygear.Reference(note2);
skygear.publicDB.save([note1, note2]);
```

You can also reference to an array of record.

``` javascript
let note = new Note({
  'content': 'This is intro, please see the document list for detail.'
});
note.details = [note1, note2, note3].map((note) => {
  return skygear.Reference(note);
});
skygear.publicDB.save(note);
```

### Eager Loading

After you specify a relation, you can perform eager loading using transient:

``` javascript
let q = new skygear.Query(Note);
q.transientInclude('details', '<your-transient-name>');
skygear.publicDB.query(q).then((records) => {
  records.map((record) => {
    console.log(record.details); // Array of skygear.Reference
    console.log(record.transient['<your-transient-name>']); // Array of skygear.Record
  });
}, (error) => {
  console.log(error);
});
```

It is possible to eager load records from multiple keys, but doing so will
impair performance.

### Deleting Referenced Record

Yet to be implemented. For now, deleting a referenced record is not allowed.

<a name="subscription"></a>
## Subscription

### Creating a subscription

The following code creates a subscription of all the `Note` created by
`skygear.currentUser`. Notice that creating a subscription does not involve
the use of the `new` keyword.

```javascript
let Note = skygear.Record.extend('note');
let query = new skygear.Query(Note);
query.equalTo('_created_by', skygear.currentUser.id);

subscription = skygear.Subscription('my notes');
subscription.query = query;
skygear.publicDB.saveSubscription(subscription);
```

### Fetching subscription

```javascript
skygear.publicDB.fetchSubscription('my notes').then((subscription) => {
  // examine the subscription here
}, (error) => {
  console.error('error fetching "my notes": %o', error);
});
```

### Fetching all subscriptions

```javascript
skygear.publicDB.fetchAllSubscriptions().then((subscriptions) => {
  subscriptions.forEach((subscription) => {
    // do something with the subscription here
  });
}, (error) => {
  console.error('error fetching all subscriptions: %o', error);
});
```

### Deleting a subscription

```javascript
skygear.publicDB.deleteSubscription('my notes').then((subscription) => {
  console.log('success deleting "my notes"')
}, (error) => {
  console.error('error deleting "my notes": %o', error)
});
```

### Listening to subscription notification

Once user subscribes, we can listen to subscription notifications.

```javascript
let listener = skygear.addNotificationListener((notification) => {
  if (notification.subscriptionID === 'my notes') {
    let id = notification.recordID;
    switch (notification.reason) {
      case skygear.NOTIFICATION_REASON_DELETED:
        // some note is deleted
        break;
      case skygear.NOTIFICATION_REASON_CREATED:
        // a new note is created
        break;
      case skygear.NOTIFICATION_REASON_UPDATED:
        // some note is updated with changes
        let changes = notification.recordChanges;
        // do something with the changes
        break;
    }
  }
});

// later in the program when done listening
listener.off();
```
