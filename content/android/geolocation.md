Skygear supports saving Geo Location as a field in record. Please be reminded
that Geo Location is identified by latitude and longitude.

### Saving a location in a record

```java
Container skygear = Container.defaultContainer(this);
Database publicDB = skygear.getPublicDatabase();

Location office = new Location("gps");
office.setLatitude(22.336265);
office.setLongitude(114.147932);

Record aRecord = new Record("Meeting");
aRecord.set("place", office);

publicDB.save(aRecord, new RecordSaveResponseHandler(){
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
        // Partial success handling
    }

    @Override
    public void onSaveFail(String reason) {
        // Error handling
    }
});
```

### Querying records by distance

After saving records with location, you can query records within specific
distance from another location. Also, you can sort the query result by the
distance from a provided location.

```java
Container skygear = Container.defaultContainer(this);
Database publicDB = skygear.getPublicDatabase();

Location office = new Location("gps");
office.setLatitude(22.336265);
office.setLongitude(114.147932);

Query restaurantQuery = new Query("Restaurant")
        .distanceLessThan("location", office, 100)
        .addAscendingByDistance("location", office);

publicDB.query(restaurantQuery, new RecordQueryResponseHandler() {
    // Implementation of response handler
});
```

### Retrieving record location field distances relative to a point

Moreover, the distance of a record field from a specific location can be
calculated during record query.

```java
Container skygear = Container.defaultContainer(this);
Database publicDB = skygear.getPublicDatabase();

Location office = new Location("gps");
office.setLatitude(22.336265);
office.setLongitude(114.147932);

// Bank.location is a geolocation field
// the distance can be accessed via 'distanceFromOffice'
Query bankQuery = new Query("Bank")
        .transientIncludeDistance("location", "distanceFromOffice", office);

publicDB.query(bankQuery, new RecordQueryResponseHandler() {
    @Override
    public void onQuerySuccess(Record[] records) {
        for (int idx = 0; idx < records.length; idx++) {
            Record perRecord = records[idx];
            double distance = (double) perRecord.getTransient().get("distance");

            Log.i("Skygear", "Distance: " + distance);
        }
    }

    @Override
    public void onQueryError(String reason) {
        // Error handling
    }
});
```
