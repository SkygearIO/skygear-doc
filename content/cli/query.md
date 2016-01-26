+++
date = "2016-01-26T22:18:00+08:00"
draft = true
title = "Fetching records by record type"
+++

## Description
`skycli record query` fetches all records with the given record type.

The result will be printed to stdout. If `-o` is specified, then the result will be stored with the given filename.

Each record will be printed as a JSON object delimited by a newline character. If `--pretty-print` is specified, then each record will be printed with proper indentation, otherwise each record will be printed in a single line.

For downloading assets, please see `skycli record export`

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
