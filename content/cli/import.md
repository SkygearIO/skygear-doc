+++
date = "2016-01-19T11:01:39+08:00"
draft = true
title = "Importing Records"

+++

## Description
`skycli record import` imports record data from JSON file.

When importing records, each record found in the file is saved to the
database. If the record to be saved already exists in the database, each
field in the record to be saved will overwrite the respective field in the
existing record.

Existing records and existing fields are not removed before the import
operation. Therefore, records and fields that exist in the database but
not in the file will remain in place.

## Synopsis

```bash
skycli record import [options] [<path> ...]
```

Records data stored in `<path>` will be imported.<br>
If `<path>` is a directory, all files in the directory with `.json` extension are imported.<br>
If `<path>` is not specified, skycli will import from stdin.

For the file format of imported files, see [File format](#File format)


Use `skycli record import --help` to view a list of available options.


## File Format <a name="File format"> </a>

Each JSON file/stdin follows the [concatenated JSON format](https://en.wikipedia.org/wiki/JSON_Streaming#Concatenated_JSON), where each record is represented by one JSON object.

### Example
records.json:
```javascript
{ "_id": "student/123", "name": "Alice", "age": 10}
{ "_id": "city/hongkong", "name": "Hong Kong", "image": "@file:images/hongkong.jpg" }
{
    "_id"       : "country/japan",
    "name"      : "Japan",
    "location"  : "@loc:3.14,2.15"
}
```

Each record is represented by a single JSON dictionary. The key `_id` is mandatory for every record, any other key that starts with underscore `_` is reserved by Skygear and should not be used. **

[TODO] What to do for invalid record data**

## Complex Value

Skycli supports a simpler version of complex values. For each value with the desired format, Skycli will prompt the user for confirmation. Unconverted complex value will be stored literally as its simpler form. Use the flag `--no-warn-complex` to skip the prompt and convert automatically.

Skycli currently support the following complex values:

```
location      @loc:<lat>,<lng>
reference     @ref:<referenced_id>
string        @str:<literal>
```

See [Protocal-DataType](https://github.com/oursky/skygear/wiki/Protocol-DataType) for more complex value supported by Skygear.

**[TODO] Need a full list of complex-simpler mapping**

## Handling assets

For the field with value `@file:<relative_path>`, the corresponding asset file will be uploaded, and the field value will be replaced as `@asset:<asset_id>`.

By default, the location of the asset file is assumed to be relative to the imported JSON file. If `--basedir` is set, Skycli will find the asset file relative to `--basedir`.


## Examples

### Stdin:
```bash
$ skycli record import
{ "_id": "student/123", "name": "Alice", "age": 10}
{ "_id": "city/hongkong", "name": "Hong Kong", "image": "@file:images/hongkong.jpg" }
{
    "_id"       : "country/japan",
    "name"      : "Japan",
    "location"  : "@loc:3.14,2.15"
}
Found complex value @loc:3.14,2.15. Convert? (y or n) y
```

### Files or Directories:
```bash
$ skycli record import city.json records --skip-asset --access_token="1234"
Found complex value @loc:3.14,2.15. Convert? (y or n) y
```
