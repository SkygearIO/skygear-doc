Skygear provides a default command-line interface `skycli` to interact with
Skygear's handlers and PostgreSQL backend to facilitate application development
and some common administration works.

## Getting started

To install `skycli`:

```bash
$ mkdir -p $GOPATH/src/github.com/SkygearIO
$ cd $GOPATH/src/github.com/SkygearIO
$ git clone https://github.com/SkygearIO/skycli
$ go get -u github.com/SkygearIO/skycli
```

Then configure the API key of your Skygear app so that it can call Skygear's
handler:

```bash
$ export SKYCLI_API_KEY=YOUR_API_KEY
```

Let's verify it is working by getting a non-existed record:

```bash
$ skycli record get note/id _id
Error: record not found
```

API key can also be overridden on a per command basis by supplying the
`api_key` flag:

```bash
$ skycli --api_key ANOTHER_API_KEY record get note/id _id
Error: record not found
```

**IMPORTANT NOTE**: Global options like _API key_, _access token_ and _endpoint
address_ should be persisted on a project-by-project basis (e.g. on
`./.skycli/config`) so that CLI user doesn't have to configure it on every new
shell.

## What now?

You now have a basic understanding of working with records with `skycli`,
great work!

To learn more about the skycli commands, check out the generated
[usage](usage) or [generated
docs](https://github.com/SkygearIO/skycli/tree/master/docs/usage).
