+++
date = "2015-09-25T16:05:13+08:00"
draft = true
title = "Database Schema"

+++

This section describes the database schema used by Ourd.

Tables in the database can be classified into Records Table and Reserved Table.
Name of reserved table is always prefixed with underscore (`_`).

## Records Table

For each record type stored in the database, a table is created with the same name as the record type. For example, if your record type is called `note`, there is a table called `note` in the database. Each row in the table correspond to a record.

For each record table there exists two types of columns, those that are reserved and those that are user-defined. Reserved columns contain metadata related to a record, such as record ID, record owner and creation time. Name of reserved columns are prefixed with underscore (`_`).

It is possible to manipulate data in records tables directly. Exercise cautions when modifying data in records tables.

Each records table contains the following reserved columns:

* `_id` (string) This column contains the unique identifier of the record. This is usually refer to as the Record ID.
* `_database_id` (string) This column contains identifier of the record database that this record is saved into. If this column is empty, the record is saved into the public database. Otherwise, it is saved into the private database with that identifier. Note: Although the private database identifier is currently the same as the User ID, this is an implementation and this is subject to change.
* `_owner_id` (string) This columns contains the unique identifier of the user who owns this record.
* `_access` (json) This column contains access control definition of the record.
* `_created_at` (datetime) This column contains the time that the record was created.
* `_created_by` (string) This column contains the identifier of the user who created this record.
* `_updated_at` (datetime) This column contains the time that the record was last updated.
* `_updated_by` (string) This column contains the identifier of the user who last updated this record.

User-defined columns contain data that is set by your app. The type of each user-defined column is determined at the time when data to a column is first written. During development mode, the schema of records table is migrated as new columns are found in record.

For example, consider a `note` record in JSON representation like this:

```
{
    "_id": "note/abcdef",
    "_database_id": "_public"
    "content": "Hello World",
    "noteOrder": 1
}
```

When saved to Ourd, the above record will be saved in a records table called `note` like this:

* _id (string): "abcdef"
* _database_id (string): null
* _owner_id (string): "CURRENT_USER"
* _access (json): null
* content (string): "Hello World"
* noteOrder (integer): 1

## Reserved Tables

Reserved tables stores all data that is not records. For example, user data and device data is not stored in a records table but in a reserved table. The schema of the reserved tables are fixed for each version, but you may need to migrate the schema of these tables when upgrading from an old version of Ourd to a new version. Do not manually change the schema of reserved tables.

It is possible to manipulate data in reserved tables directly, but this is not advised as doing so may make the data inconsistent. Exercise cautions when modifying data in reserved tables.

This section describes each reserved table.

### User

The `_user` reserved table stores data of each user in Ourd. This is the most important reserved tables as the majority part of the system depends on user data.

### Device

The `_device` reserved table stores data of each device, which is usually associated to user accounts. Device also store push notification registration information of the device.

### Subscription

The `_subscription` reserved table stores data for each subscription, which contains query for detecting changes over the record database.

### Follow

The `_follow` reserved table contains follow-type relationship data between users.

### Follow

The `_friend` reserved table contains friend-type relationship data between users.

### Asset

The `_asset` reserved table contains metadata about user-uploaded assets. The content of the asset is not stored in the database. 

