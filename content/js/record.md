<a name="basic-crud"></a>
## Basic CRUD

### Container

Please read about container [here](/js/guide#container) before you proceed.

### Database

You will be provided with a private and a public database.

- Everything in the private database is truly private, regardless of what access
control entity you set to the record. In other words, each user has his own
private database, and only himself have access to it.
- Record saved at public database is by default public. Even without
logging in, records in the public database can be queried (but not updated).
To control the access, you may set different access control entity to the record.
- The database objects can be accessed with `skygear.publicDB` and
`skygear.privateDB`.

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
// note will be something like this:
{
  "_id": "123456...",
  "id" : "note/123456...",
  "recordType": "note",
  // more fields
}
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

You can also batch save multiple records at one time.

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

<a name="data-types"></a>
## Data Types

Please refer to Skygear [Server](/server/guide/data-type) documentation.

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

<a name="reserved"></a>
## Reserved Columns

There are quite a few reserved columns for storing records into the database.
The column names are written as **snake_case** while the JS object attributes
are mapped with **camelCase**. Please notice this one-to-one mapping. When you want
to query on reserved columns, make sure to use **snake_case**; when you get records
back as a JS object, make sure to access attributes with **camelCase**. When
creating and saving records, please avoid using attribute that is the same
as any one of the camelCase attribute names listed below.

Column Name | Object Attribute | Description
--- | --- | ---
\_created\_at | createdAt | date object of when record is created
\_updated\_at | updatedAt | date object of when record is updated last time
\_created\_by | createdBy | user id of record creator
\_updated\_by | updatedBy | user id of last record updater
\_owner\_id | ownerID | user id of owner
**N/A** | **id** | record type and record id
\_id | **_id** | record id

One quick example:
``` javascript
skygear.publicDB.query(new skygear.Query(Note))
  .then((records) => console.log(records[0]));
```
```
RecordCls {
  $transient: (...)
  _id: "3b9f8f98-f993-4e1d-81c3-a451e483306b"
  _recordType: "note"
  _transient: Object
  access: (...)
  attributeKeys: (...)
  createdAt: Thu Jul 07 2016 12:12:42 GMT+0800 (CST)
  createdBy: "118e0217-ffda-49b4-8564-c6c9573259bb"
  id: "note/3b9f8f98-f993-4e1d-81c3-a451e483306b"
  ownerID: "118e0217-ffda-49b4-8564-c6c9573259bb"
  recordType: (...)
  updatedAt: Thu Jul 07 2016 12:42:17 GMT+0800 (CST)
  updatedBy: "118e0217-ffda-49b4-8564-c6c9573259bb"
}
```

Please read the [above](#record) section for more about `_id`. Check the server
[database schema](/server/guide/database-schema) page for more column names.

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
skygear.publicDB.save([note2, note1]);
// success, ordering in the batch save array matters
skygear.publicDB.save([note1, note2]);
// fail, due to foreign key missing, but note2 will be saved
```

Batch saved records are in fact saved one by one at a time based on the ordering
of the provided array. Also, in this example, because note1 references note2,
you must save note2 first and then save note1; otherwise, you will receive an
error saying you have violated foreign key constraint in the database.

Using `skygear.Reference` will be quite useful together with transientInclude.
Read the [Queries](/js/guide/query#relational-queries) section to learn more about
transient and eager loading.

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
