+++
date = "2016-01-26T20:39:00+08:00"
draft = true
title = "Editing a record"
+++

## Description
`skycli record edit` fetches a record from Skygear, ask user to edit it, and reupload the record.

The record will be fetched, then an editor program will be opened including the record. After the editor is closed, the modified record will be uploaded.

If only the record type is specified, a new record with new ID will be created.

Note that removing an attribute in the editor WILL NOT remove the corresponding attribute in Skygear. The attribute will remain unchanged with the original value.

For uploading and downloading assets, please see `skycli record import` and `skycli record export`

## Synopsis

```bash
skycli record edit [options] (<record_id>|<record_type>)
```

Use `skycli record edit --help` to view a list of available options.

## Examples

### Record ID:
```bash
$ skycli record edit student/123
<<Vim>>
{
    "_id": "student/123",
    "name": "Alice"
}
```

### Record Type:
```bash
$ skycli record edit student
<<Vim>>
{
    "_id": "city/0123456",
}
```
