+++
date = "2016-02-16T11:10:04+08:00"
draft = true
title = "Getting Started"

+++

This guide will guide you through setting up Skygear for app developers.
At the end of the guide, you will have a working installation for Skygear
in your computer that is suitable for app development.

### How to setup Skygear for development in Mac

First, install homebrew. http://brew.sh

Skygear require `golang`, `python3` and `PostgreSQL` to run, you may install
them by using homebrew as follows:

``` bash
$ brew install go
$ brew install python3
$ brew install postgresql
```

After the dependencies are installed, you can install Skygear into your system
by following these commands:

``` bash
$ go get github.com/oursky/skygear
$ go install github.com/oursky/skygear
$ pip3 install skygear
```

## Start working with skygear

Create a directory called `myapp`. You can also call it by
any name.

```
$ mkdir myapp
$ cd myapp
```

Download the development config file and save it in the directory you have
just created.

```
$ curl -O {{< ref "index.md" >}}intro/development.ini
```

You should modify the app `name` and `api-key` with your app name
and a generated random string. This guide assumes you have set the API Key
to `changeme`. However, you should generate your own API Key.

Run Skygear using following command:

```
$ skygear development.ini
```

To test that Skygear is running, run:

```
$ curl http://127.0.0.1:3000/
{"result":{"status":"OK"}}
```

## Connect with cURL

You can try creating a new user by sending a request to Skygear using cURL:

```
curl -XPOST http://127.0.0.1:3000/ -d '{"action": "auth:signup", "api_key": "changeme"}'
```

### Connect by (iOS SDK / JS SDK)

``` javascript
import skygear from 'skygear';
skygear.endPoint = 'http://127.0.0.1:3000/';
skygear.configApiKey('changeme')
```

### Create your first user

``` javascript
const username = 'user';
const email = 'user@example.com';
const password = 'truelyrandom';
skygear.signup(username, email, password).then(function() {
  console.log('Signup ok, got token', skygear.currentAccessToken);
}, function(error) {
  console.log('Signup failed with error', error);
});
```

### Create your first record

``` javascript
const Note = skygear.Record.extend('note');
const note = new Note({
  'content': 'Hello World.'
});
skygear.publicDB.save(note).then(function (record) {
  console.log('Record saved', record);
}, function (error) {
  console.log('Saving failed', error);
});
```

You may use iOS SDK, we provide a simple example here [Simple app to get started in iOS]({{< relref "ios/first-app.md" >}})

## Setting up plugin

Create an `plugin.py` as follow

```python
import skygear

@skygear.op("chima:echo")
def echo():
    return {"message": "Hello World"}
```

To verify the plugin code can load into skygear, run this:

```shell
$ py-skygear plugin.py --subprocess init
{"op": ["chima:hello"], "provider": [], "hook": [], "timer": [], "handler": {}}
```

Add plugin configuration to development.ini

```
[plugin "first-plugin"]
transport = exec
args = plugin.py
```

Restart skygear, verify the skygear load plugin by following cURL

```
curl -XPOST http://127.0.0.1:3000/ -d '{"api_key": "secret","action": "chima:hello"}'
```

## Upgrade of `skygear` and `py-skyegar`

`go install -u github.com/oursky/skygear`
`pip install -U skygear`

## What's next?

- [Interact with server using cli]({{< relref "cli/intro.md" >}})
- [Create your plugin]({{< relref "plugin/intro.md" >}})

