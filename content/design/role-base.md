+++
date = "2015-09-30T18:59:54+08:00"
draft = true
title = "How Role based ACL work in taylors"

+++

For security specification, please refer to the
[security doc](https://github.com/oursky/taylors/blob/master/security.md)
at taylor.

# Role management

Specifiying Role on bootstrap. It will freeze on production.

_role.js_
``` javascript
const Admin = jsourd.Role.define('admin');
const Staff = jsourd.Role.define('staff');
const Writer = jsourd.Role.define('writer');
```

## Providing site wide default role

Default user will have no role.
Only user at AdminRole will able to modify the user's role.
Only user at AdminRole will able to create user with role that is not default role.

``` javascript
jsourd.setAdminRole([role.Admin, role.Staff]); // Same as Dev Schema JIT
jsourd.setDefaultRole(role.Writer);
```

## Changing role

Seem it is quite normal to allow oneself to remove it from an existing Role.

``` javascript
jsourd.login('writer@taylor.com').then((user) => {
  const myself = user;
  myself.removeRole(role.Writer);
  myself.addRole(role.Staff); //This will raise exception since, myself is writer
  jsourd.saveUser(myself);
}, (error) => {
  console.log('Can\'t login', error);
});
```

User at `AdminRole` will be able to change everyone role.

_Example on removing itself from the Admin role_
``` javascript
let admin;
jsourd.login('admin@taylor.com').then((user) => {
  admin = user;
  admin.removeRole(role.Admin);
  admin.addRole(role.Staff);
  jsoourd.saveUser(admin);
  // User is nolonger admin
}, (error) => {
  console.log('Can\'t login', error);
})
```

_Example on promote other Staff to Admin_
``` javascript
// Assuming jsourd.currentUser has role.Admin
jsourd.getUserByEmail('jim@oursky.com').then((jim) => {
  if (jim.hasRole(role.Staff)) {
    jim.addRole(role.Admin);
    jsourd.saveUser(jim).then((jim) => {
      console.log('Jim have admin role now');
    }, () => {
      console.log('Jim cannot promote');
    });
  }
}, (error) => {
  console.log('Jim not found');
});
```

### Creating and modifying the Writer

``` javascript
// Assuming current logged in use is steven - Admin
const attrs = {
  country: 'HK',
  phone: '21559299'
};
jsourd.signup({
  username: 'rick.mak@gmail.com',
  email: 'rick.mak@gmail.com',
  password: 'password',
  roles: [role.Writer]
}).then((user) => {
  console.log('User attrs is set later');
  const userAttrs = UserRecord.create(attrs);
  userAttrs.addWriteAccess(user); // Grant the user modify his own attrs
  jsourd.publicDB.save(userAttrs).then(() => {
    console.log('done');
  }, errHandler);
}, errHandler);
```

# Record ACL model

** Deny of Record creation
Need class level access control. Can be like JIT, development can change at
will. Freeze at production.

By default, all Record can be create by anyone. It can override by specify what
role can create during development.

``` javascript
Project.createAccess([role.Admin, role.Staff]);
Document // Everyone can create document
Task.createAccess([role.Admin, role.Staff]);
Ticket // Everyone can create Ticket
Payment.createAccess([role.Admin, role.Staff]);
Customer.createAccess([role.Admin, role.Staff]);
UserRecord.createAccess([role.Admin, role.Staff]);
```

## Providing site wide ACL default _Good to have_

The default ACL of records without explicit seting is `public readable`
_role.js

``` javascript
const defaultACL = new jsourd.ACL();
acl.addPublicReadAccess();
jsourd.setDefaultACL(acl);
```
Above code will take no effect, since it same as the default of what jsourd
provided.

``` javascript
const acl = new jsourd.ACL();
acl.addWriteAccess(role.Admin);
jsourd.setDefaultACL(acl); // This ACL have no read access for public
```

## Setting ACL on creating a project.

``` javascript
const project = new Project(params);

project.addWriteAccess(role.Admin); // Can be skipped if we set the default.
project.addWriteAccess(role.Staff);
if (project.isRecruiting) {
  project.addReadAccess(role.Writer);
}
jsourd.public.save(note);
```

## Creating Project Application

Only Staff and admin able to view the Project Application

``` javascript
// Assuming logged in as a writer
const application = new Application(attrs);
application.addReadAccess(role.Staff);
application.addReadAccess(role.Admin);
```

## Writer will not able to read the project when it is no loner recuriting.

Client size hook. The call back will run **before** jsour serialize the project 
and send to the ourd serve. _Good to have_

``` javascript
Project.beforeSave((project) => {
  if (!project.isRecruiting) {
    project.removeReadAccess(role.Writer);
  }
});
```

Imperative code to change the access control on Staff chaning the Project state.

``` javascript
// Assume Staff login
let project;
let rick; // writer
// Got the project by query
project.isRecuriting = false;
project.assignee = rick;
project.removeReadAccess(role.Writer);
project.addReadAccess(rick);
jsourd.save(project);
```

## Writer can read the document when Project is recruiting

