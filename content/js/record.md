+++
date = "2015-09-24T18:33:04+08:00"
draft = false
title = "Container, Databases and Records"

+++

# Saving a record

You can save a public note to server as follow.

``` javascript
skygear.publicDB.save(new Note({
    'content': 'Hello World!'
})).then((record) => {
    console.log(record);
}, (error) => {
    console.log(error);
});
```

To understand the code above, you need you know what is _container_, _database_
and _record_.

# Container

Container is the uppermost layer of skygear. In practice, 
`import skygear from 'skygear'` will give you a container instance at variable
skygear. In most case you will only need one instance of containter.

The first things you need to interact with container is setting `endPoint` and
`accessToken`.

``` javascript
JSSkygear.endPoint = 'http://mydeployment.dev/api/';
JSSkygear.configApiKey('mysecrect');
```

# Database

You will provide with private and public database.

- Everything in private database is truely private, regardless of what access
control entity you set to the record.
- Record saved at public database is defualt public. To control the access, you
may set difference access control entity to the record.

# Record

- `Record` must have type.
- `Record` is a key-value data object that store at _database_.
- `Record` will belong to the currently logged in user.


# Defining a record type

You will design different record type to model your app. Just like define table
in SQL.

``` javascript
const Note = skygear.Record.extend('note');
const Blog = skygear.Record.extend('blog');
```

# Modify a record

``` javascript
skygear.publicDB.save(new Note({
    'content': 'Hello World!'
})).then((record) => {
    console.log(record);
}, (error) => {
    console.log(error);
});
```

After saving a record, any attributes modified from the server side will
be updated on the saved record object in place. The local transient fields of
the records are merged with any remote transient fields applied on the server
side.

# Fetching an existing records

You can construct a Query object by providing a Record Type.
You can config the query by mutating its state.

``` javascript
var query = new skygear.Query(Blog);
query.greaterThan('popular', 10);
query.addDescending('popular');
query.limit = 10;

skygear.publicDB.query(query).then((records) => {
  console.log(records)
}, (error) => {
  console.log(error);
})
```

# Deleting a record


``` javascript
skygear.publicDB.del(record).then(() => {
  console.log(record);
}, (error) => {
  console.log(error);
});
```
