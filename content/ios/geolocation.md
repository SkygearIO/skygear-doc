+++
date = "2015-09-23T17:27:05+08:00"
draft = true
title = "Geolocations"

+++

1. Supported by saving `CLLocation` in `SKYRecord`
2. Only latitude and longitude of CLLocation is recorded

## Saving a location on record

```obj-c
#import <CoreLocation/CoreLocation.h>

CLLocation *location = [[CLLocation alloc] initWithLatitude:22.283 longitude:114.15];
record[@"location"] = location;
```

See
[Location and Maps Programming Guide](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html)
for help on getting current location.

## Querying records by distance

Get all photos taken within 400 meters of some location.

```obj-c
CLLocation *distanceFromLoc = [[CLLocation alloc] initWithLatitude:22.283 longitude:114.15];
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"distanceToLocation:fromLocation:(location, %@) < %f", distanceFromLoc, 400.f];
SKYQuery *query = [SKYQuery queryWithRecordType:@"photo" predicate:predicate];

[privateDB performQuery:query completionHandler:^(NSArray *photos, NSError *error) {
    if (error) {
        NSLog(@"error querying photos: %@", error);
        return;
    }

    NSLog(@"got %@ photos taken within 400m of (22.283, 114.15)", @(photos.count));
}];
```

`distanceToLocation:fromLocation:` is a Ourd function which returns distance
between a location field in a record and a specific location.

## Sorting records by distance

Cont. from the example above.

```obj-c
query.sortDescriptors = @[[SKYLocationSortDescriptor locationSortDescriptorWithKey:@"location"
                                                                 relativeLocation:distanceToLoc
                                                                        ascending:YES]];
```

## Retrieving record location field distances relative to a point

Utilize transient fields.

```obj-c
NSExpression *distanceFunction = [NSExpression expressionWithFormat:@"distanceToLocation:fromLocation:(location, %@)", distanceToLoc];
query.transientIncludes = @{@"distance": distanceFunction};
```

Then we can access the distance in `completionHandler` like this:

```obj-c
[privateDB performQuery:query completionHandler:^(NSArray *photos, NSError *error) {
    if (error) {
        NSLog(@"error querying photos: %@", error);
        return;
    }

    for (SKYRecord *photo in photos) {
        NSNumber *distance = photo.transient[@"distance"];
        NSLog(@"Photo taken from distance = %@", distance);
    }
}];
```
