Skygear supports assigning a role to a user in order to control the access of
a record for a group of users.

```java
Container skygear = Container.defaultContainer(this);
User theUser = /* Query a user */
Role programmer = new Role("Programmer");
Role projectManager = new Role("ProjectManager");

theUser.addRole(programmer);
theUser.removeRole(projectManager);

skygear.saveUser(theUser, new UserSaveResponseHandler() {
    @Override
    public void onSaveSuccess(User user) {
        // The roles of the user has been updated
    }

    @Override
    public void onSaveFail(String reason) {
        // Error handling...
    }
});

```

Please be reminded that assigning roles to user requires the current user is of
an admin role.

To setting roles as an admin role, you can:

```java
Container skygear = Container.defaultContainer(this);
Role admin = new Role("Admin");
Role boss = new Role("Boss");

skygear.setAdminRole(new Role[]{ admin, boss }, new SetRoleResponseHandler() {
    @Override
    public void onSetSuccess(Role[] roles) {
        // Admin roles are updated
    }

    @Override
    public void onSetFail(String reason) {
        // Error handling...
    }
});

```

You can check whether a user has a certain role:

```java
User theUser = /* Query a user */
Role programmer = new Role("Programmer");

boolean isProgrammer = theUser.hasRole(programmer);

```

After managing user using role, you can set the role-based access control as
following:

```java
Role programmer = new Role("Programmer");

Container skygear = Container.defaultContainer(this);
Record aRecord = /* Create or Query a record */

aRecord.setNoAccess(programmer);        // no access for the role
aRecord.setReadOnly(programmer);        // read-only access for the role
aRecord.setReadWriteAccess(programmer); // read-write access for the role

skygear.getPublicDatabase().save(aRecord, new RecordSaveResponseHandler(){
    // ...
});

```

You can check whether a record is readable / writable for a specific role:

```java
Role programmer = new Role("Programmer");
Record aRecord = /* Create or Query a record */

boolean isReadable = aRecord.isReadable(programmer);
boolean isWritable = aRecord.isWritable(programmer);

```
