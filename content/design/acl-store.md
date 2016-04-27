ACL is formatted in JSON and stored in `_access` field of records

## Example on relation base
``` json
[
  {"level": "write", "relation": "friend"},
  {"level": "read", "user_id": "rickmak"},
  {"level": "write", "user_id": "limouren"}
]
```

## Example on role base
``` json
[
  {"level": "write", "role": "admin"},
  {"level": "read", "role": "staff"}
]
```

## Example on user specific
``` json
[
  {"level": "write", "user_id": "rickmak"},
  {"level": "read", "user_id": "limouren"}
]
```

## Example on public access
``` json
[
  {"level": "read", "public": true}
]
```

## Example JSON

- Record accessible by user with id 1234:
`_access @> '[{"user_id":"1234"}]'`

- Record accessible by admin:
`_access @> '[{"role":"admin"}]'`

- Record writable by admin:
`_access @> '[{"level":"write","role":"admin"}]'`

- Record writable by public:
`_access @> '[{"level":"write","public":true}]'`

- admin writable OR staff readable:
```
_access @> '[{"level":"write","role":"admin"}]' or
_access @> '[{"role":"staff"}]'
```

refs: [JSON Functions and Operators in PostgreSQL](http://www.postgresql.org/docs/9.4/static/functions-json.html)

## Example query

Assume current user id is `1234`.

Querying note by my friend that I am readable:

``` sql
SELECT *
FROM note
WHERE
    _owner_id = _friend.left_id
    AND _frient.right_id = 1234
    AND _access @> '[{"relation":"friend"}]';
```

Querying note I am readable:

``` sql
SELECT *
FROM note
LEFT JOIN ... ON ...
WHERE
    note._owner_id = 1234 OR (
        note._owner_id = _friend.left_id
        AND _frient.right_id = 1234
        AND _access @> '[{"relation":"friend"}]'
    ) OR (
        note._owner_id = _follower.left_id
        AND _follower.right_id = 1234
        AND _access @> '[{"relation":"follow"}]'
    );
```
