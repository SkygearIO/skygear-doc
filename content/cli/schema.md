+++
date = "2015-09-18T17:01:45+08:00"
draft = true
title = "Managing Record Schema"

+++

Whole document **NOT IMPLEMENTED**

`schema` subcommands help to add, rename and delete record fields -- the kind
of schema operations that cannot be achieved via regular record handlers.

All `schema` subcommands deal with postgres backend directly, as such you
should have already configured information necessary to connect to the
backend.

*SHOW THEM HOW TO CONFIGURE*

`schema` subcommands are provided as a convenient tool for simple schema
operations and do not intended to be a full-featured database migration tool.
If you need more sophisticated amendments on the database, remember you have
full access to the underlying postgres db, you should feel free to write db
script or use whatever tools like `psql` to fulfill your needs. Refer to
database structure guide for more information on our internal table
definitions.

## Renaming an existing field

```bash
$ skycli schema alter <record_type> mv <existing_field> <new_field>
```

This command renames an existing field of `record_type`.

## Removing an existing field

```bash
$ skycli schema alter <record_type> rm <existing_field>
```

This command removes an existing field of `record_type`.

## Adding a new field

**NOTE: To add a field, you might simply save a record with that specific
field. Our just-in-time schema migration would take care of the rest.
`schema add` exists solely for command suite completeness.

```bash
$ skycli schema alter <record_type> add <existing_field> <field_def>
```

`field_def` means the type of field you wanted to create. The permitted
values are:

* `string`
* `number`
* `boolean`
* `json`
* `location`
* `datetime`
* `asset`
* `ref(record_type)`, where `record_type` is an existing record type
