+++
date = "2015-10-05T17:00:54+08:00"
draft = true
title = "Record Relation"

+++

# What Ourd provide

Ourd support parent-child relation between records via _reference_.
`jsourd.Reference` is a pointer class, which will translate to foreignkey in
ourd database for efficient query.

You can reference a record to a user.

``` javascript
const note = new Note({
  heading: 'Working Draft',
  content: 'People involed please fill in'
});
const involed = jsourd.Reference(rick); // rick is a user.
note.involed = involed;
jsourd.publicDB.save(note);
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
note1.nextPage = jsourd.Reference(note2);
jsourd.publicDB.save([note1, note2]);
```

You can also reference to an array of record.

``` javascript
const note = new Note({
  'content': 'This is intro, please see the document list for detail.'
});
const details = [note1, note2, note3];
note.details = details;
jsourd.publicDB.save(note);
```

# Eager Loading

After you give a relation, you can 

``` javascript
const q = jsourd.Query(Note);
q.transientInclude('details');
jsourd.publicDB.query(q).then((records) => {
  records.map((record) => {
    console.log(record.details); // Array of jsourd.Reference
    console.log(record.transient['details']); // Array of jsourd.Record
  });
}, (error) => {
  console.log(error);
});
```

# Reference Action

Provide delete cascade.
