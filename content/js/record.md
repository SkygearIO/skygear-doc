<a name="overview"></a>
## Overview

Please make sure you know about and have already configured your skygear
[container](/js/guide#set-up-app) before you proceed.

<a name="record"></a>
### The Record Class

- `Record` must have a type.
- Each `Record` object is like a dictionary with keys and values; keys will be
mapped to database column names, and values will be stored appropriately
based on the data type. Please refer to [Data Type](#data-type)
section within this guide for more information.
- `Record` will be owned by the currently logged in user.
- Each `Record` object has its unique `id` (combination of record type
  and uuid used in the database as `_id`).
- `Record` has reserved keys that cannot be used, such as `id` and `_id`.
Please refer to [Reserved Columns](#reserved) section for more.

You can design different `Record` type to model your app. Just like defining
tables in SQL.

``` javascript
const Note = skygear.Record.extend('note');
const Blog = skygear.Record.extend('blog');

const note = new Note({ 'content': 'Hello World' });
```

### Record Database

You will be provided with a private and a public database.

- Everything in the private database is truly private, regardless of what access
control entity you set to the record. In other words, each user has his own
private database, and only himself has access to it.
- Record saved at public database is by default public. Even without
logging in, records in the public database can be queried (but not updated).
To control the access, you may set different access control to the record.
- The database objects can be accessed with `skygear.publicDB` and
`skygear.privateDB`.

<a name="basic-crud"></a>
## Basic CRUD

### Creating a record

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

#### Batch save

You can also batch save multiple records at one time.

``` javascript
skygear.publicDb.save([goodNote1, goodNote2, badNote3, goodNote4, badNote5])
.then((result) => {
  console.log(result.savedRecords);
  // [goodNote1, goodNote2, undefined, goodNote4, undefined]
  console.log(result.errors);
  // [undefined, undefined, error3, undefined, error5]
}, (error) => { /* request error */ })
```

By default, "good" records are still saved while "bad" records are not.
Use the `atomic` option if you don't want partial saves, so either all or none
of the records will be saved.

``` javascript
skygear.publicDB.save([goodNote, badNote], { atomic: true });
// neither of the notes are saved
```

### Reading a record

You can construct a Query object by providing a Record Type.
You can config the query by mutating its state.
Read the section about [Query](/js/guide/query) to learn more.

``` javascript
const query = new skygear.Query(Blog);
query.greaterThan('popular', 10);
query.addDescending('popular');
query.limit = 10;

skygear.publicDB.query(query).then((records) => {
  console.log(records)
}, (error) => {
  console.error(error);
})
```

### Updating a record

``` javascript
const query = new skygear.Query(Note);
query.equalTo('_id', '<your-note-_id>');

skygear.publicDB.query(query)
.then((records) => {
  const note = records[0];
  note['content'] = 'Hello New World';
  return skygear.publicDB.save(note);
}).then((record) => {
  console.log('update success');
}, (error) => {
  console.error(error);
});
```

- After saving a record, any attributes modified from the server side will
be updated on the saved record object in place.
- The local transient fields of the records are merged with any remote
transient fields applied on the server side.
- There is a shorter way for updating records, but only use it when you
know what you are doing. (Unspecified field or column will not be changed,
so in the case below only content field will be changed)

``` javascript
skygear.publicDB.save(new Note({
  _id: 'note/<your-note-_id>',
  content: 'Hello New World'
}));
```

### Deleting a record

``` javascript
skygear.publicDB.delete({
  id: 'note/<your-note-_id>'
}).then((record) => {
  console.log(record);
}, (error) => {
  console.error(error);
});
```

You can also delete multiple records at one time.

``` javascript
const query = new skygear.Query(Note);
query.lessThan('rating', 3);

const foundNotes = [];
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

<a name="reference"></a>
## Records Relations

### What Skygear provide

Skygear supports parent-child relation between records via _reference_.
`skygear.Reference` is a pointer class, which will translate to foreign key in
skygear server database for efficient query.

You can even reference a user from a record. To learn more about user object or
how to retrieve user objects, you can read the [Users](/js/guide/users) section.
Notice that we are not using the `new` keyword creating reference. Assume you
have the user record object `rick`.

``` javascript
const note = new Note({
  heading: 'Working Draft',
  content: 'People involved please fill in',
});
const author = new skygear.Reference(rick);
note.author = author;
skygear.publicDB.save(note);
```

You can build up reference between records.

``` javascript
const note1 = new Note({
  heading: 'Specification',
  content: 'This is first section',
});
const note2 = new Note({
  heading: 'Specification page 2',
  content: 'This is second section',
});
note1.nextPage = new skygear.Reference(note2);
skygear.publicDB.save([note2, note1]);
```

- Ordering of objects in batch save array matters if there are reference
relationship between records. In the above case, if you perform batch save on
`[note1, note2]`, there will be an error saving `note1`, but `note2` will
still be saved!
- If you wish to retrieve `note1` and `note2` at the same time in one query,
you might use `transientInclude`. Read the [Queries](/js/guide/query#relational-queries)
section to learn more about eager loading.

### Deleting Referenced Record

Yet to be implemented. For now, you have to delete the referencing record
first and then the referenced record.

<a name="data-type"></a>
## Data Type

Skygear supports almost all of the builtin JavaScript types, such as:
- String
- Number
- Boolean
- Array
- Object
- Date

There are also four other types provided by Skygear JS SDK:
- Reference (described above)
- Sequence (described below)
- Geolocation (described in [Geo-location](/js/guide/geolocation) section)
- Asset (described in [Assets (File Upload)](/js/guide/asset) section)

Please refer to the [server](/server/guide/data-type) documentation for
more detail in supported data types.

### Auto-Incrementing Sequence Fields

Skygear reserves the `id` field in the top level of all record as a primary key.
`id` must be unique and default to be Version 4 UUID. If you want to
auto-incrementing id for display purpose, Skygear provide a sequence for this 
purpose. The sequence is guaranteed unique. Once a record with sequence id is
saved, all the other records will automatically have sequence ids as well.

``` javascript
const note = new Note({
  content: 'Hello World'
});
note.noteID = new skygear.Sequence();

skygear.publicDB.save(note).then((note) => {
  console.log(note.noteID);
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

If you wish to override sequence manually, you can do that as well. If the
provided `noteID` is taken by another record, there will be an error; otherwise,
the record will be saved and the maximum `noteID` plus one will be used for the
next record.

``` javascript
const note = new Note({
  content: 'Hello World'
});
note.noteID = 43;
skygear.publicDB.save(note);
```

<a name="reserved"></a>
### Reserved Columns

There are quite a few reserved columns for storing records into the database.
The column names are written as **snake_case** while the JS object attributes
are mapped with **camelCase**. Please notice this one-to-one mapping. When you want
to query on reserved columns, make sure to use **snake_case**; when you get records
back as a JS object, make sure to access attributes with **camelCase**. When
creating and saving records, please avoid using attribute that is the same
as any one of the camelCase attribute names listed below.

Column Name | Object Attribute | Description
--- | --- | ---
`_created_at` | `createdAt` | date object of when record is created
`_updated_at` | `updatedAt` | date object of when record is updated last time
`_created_by` | `createdBy` | user id of record creator
`_updated_by` | `updatedBy` | user id of last record updater
`_owner_id` | `ownerID` | user id of owner
**N/A** | `id` | record type and record id
`_id` | `_id` | record id

One quick example:

``` javascript
skygear.publicDB.query(new skygear.Query(Note))
  .then((records) => console.log(records[0]));
```

``` javascript
/* Type: RecordCls */ {
  createdAt: new Date("Thu Jul 07 2016 12:12:42 GMT+0800 (CST)"),
  updatedAt: new Date("Thu Jul 07 2016 12:42:17 GMT+0800 (CST)"),
  createdBy: "118e0217-ffda-49b4-8564-c6c9573259bb",
  updatedBy: "118e0217-ffda-49b4-8564-c6c9573259bb",
  ownerID: "118e0217-ffda-49b4-8564-c6c9573259bb",
  id: "note/3b9f8f98-f993-4e1d-81c3-a451e483306b",
  _id: "3b9f8f98-f993-4e1d-81c3-a451e483306b",
  recordType: "note",
}
```

Query on reserved columns example:

``` javascript
let query = new skygear.Query(Note);
query.equalTo('_owner', skygear.currentUser.id);
// '_owner' is an alias for '_owner_id'
skygear.publicDB.query(query);
```

Check the server [database schema](/server/guide/database-schema) page for more.
