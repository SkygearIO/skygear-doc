This document describe how to query recrod based on user-creator relation.

## Predicat format

``` json
[
  "func",
  "userRelation",
  {"$type": "keypath", "$val": "_owner"},
  {"$type": "relation", "$name": "_friend"}
]
```

Record owned by following user.

Note: `follow` x `inward` = `following`
Note: `follow` x `outward` = `follower`

``` json
[
  "func",
  "userRelation",
  {"$type": "keypath", "$val": "_owner"},
  {"$type": "relation", "$name": "_follow", "$direction": "inward"}
]
```


## API

An example of querying a note owned by friend or user I follow


```bash
curl -XPOST -H "Content-Type: application/json" \
-d @- http://localhost:3000/record/query <<EOF
{
  "action": "record:query",
  "access_token": "ACCESS_TOKEN",
  "record_type": "note",
  "predicate": [
    "or",
    [
      "func",
      "userRelation",
      {"\$type": "keypath", "\$val": "_owner"},
      {"\$type": "relation", "\$name": "_friend", "\$direction": "mutual"}
    ],
    [
      "func",
      "userRelation",
      {"\$type": "keypath", "\$val": "_owner"},
      {"\$type": "relation", "\$name": "_follow", "\$direction": "outward"}
    ]
  ],
  "include": {
    "owner": {"\$type": "keypath", "\$val": "_owner"}
  },
  "sort": []
}
EOF
```

The format design will allow query of any normal attribute that referencing a
user.

Following is an example of `query note that assigned to a person I manage`

```bash
curl -XPOST -H "Content-Type: application/json" \
-d @- http://localhost:3000/record/query <<EOF
{
  "action": "record:query",
  "access_token": "ACCESS_TOKEN",
  "record_type": "note",
  "predicate": [
    "func",
    "userRelation",
    {"\$type": "keypath", "\$val": "assignee"},
    {"\$type": "relation", "\$name": "manage", "\$direction": "outward"}
  ]
}
EOF
```
