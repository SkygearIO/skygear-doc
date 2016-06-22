## What Skygear provide

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

## Eager Loading

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

## Deleting Referenced Record

Yet to be implemented. For now, deleting a referenced record is not allowed.
