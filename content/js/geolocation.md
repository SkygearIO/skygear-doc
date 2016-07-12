## Save a location on record

``` javascript
const Photo = skygear.Record.extend('photo');
let photo = new Photo({
  'subject': 'Hong Kong',
  'location': new skygear.Geolocation(22.39649, 114.1952103),
});
```

## Query records by distance

Get all photos taken within 400 meters of some location.

``` javascript
let reference = new skygear.Geolocation(22.283, 114.15);

let photoQuery = new skygear.Query(Photo);
photoQuery.distanceLessThan('location', reference, 400);

skygear.publicDB.query(photoQuery).then((photos) => {
  console.log(photos);
}, (error) => {
  console.error(error);
});
```

Geolocation query has `distanceGreaterThan` function as well.


## Sort records by distance

You can sort the result of the query by distance from a reference location:

``` javascript
photoQuery.addAscendingByDistance('location', reference);
photoQuery.addDescendingByDistance('location', reference);
```

## Retrieve record that contains distance to a reference point

You can utilize transient fields. Please read more about transient and eager
loading in the [Queries](/js/guide/query#relational-query) section.

``` javascript
photoQuery.transientIncludeDistance('location', 'distance', reference);
// 'location' is the key where Geolocation object is stored
// 'distance' is the key where calculated distance will be stored in $transient
// reference is the Geolocation object based on which distance is calculated
skygear.publicDB.query(photoQuery).then((photos) => {
  photos.forEach((photo) => {
    console.log(photo.$transient['distance']);
  });
}, (error) => {
  console.error(error);
});
```
