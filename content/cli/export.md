+++
date = "2016-01-26T22:18:00+08:00"
draft = true
title = "Querying Records"
+++

## Description
`skycli record query` query records from Skygear.

If `<record_type>` is specified, all records with that record type will be fetched. Otherwise, all records in Skygear will be fetched.

The result will be printed to stdout. If `-o` is specified, then the result will be stored with the given filename.

Each record will be printed as a JSON object delimited by a newline character. If `--pretty-print` is specified, then each record will be printed with proper indentation, otherwise each record will be printed in a single line.

For downloading assets, please see `skycli record get`

## Synopsis

```bash
skycli record query [options] <record_type>
```

Use `skycli record query --help` to view a list of available options.

## Examples

### Record ID:
```bash
$ skycli record query city --pretty-print
{
    "_id": "city/hongkong",
    "name": "hongkong"
}
{
    "_id": "city/newyork",
    "country": "USA"
}
$ skycli record query city student
{ "_id": "city/hongkong", "name": "hongkong" }
{ "_id": "city/newyork", "country": "USA" }
{ "_id": "student/123", "name": "Alice", "age": 10}
```

### Record Type:
```bash
$ skycli record query country -o country.json --basedir=image
$ cat country.json
{"_id": "country/japan", "image":"@file:image/someassetid-japan.jpg"}
{"_id": "country/uk", "name": "United Kingdom"}
$ ls image
someassetid-japan.jpg
```
