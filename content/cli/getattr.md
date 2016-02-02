+++
date = "2016-01-26T20:33:00+08:00"
draft = true
title = "Getting attribute of a record"
+++

## Description
`skycli record getattr` gets the value of an attribute of a record.

The value of the attribute will be printed to stdout.

If the attribute is `@asset:<assetID>`, the corresponding
asset will be downloaded. The file will be stored at the working directory,
unless `--basedir` is specified.

## Synopsis

```bash
skycli record getattr [options] <record_id> <key>
```

The attribute `<key>` of the record with ID `<record_id>` will be fetched from Skygear.

Use `skycli record getattr --help` to view a list of available options.

## Examples

### Normal value:
```bash
$ skycli record getattr student/123 name
Alice
```

### Asset:
```bash
$ skycli record getattr city/hongkong image --basedir=file
@file:someassetid-hongkong.jpg
$ ls file
someassetid-hongkong.jpg
```
