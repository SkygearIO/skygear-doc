`schema` subcommands help to add, rename and delete record fields -- the kind
of schema operations that cannot be achieved via regular record handlers.

`schema` subcommands are provided as a convenient tool for simple schema
operations and do not intended to be a full-featured database migration tool.
If you need more sophisticated amendments on the database, remember you have
full access to the underlying postgres db, you should feel free to write db
script or use whatever tools like `psql` to fulfill your needs. Refer to
database structure guide for more information on our internal table
definitions.

Managing record schema requires Skygear Server to be placed in dev mode
or using a master key.

# Fetch schema

## Description

`skycli schema fetch` fetches the record schema from the server.

## Synopsis

```bash
$ skycli schema fetch
```

## Examples

```bash
$ skycli schema fetch
{
  "user": {
    "fields": [
      { "name": "firstname", "type": "string" }
    ]
  }
}
```

# Add new column

## Description

`skycli schema add` adds a new column to a record type.

## Synopsis

```bash
$ skycli schema add <record_type> <column_name> <column_def>
```

`column_def` means the type of field you wanted to create. The permitted
values are:

* `string`
* `number`
* `boolean`
* `json`
* `location`
* `datetime`
* `asset`
* `ref(record_type)`, where `record_type` is an existing record type

## Examples

```bash
$ skycli schema add user lastname string
$ skycli schema fetch
{
  "user": {
    "fields": [
      { "name": "firstname", "type": "string" },
      { "name": "lastname", "type": "string" }
    ]
  }
}
```

# Rename existing column

## Description

`skycli schema move` renames an existing column to another name.

## Synopsis

```bash
$ skycli schema move <record_type> <column_name> <new_column_name>
```

## Examples

```bash
$ skycli schema move user lastname othername
$ skycli schema fetch
{
  "user": {
    "fields": [
      { "name": "firstname", "type": "string" },
      { "name": "othername", "type": "string" }
    ]
  }
}
```

# Remove existing column

## Description

`skycli schema remove` removes an existing column.

## Synopsis

```bash
$ skycli schema remove <record_type> <column_name>
```

## Examples

```bash
$ skycli schema remove user othername
$ skycli schema fetch
{
  "user": {
    "fields": [
      { "name": "firstname", "type": "string" }
    ]
  }
}
```
