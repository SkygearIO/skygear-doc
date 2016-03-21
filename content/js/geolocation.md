+++
date = "2015-10-23T16:37:10+08:00"
draft = true
title = "geolocation"

+++

## Saving a location on record

```js
let photo = new Photo({
    'subject': 'Hong Kong',
    'geo': skygear.Geolocation(22.283, 114.15),
});
```


## Querying records by distance

Get all photos taken within 400 meters of some location.

```javascript
let reference = skygear.Geolocation(22.283, 114.15);

let photoQuery = Query(Photo);
photoQuery.distanceLessThan('location', reference, 400);
skygear.publicDB.query(photoQuery).then((photos) => {
  console.log('Found number of photos: ' + photos.length);
}, (error) => {
  console.log('error: ', error);
});
```

You can also use `distanceGreaterThan` to query photos outside 400 meters of
a location.


## Sorting records by distance

You can sort the result of the query by location. To query by ascending
distance (nearest points returned first):

```js
photoQuery.addAscendingByDistance('location', reference);
```

To query by descending distance:

```js
photoQuery.addDescendingByDistance('location', reference);
```

**DISCUSSION**: The Skygear Server API supports sorting by an expression, but the
only supported expression is to sort by location. To make things simpler,
the above convenient functions are preferred.

## Retrieving record location field distances relative to a point

Utilize transient fields.

```js
photoQuery.transientIncludeDistance("location", "my_distance", reference);
```

Then we can access the distance through the transient field `my_distance`:

```js
skygear.publicDB.query(photoQuery).then((photos) => {
  for (photo in photos) {
    console.log("distance: " + photo.transient['my_distance']);
  }
}, (error) => {
  console.log('error: ', error);
});
```
