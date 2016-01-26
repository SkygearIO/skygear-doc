+++
date = "2016-01-25T17:00:00+08:00"
draft = true
title = "Exporting Records"
+++

## Description
`skycli record export` exports record data from Skygear.

The result will be printed to stdout. If `-o` is specified, then the result will be stored with the given filename.

For each record with field containing `@asset:<assetID>`, the corresponding
asset will be downloaded. The file will be stored at the working directory,
unless `--basedir` is specified.

## Synopsis

```bash
skycli record export [options] <record_id> [<record_id> ...]
```

Record with ID `<record_id>` will be fetched from Skygear.

Use `skycli record export --help` to view a list of available options.

## Examples

### Stdin:
```bash
$ skycli record export city/hongkong
{ "_id": "city/hongkong", "name": "Hong Kong" }
```

### Files and Base Directories:
```bash
$ skycli record export -o out.json --basedir=file --pretty-print
$ ls file
someassetid-hongkong.jpg
$ cat out.json
{ 
    "_id": "city/hongkong",
    "name": "Hong Kong",
    "image": "@file:tmp/someassetid-hongkong.jpg" 
}
```
