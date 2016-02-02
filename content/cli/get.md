+++
date = "2016-01-25T17:00:00+08:00"
draft = true
title = "Getting Records"
+++

## Description
`skycli record get` exports record data from Skygear.

The result will be printed to stdout. If `-o` is specified, then the result will be stored with the given filename.

For each record with field containing `@asset:<assetID>`, the corresponding
asset will be downloaded. The file will be stored at the working directory,
unless `--basedir` is specified.

## Synopsis

```bash
skycli record get [options] <record_id> [<record_id> ...]
```

Record with ID `<record_id>` will be fetched from Skygear.

Use `skycli record get --help` to view a list of available options.

## Examples

### Stdin:
```bash
$ skycli record get city/hongkong student/123
{ "_id": "city/hongkong", "name": "Hong Kong" }
{ "_id": "student/123", "name": "Alice", "age": 10}
```

### Files and Base Directories:
```bash
$ skycli record get -o out.json --basedir=file --pretty-print
$ ls file
someassetid-hongkong.jpg
$ cat out.json
{ 
    "_id": "city/hongkong",
    "name": "Hong Kong",
    "image": "@file:tmp/someassetid-hongkong.jpg" 
}
```
