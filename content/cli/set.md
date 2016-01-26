+++
date = "2016-01-26T20:24:00+08:00"
draft = true
title = "Setting attributes on a record"
+++

## Description
`skycli record set` set attributes of a record.

For each key-value pair in the command, the corresponding attributes of the record
will be replaced by the provided value. The other existing attributes of the record
will remain unchanged.

If the required record does not exist, it will be created with given attributes.

## Synopsis

```bash
skycli record set [options] <record_id> <key>=<value> [<key>=<value> ...]
```

For record with ID `<record_id>`, its attribute `<key>` will be replaced by `<value>`.

Use `skycli record set --help` to view a list of available options.

## Examples

```bash
$ skycli record set city/hongkong name="Hong Kong"
```
