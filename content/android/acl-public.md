To control the public access of a record, you can set the public access control
of a record:

```java
Container skygear = Container.defaultContainer(this);
Record aRecord = /* Create or Query a record */

aRecord.setPublicNoAccess();  // for public no access
aRecord.setPublicReadOnly();  // for public read-only access
aRecord.setPublicReadWrite(); // for public read-write access

skygear.getPublicDatabase().save(aRecord, new RecordSaveResponseHandler(){
    // ...
});

```

Of cuase, you can check whether a record is publicly readable / writable as
following:

```java
Record aRecord = /* Create or Query a record */

boolean isPublicReadable = aRecord.isPublicReadable();
boolean isPublicWritable = aRecord.isPublicWritable();

```
