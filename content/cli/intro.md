+++
date = "2015-09-18T17:01:33+08:00"
draft = true
title = "Introduction to CLI"

+++

Ourd provides a default command-line interface `ourd-cli` to interact with
Ourd's handlers and postgres backend to facilitate application development
and some common administration works.

## Getting started

To install `ourd-cli`:

```bash
$ mkdir -P $GOPATH/src/github.com/oursky
$ cd $GOPATH/src/github.com/oursky
$ git clone http://github.com/oursky/ourd-cli
$ go get -u github.com/oursky/ourd-cli
```

Then configure the API key of your Ourd app so that it can call Ourd's
handler:

```bash
$ export ODCLI_API_KEY=YOUR_API_KEY
```

Let's verify it is working by getting a non-existed record:

```bash
$ ourd-cli record get note/id _id
Error: record not found
```

API key can also be overrided on a per command basis by supplying the
`api_key` flag:

```bash
$ ourd-cli --api_key ANOTHER_API_KEY record get note/id _id
Error: record not found
```

**DEV NOTE**: Global options like _API key_, _access token_ and _endpoint
address_ should be persisted on a project-by-project basis (e.g. on
`./.odcli/config`) s.t. cli user doesn't have to configure it on every new
shell.

## Accessing records

**NOT IMPLEMENTED**

You can fetch a record's content:

```bash
$ ourd-cli record export --pretty-print --asset false note/id
{
  "_id": "note/1",
  "_ownerID": "772adc86-9e0e-4f09-be74-965b0e7d3198",
  "_created_at": "2015-09-18T11:13:43.594437Z",
  "_created_by": "772adc86-9e0e-4f09-be74-965b0e7d3198",
  "_updated_at": "2015-09-18T11:42:21.387849Z",
  "_updated_by": "772adc86-9e0e-4f09-be74-965b0e7d3198",
  "_access": null,
  "content": "I am a note."
}
```

**DEV NOTE**: We really need to alias this command...

Or access its individual field very quickly:

```bash
$ ourd-cli record get note/1 content
I am a note.
```

If the field being accessed is an asset, we can instruct `ourd-cli` to
download it too (**NOT IMPLEMENTED**):

```bash
$ ourd-cli record get --asset note/1 attachment
ourd-cli: Downloaded 1 asset to ./attachment-ef678c.doc
```

## Modifying records

`ourd-cli provides several subcommands to modify existing records, but in
`order to write on any databases, we have to set an access token:

```bash
$ export ODCLI_ACCESS_TOKEN=A_USER_ACCESS_TOKEN
```

**DEV NOTE: We should support read / write by a master key or something that
**would allow us to bypass normal authentication.

We can then set a field on a record:

```bash
$ ourd-cli record set note/1 content="This note is a new...note."
$ ourd-cli record get note/1 content
This note is a new...note.
```

If you are going to modify several fields at once, try `record edit`. It will
bring up an interactive editing session with `$EDITOR`, and save the result
record when you end the session (**Not Implemented**):

```bash
EXAMLPE MISSING
```

## Working on private database

In case you want to work on a user's private database, all the `record`
subcommands accept a flag `--private, -p` which makes the command operates on
private database, like this:

```bash
$ ourd-cli record -p set note/1 content="It is a private note, obviously"
```

Of course you have to set the corresponding access token.

## Creating records

Use `record edit` to create a record.

## Deleting records

Use `record delete`

```bash
$ ourd-cli record delete note/1
$ ourd-cli record get note/1 _id
Error: record not found
```

## What now?

You now have a basic understanding of working with records with `ourd-cli`,
great work!

Want more? There are some advanced uses of `ourd-cli` intended for data
administration, in case you are interested...

* [Exporting and importing records]({{< relref "import-export.md" >}})
* [Altering record schema]({{< relref "schema.md" >}}) 
