+++
date = "2015-11-12T11:58:09+08:00"
draft = true
title = "Query records by relations"

+++

This document describe how to query recrod based on user-creator relation.

## Predicat format

``` json
[
  "func",
  "userRelation",
  {"$type": "keypath", "$val": "_owner"},
  {"$type": "relation", "$type": "friend"}
]
```

Record owned by following user.

Note: `follow` x `active` = `following`
Note: `follow` x `passive` = `follower`

``` json
[
  "func",
  "userRelation",
  {"$type": "keypath", "$val": "_owner"},
  {"$type": "relation", "$type": "follow", "$direction": "active"}
]
```


## API

An example of querying a note owned by friend or following


``` json
{
  "action": "record:query",
  "access_token": "ACCES_TOEKEN",
  "record_type": "note",
  "predicate": [
    "or",
    [
      "func",
      "userRelation",
      {"$type": "keypath", "$val": "_owner"},
      {"$type": "relation", "$type": "friend"}
    ],
    [
      "func",
      "userRelation",
      {"$type": "keypath", "$val": "_owner"},
      {"$type": "relation", "$type": "follow", "$direction": "active"}
    ]
  ],
  "include": {
    "owner": {"$type": "keypath", "$val": "_owner"}
  }
  "sort": []
}
```

The format design will allow query of any normal attribute that referencing a
user.

Following is an example of `query note that assigned to a person I manage`

``` json
{
  "action": "record:query",
  "access_token": "ACCES_TOEKEN",
  "record_type": "note",
  "predicate": [
    "func",
    "userRelation",
    {"$type": "keypath", "$val": "assignee"},
    {"$type": "relation", "$type": "manage", "$direction": "active"}
  ]
}
```
