+++
date = "2015-10-20T17:44:23+08:00"
draft = true
title = "ACL Store"

+++

# Example on relation base

``` json
[
  {"level": "write", "relation": "friend"},
  {"level": "read", "user_id": "rickmak"},
  {"level": "write", "user_id": "limouren"}
]
```

Example query

assume current user： 10. Querying note by my friend that I am readable.

``` sql
SELECT *
FROM note
WHERE
    _owner_id = _friend.left_id
    AND _frient.right_id = 10
    AND _access @> '[{"relation":"friend"}]';
```

Querying note I am readable

``` sql
SELECT *
FROM note
LEFT JOIN ... ON ...
WHERE
    note._owner_id = 10 OR (
        note._owner_id = _friend.left_id
        AND _frient.right_id = 10
        AND _access @> '[{"relation":"friend"}]'
    ) OR (
        note._owner_id = _follower.left_id
        AND _follower.right_id = 10
        AND _access @> '[{"relation":"follow"}]'
    );
```

As per previous discussion, a effecient query will require a box/newsfeed caching table.

# Example on role base

``` json
[
  {"level": "write", "role": "admin"},
  {"level": "write", "role": "staff"},
  {"level": "write", "user_id": "rickmak"},
  {"level": "read", "user_id": "limouren"}
]
```

Example json query 

Record accessible by rickmak
`_access @> '[{"user_id":"rickmak"}]'`

Record accessible by admin
`_access @> '[{"role":"admin"}]'`

Record writable by admin
`_access @> '[{"level":"write","role":"admin"}]'`

rickmak writable OR admin readable
`_access @> '[{"level":"write","role":"rickmak"}]' or _access @> '[{"role":"admin"}]'`

refs: JSON Functions and Operators http://www.postgresql.org/docs/9.4/static/functions-json.html
