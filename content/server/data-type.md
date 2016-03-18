+++
date = "2015-11-27T12:42:54+08:00"
draft = true
title = "Data Type"

+++

Data values is transformed to JSON according to their type. Types undefined
in JSON will be serialized as JSON object with non-standard syntax.

|type|json type|example|
|---|---|---|
|string|string|`"data"`|
|number|number|`42`|
|boolean|boolean|`true`|
|array|array|`[42, 43, 44]`|
|dictionary|object|`{"state": "happy"}`|
|reference|object|`{"$type": "ref", "$id": "RECORD_ID", "$class": "food"}`|
|geolocation|object|`{"$type": "geo", "$lat": 40.689167, "$lng": -74.044444}`|
|datetime|object|`{"$type": "date", "$date": "2015-02-02T01:43:19+00:00"}`|
|asset|object|`{"$type": "asset", "$name": "asset-name", "$url": "..."}`|

## Non-standard Types

Non-standard types are specified as a JSON object with a special `$type` key
which signify that the object should be treated as a value of non-standard
type. More keys in the JSON object specifies the actual value.

*   `ref`: Value is a reference to another record.
    *   `$id`: Record ID of the record being referenced.
    *   `$class`: Class (Record Type) of the record being referenced.

*   `geo`: Value is a geographical coordinate.
    *   `$lat`: Latitude
    *   `$lng`: Longitude

*   `date`: Value is a date/time.
    *   `$date`: Date in ISO 8601 format.

*   `asset`: Value is a reference to a asset.
    *   `$name`: The unique name of the asset.
    *   `$url`: The URL to the asset. It is only available when the record is
        fetched.

## Sequeuen Types

* `seq`: Create a unique number field that has a strictly increasing
  integer default value. If a value `i` is assigned to a sequence field
  currently at `j`, the next default value of this field will be
  greater than `max(i, j)`.

Sequeuen type contain only schematic definition without any user data. It is
used to utilize the JIT schema migration of Skygear Server to create
or modify record field. To create a sequence field:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d @- http://localhost:3000/record/save <<EOF
{
    "action": "record:save",
    "access_token": "ACCESS_TOKEN",
    "database_id": "_private",
    "records": [{
        "_id": "note/id",
        "identifier": {
            "\$type": "seq"
        }
    }]
}
EOF
```
