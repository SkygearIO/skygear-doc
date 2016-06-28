Data values are transformed to JSON according to their types. Types undefined
in JSON will be serialized as a JSON object with non-standard syntaxes.

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
which signify that the object should be treated as a value of a non-standard
type. Example of keys in the JSON object that specifies the actual values are:

*   `ref`: value is a reference to another record
    *   `$id`: record ID of the record being referenced
    *   `$class`: class (Record Type) of the record being referenced

*   `geo`: value is a geographical coordinate
    *   `$lat`: latitude
    *   `$lng`: longitude

*   `date`: value is a date/time.
    *   `$date`: date in ISO 8601 format

*   `asset`: value is a reference to a asset
    *   `$name`: the unique name of the asset
    *   `$url`: the URL to the asset. It is only available when the record is
        fetched

## Sequence Types

* `seq`: create a unique number field that has a strictly increasing
  integer default value. If a value `i` is assigned to a sequence field
  currently at `j`, the next default value of this field will be
  greater than `max(i, j)`.

Sequence types contain only schematic definition without any user data. It is
used to utilize the JIT schema migration of Skygear Server to create
or modify record fields. To create a sequence field:

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
