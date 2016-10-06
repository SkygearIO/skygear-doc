Skygear supports saving Geo Location as a field in record. Please be reminded
that Geo Location is identified by latitude and longitude.

### Saving a location in a record

```java
Location loc = /* get the location via LocationServices or create a new one */
Record aRecord = new Record("Note");
aRecord.set("place", loc);

skygear.getPublicDatabase().save(aRecord, new RecordSaveResponseHandler(){
    @Override
    public void onSaveSuccess(Record[] records) {
        Record savedRecord = records[0];
        Location place = savedRecord.get("place");
        Log.i(
            "Skygear Location Demo",
            String.format(
                "The place is at (%f, %f)",
                place.getLatitude(),
                place.getLongitude()
            )
        );
    }

    @Override
    public void onPartiallySaveSuccess(
        Map<String, Record> successRecords,
        Map<String, String> reasons
    ) {
        /* Partial success handling */
    }

    @Override
    public void onSaveFail(String reason) {
        /* Error handling */
    }
});
```

### Querying records by distance

After saving records with location, you can query records within specific
distance from another location. Also, you can sort the query result by the
distance from a provided location.

```java
Location targetLocation = /* get the location via LocationServices or create a new one */
Location targetLocation2 = /* get the location via LocationServices or create a new one */
Query noteQuery = new Query("Note")
        .distanceLessThan("place", targetLocation, 500)
        .addAscendingByDistance("place", targetLocation2);

skygear.getPublicDatabase().query(noteQuery, new RecordQueryResponseHandler() {
    /* Implementation of response handler */
});
```

### Retrieving record location field distances relative to a point

Moreover, the distance of a record field from a specific location can be
calculated during record query.

```java
Location targetLocation = /* get the location via LocationServices or create a new one */
Query noteQuery = new Query("Note")
        .transientIncludeDistance("place", "distance", targetLocation);

skygear.getPublicDatabase().query(noteQuery, new RecordQueryResponseHandler() {
    @Override
    public void onQuerySuccess(Record[] records) {
        for (int idx = 0; idx < records.length; idx++) {
            Record perRecord = records[idx];
            double perRecordDistance = (double) perRecord.getTransient().get("distance");

            Log.i("Skygear", "Distance: " + perRecordDistance);
        }
    }

    @Override
    public void onQueryError(String reason) {
        /* Error handling */
    }
});
```
