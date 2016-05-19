# What Skygear provide

Skygear support parent-child relation between records via _reference_.
`skygear.Reference` is a pointer class, which will translate to foreignkey in
skygear server database for efficient query.

You can reference a record to a user.

``` javascript
const note = new Note({
  heading: 'Working Draft',
  content: 'People involed please fill in'
});
const involed = skygear.Reference(rick); // rick is a user.
note.involed = involed;
skygear.publicDB.save(note);
```

You can build up reference between records.

``` javascript
const note1 = new Note({
  heading: 'Specification',
  content: 'This is first section'
});
const note2 = new Note({
  heading: 'Specification page 2',
  content: 'This is second section'
});
note1.nextPage = skygear.Reference(note2);
skygear.publicDB.save([note1, note2]);
```

You can also reference to an array of record.

``` javascript
const note = new Note({
  'content': 'This is intro, please see the document list for detail.'
});
const details = [note1, note2, note3].map((note) => {
  return skygear.Reference(note);
})
note.details = details;
skygear.publicDB.save(note);
```

# Eager Loading

After you give a relation, you can

``` javascript
const q = new skygear.Query(Note);
q.transientInclude('details', 'my_details');
skygear.publicDB.query(q).then((records) => {
  records.map((record) => {
    console.log(record.details); // Array of skygear.Reference
    console.log(record.transient['my_details']); // Array of skygear.Record
  });
}, (error) => {
  console.log(error);
});
```

It is possible to eager load records from multiple keys, but doing so will
impair performance.

# Reference Action

Provide delete cascade.
