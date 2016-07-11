User-based access control is to set the access level of a record for a specific
user.

To set the user-based access control, you may first need query the user:

```java
Container skygear = Container.defaultContainer(this);
skygear.getUserByEmail("user01@skygear.dev", new UserQueryResponseHandler(){
    @Override
    public void onQuerySuccess(User[] users) {
        User theUser = users[0];
        // your logic to set the user-based access control
    }

    @Override
    public void onQueryFail(String reason) {
        // Error handling...
    }
});
```

After getting the user, you can set the access control of a record for that user.

```java
Container skygear = Container.defaultContainer(this);
User theUser = /* Query a user */
Record aRecord = /* Create or Query a record */

aRecord.setNoAccess(theUser);        // no access for the user
aRecord.setReadOnly(theUser);        // read-only access for the user
aRecord.setReadWriteAccess(theUser); // read-write access for the user

skygear.getPublicDatabase().save(aRecord, new RecordSaveResponseHandler(){
    // ...
});

```

You can check whether a record is readable / writable for a specific user:

```java
User theUser = /* Query a user */
Record aRecord = /* Create or Query a record */

boolean isReadable = aRecord.isReadable(theUser);
boolean isWritable = aRecord.isWritable(theUser);

```

If you only get the user ID, you can also set user-based access control of
a record:

```java
Container skygear = Container.defaultContainer(this);
String userId = /* Get the User ID */
Record aRecord = /* Create or Query a record */

aRecord.setNoAccess(userId);        // no access for the user
aRecord.setReadOnly(userId);        // read-only access for the user
aRecord.setReadWriteAccess(userId); // read-write access for the user

skygear.getPublicDatabase().save(aRecord, new RecordSaveResponseHandler(){
    // ...
});

```