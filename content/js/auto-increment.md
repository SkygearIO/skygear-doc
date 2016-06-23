# Create an Auto-Incrementing Field

Skygear reserves the `id` field in the top level of all record as a primary key.
`id` must be unique and default to be Version 4 UUID. If you want to
auto-incrementing id for display purpose, Skygear provide a sequence for this
purpose. The sequence is guaranteed unique.

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

- You can omit the `noteID` on update, the value will remain unchange.
- You can migrate any integer to auto-incrementing sequence.
- Our JIT schema at development will migrate the DB schema to sequence. All
  `noteID` at `Note` will be a sequence type once migrated.

## Override sequence manually

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
