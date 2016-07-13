<a name='acl-user'></a>
## Access Control by User

### Access type

There are two types of access: read and write.
- Read access allows querying and fetching records, which includes getting
  all the fields of records as well as the access control settings.
- Write access allows saving and deleting records, which includes adding,
  updating and removing all fields of records as well as access control
  settings for the record.

However, even with write access, ownership of records cannot be changed.

### Default access control setting

By default, read access is granted to the public and write access is granted
only to owner of the record. You can change this behavior as well:

``` javascript
var acl = new skygear.ACL();
// choose one setting among the three
acl.setPublicNoAccess();
acl.setPublicReadOnly(); // default
acl.setPublicReadWriteAccess();
skygear.setDefaultACL(acl); // will change skygear.defaultACL

skygear.defaultACL.hasPublicReadAccess(); // default true
skygear.defaultACL.hasPublicWriteAccess(); // default false
```

### User-based access control per record

Suppose you have three user objects: `enemy`, `visitor` and `friend`.

``` javascript
const Note = skygear.Record.extend('note');
var note = new Note({ content: 'demo user acl' });

note.setNoAccessForUser(enemy);
note.setReadOnlyForUser(visitor);
note.setReadWriteAccessForUser(friend);
skygear.publicDB.save(note).then(...);

note.hasReadAccessForUser(enemy); // false
note.hasWriteAccessForUser(friend); // true
```

<a name='acl-role'></a>
## Access Control by Role

### Defining roles

You can create different roles and later use them to design role-based access
control. You can set certain roles as admin so that they have the power to
change other users' roles. You can also set the default roles so that newly
signed up user would start with these roles.

``` javascript
const Manager = skygear.Role.define('manager');
const Visitor = new skygear.Role('visitor');
// either way of defining roles is fine
skygear.setAdminRole([Manager]).then((roles) => {
  console.log(roles); // [ 'manager' ]
}, (error) => {
  console.error(error);
});
skygear.setDefaultRole([Visitor]).then(...);
```

### Changing roles

For admin user to change roles of other users:

``` javascript
// skygear.currentUser should be an admin user
skygear.getUsersByEmail(['johndoe@example.com']).then((records) => {
  let john = records[0];
  john.addRole(Manager);
  john.removeRole(Visitor);
  return skygear.saveUser(john);
}, (error) => {
  console.error('John is not found')
}).then((john) => {
  console.log('John is promoted from Visitor to Manager');
}, (error) => {
  console.error('You are not admin user');
});
```

### Role-based access control per record

Suppose you have three roles: `Manager`, `Employee` and `Visitor`.

``` javascript
const Plan = skygear.Record.extend('plan');
var plan = new Plan({ title: 'future goals for company' });

plan.setNoAccessForRole(Visitor);
plan.setReadOnlyForRole(Employee);
plan.setReadWriteAccessForRole(Manager);
skygear.publicDB.save(plan).then(...);

plan.hasReadAccess(Visitor); // false
plan.hasReadAccessForRole(Employee); // true
plan.hasWriteAccess(Manager); // true
plan.hasWriteAccessForRole(Employee); // false
```

<a name='acl-type'></a>
## Access Control by Record Type

### Record creation access control

Record creation access is separate from write access for individual records:

``` javascript
skygear.setRecordCreateAccess(Note, [ Employee, Manager ]);
skygear.setRecordCreateAccess(Plan, [ Manager ]);
```

### Type-based access control (**Coming soon**)

If you want all records of certain type to have the same access control
settings, you can set the defaultACL property for that type and the type will
no longer inherit `skygear.defaultACL`.

``` javascript
var acl = new skygear.ACL();
acl.setPublicNoAccess();
acl.setNoAccessForRole(Visitor);
acl.setReadOnlyForRole(Manager);
acl.setReadWriteAccessForRole(Employee);

const Report = skygear.Record.extend('report');
Report.beforeSave((report) => {
  report.setAccess(acl);
});

var report = new Report();
skygear.publicDB.save(report).then(...);
```

