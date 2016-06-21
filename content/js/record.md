<a name="basic-crud"></a>
# Container

Container is the uppermost layer of skygear. In practice,
`import skygear from 'skygear'` will give you a container instance at variable
skygear. In most case you will only need one instance of container.

The first things you need to interact with container is setting `endPoint` and
`apiKey`.

``` javascript
import skygear from 'skygear';
// or in the browser with ECMAScript 5 just use window.skygear

skygear.config({
    'endPoint': 'https://<your-app-name>.staging.skygeario.com',
    'apiKey': '<your-api-key>'
}).then((container) => {
    console.log(container);
}, (error) => {
    console.error(error);
});
```

# Database

You will be provided with a private and a public database.

- Everything in the private database is truly private, regardless of what access
control entity you set to the record.
- Record saved at public database is by default public. To control the access, you
may set different access control entity to the record.
- The database objects can be accessed with `skygear.publicDB` and
`skygear.privateDB`.

# Record

- `Record` must have a type.
- `Record` is a key-value-pair data object that is stored at _database_.
- `Record` will belong to the currently logged in user.
- `Record` object has unique `id` (a string combination of record type and uuid).

You can design different `Record` type to model your app. Just like defining
tables in SQL.

``` javascript
const Note = skygear.Record.extend('note');
const Blog = skygear.Record.extend('blog');

let note = new Note({ "content": "Hello World" });
// { id: "...", recordType: "note", access: [Object object] }
```

# (Create) Save a record

You can save a public note to server as follow.

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
        errors:       [helloError, foobarError]
    } = result;
    // errors here indicate saving error
}, (error) => {
    // error here indicates request error
});
```

# (Read) Fetch existing records

You can construct a Query object by providing a Record Type.
You can config the query by mutating its state.
Read the section about Query to learn more.

``` javascript
var query = new skygear.Query(Blog);
query.greaterThan('popular', 10);
query.addDescending('popular');
query.limit = 10;

skygear.publicDB.query(query).then((records) => {
    console.log(records)
}, (error) => {
    console.error(error);
})
```

# (Update) Modify a record

Every `Record` object has a unique identifier that can be referenced
as `record.id`. See the above section about `Record` for more information.

``` javascript
skygear.publicDB.save(new Note({
    'id': '<your-note-id>',
    'content': 'Hello New World!'
})).then((record) => {
    console.log(record);
}, (error) => {
    console.error(error);
});
```

After saving a record, any attributes modified from the server side will
be updated on the saved record object in place. The local transient fields of
the records are merged with any remote transient fields applied on the server
side.

# (Delete) Delete a record

Again, every `Record` object has a unique identifier that can be referenced
as `record.id`. See the above section about `Record` for more information.

``` javascript
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
