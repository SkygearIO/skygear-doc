+++
date = "2015-09-30T18:59:54+08:00"
draft = true
title = "How Role based ACL work in taylors"

+++

For security specification, please refer to the
[security doc](https://github.com/oursky/taylors/blob/master/security.md)
at taylor.

# Feature Mark
- Admin can write Staff #S1
- Admin can write Writer #S2
- Admin can write EVERYTHING #S3
- Staff can write Project #S4
- Staff can write Project Task #S5
- Staff can write Project Ticket #S6
- Staff can write Customer #S7
- Staff can view Project Application #S8
- Staff can write himself #S9
- Staff can write Writer #S10
- ** Staff cannot change its role to Admin #SA1
- ** Writer cannot create Project #SA2
- ** Writer cannot view price of the Project #SA3
- ** Writer cannot view tasks of the Project #SA4
- Writer can write himself #S11
- Writer can view Project when Project is Recruiting #S12
- Writer can view Project Document when Project is Recuriting #S13
- Writer can write Project Application when Project is Recruiting #S14
- Writer can write Project Document if Project assigned to him #S15
- Writer can write Project Ticket if Project Ticket assigned to him #S16
- Writer can view Payment regarding himself #S17
- ** Writer cannot change his roles to Staff/Admin #SA5


** note ** S14 is always can. I think we will want to model: `Writer canot
write project document if Project is not recruiting`. S14A

# Role management

Specifiying Role on bootstrap. It will freeze on production.

_role.js_
``` javascript
const Admin = skygear.Role.define('admin');
const Staff = skygear.Role.define('staff');
const Writer = skygear.Role.define('writer');
```

## Providing site wide default role

Default user will have no role.
Only user at AdminRole will able to modify the user's role.
Only user at AdminRole will able to create user with role that is not default role.

** [Discussion] ** Seem there should be only one Admin Role. Since we have no
role hierarchy, Admin Role will able to change its role. Resulting the multiple
Admin Role have no actual access control meaning, but only semantic meaning.

** [Compelx but works] ** The AdminRole array order represent hierarchy. Kinda
implicit, 

``` javascript
// S1, S2, SA1, SA5
skygear.setAdminRole([role.Admin, role.Staff]); // Same as Dev Schema JIT
skygear.setDefaultRole(role.Writer);
```

## Changing role

Seem it is quite normal to allow oneself to remove it from an existing Role.

``` javascript
skygear.login('writer@taylor.com').then((user) => {
  const myself = user;
  myself.removeRole(role.Writer);
  myself.addRole(role.Staff); //This will raise exception since, myself is writer
  skygear.saveUser(myself);
}, (error) => {
  console.log('Can\'t login', error);
});
```

User at `AdminRole` will be able to change everyone role.

_Example on removing itself from the Admin role_
``` javascript
let admin;
skygear.login('admin@taylor.com').then((user) => {
  admin = user;
  admin.removeRole(role.Admin);
  admin.addRole(role.Staff);
  jsoskygear.saveUser(admin);
  // User is nolonger admin
}, (error) => {
  console.log('Can\'t login', error);
})
```

_Example on promote other Staff to Admin_
``` javascript
// Assuming skygear.currentUser has role.Admin
skygear.getUserByEmail('jim@oursky.com').then((jim) => {
  if (jim.hasRole(role.Staff)) {
    jim.addRole(role.Admin);
    skygear.saveUser(jim).then((jim) => {
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
skygear.signup({
  username: 'rick.mak@gmail.com',
  email: 'rick.mak@gmail.com',
  password: 'password',
  roles: [role.Writer]
}).then((user) => {
  console.log('User attrs is set later');
  const userAttrs = UserRecord.create(attrs);
  // S9, S10, S11
  userAttrs.addWriteAccess(role.Staff);
  userAttrs.addWriteAccess(user); // Grant the user modify his own attrs
  skygear.publicDB.save(userAttrs).then(() => {
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
// S4, S5, S6, S7, SA2, SA3, SA4
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
const defaultACL = new skygear.ACL();
acl.addPublicReadAccess();
skygear.setDefaultACL(acl);
```
Above code will take no effect, since it same as the default of what skygear
provided.

``` javascript
// S3
const acl = new skygear.ACL();
acl.addWriteAccess(role.Admin);
skygear.setDefaultACL(acl); // This ACL have no read access for public
```

## Setting ACL on creating a project.

``` javascript
const project = new Project(params);

project.addWriteAccess(role.Admin); // Can be skipped if we set the default.
project.addWriteAccess(role.Staff);
// S12
if (project.isRecruiting) {
  project.addReadAccess(role.Writer);
}
skygear.public.save(note);
```

## Creating Project Application

Only Staff and admin able to view the Project Application

``` javascript
// S8
// Assuming logged in as a writer
const application = new Application(attrs);
application.addReadAccess(role.Staff);
application.addReadAccess(role.Admin);
```

## Writer will not able to read the project when it is no loner recuriting.

Client size hook. The call back will run **before** jsour serialize the project 
and send to the skygear serve. _Good to have_

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
let project; // Got the project by query
let rick; // writer
// Assign the project to a writer
project.isRecuriting = false;
project.assignee = rick;
project.removeReadAccess(role.Writer);
project.addReadAccess(rick);
skygear.save(project);
// Staff will create the respective bucket for Writer Document and Ticket.
// S15, S16
const rickDocument = new ProjectDocument();
rickDocument.project = skygear.Reference(project);
rickDocument.addWriteAccess(rick);
rickDocument.writer = skygear.Reference(rick);
const rickTicket = new ProjectDocument();
rickTicket.project = skygear.Reference(project);
rickTicket.addWriteAccess(rick);
rickTicket.writer = skygear.Reference(rick);
skygear.publicDB.save([rickDocument, rickTicket]);
```

## Writer can read the document when Project is recruiting

``` javascript
// S13
// At the document upload
const doc = new Document({
  provider: 's3',
  bucket: 'taylor-writer',
  key: 'file1'
});
doc.addWriteAccess(role.Staff);
if (project.isRecruiting) {
  doc.addReadAccess(role.Writer);
}
doc.project = skygear.Reference(project);
skygear.publicDB.save(doc).then((result) => {
  console.log(result[0]); // The document
}, (error) => {
  console.log(error);
});

// At change to recuriting
project.isRecruiting = true;
let toRecruiting = project.tranient['documents'].map((doc) => {
  doc.addReadAccess(role.Writer);
});
toRecruiting.push(project);
skygear.publicDB.save(toRecruiting);

// At change to non recuriting
project.isRecruiting = false;
let toSave = project.tranient['documents'].map((doc) => {
  doc.removeReadAccess(role.Writer);
});
toSave.push(project);
skygear.publicDB.save(toSave);

// How writer query the recruiting project documents
const projectQuery = skygear.Query(Project);
projectQuery.equal('id', 'theid');
projectQuery.transientInclude('documents');
let docsForWriter;
skygear.publicDB.query(projectDocumentQuery).then((pds) => {
  docsForWriter = pds.tranient['documents'];
}, (error) => {
  console.log(error);
});
```

## Writer can write to Project Document if Project assigned to him

``` javascript
// Login as Writer
// How writer query the Project documents of a Project upload by himself.
// S15
const projectDocumentQuery = skygear.Query(ProjectDocument);
projectDocumentQuery.equal('project', skygear.Reference(project));
projectDocumentQuery.equal('writer', skygear.Reference(skygear.currentUser));
projectDocumentQuery.transientInclude('documents');
let docsForWriter;
skygear.publicDB.query(projectDocumentQuery).then((pds) => {
  docsForWriter = pds.tranient['documents'];
}, (error) => {
  console.log(error);
});
// To combine with the Document by Staff.

```

## Writer can write Project Ticket if Project assigned to him

``` javascript
// Login as Writer
// Read Project ticket
const q;
let projectTicket;
let tickets;
skygear.publicDB.query(q).then((result) => {
  projectTicket = result[0];
  tickets = result[0].tickets;
  console.log(result[0].tickets);
}, (error) => {
  console.log(error);
});
// Write to Project Ticket, after got projectTicket.
// S16
const newTicket = new Ticket({
  content: 'Question concerning task 1'
});
newTicket.addWriteAccess(role.Staff);
// If no eager save
skygear.publicDB.save([newTicket]).then(() => {
  projectTicket.tickets.push(skygear.Reference(newTicket));
  skygear.publicDB.save(projectTicket); // Eager save?????
}, (error) => {
  console.log(error);
});
```

## Writer can view Payment regarding himself

``` javascript
// Login as Staff, rick is the person to be paid
// Staff to set the payment readable when creating payment
// S17
const project = // got by query
const payment = new Payment({
  provider: 'paypal',
  identifier: 'rick@taylors.com'
  amount: 30
});
payment.project = skygear.Reference(project);
payment.writer = rick;
payment.addReadAccess(rick);
skygear.publicDB.save(payment);
```
