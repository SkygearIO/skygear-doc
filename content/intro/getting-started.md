+++
date = "2015-09-18T16:59:25+08:00"
draft = true
title = "Getting Started"

+++

This guide will guide you through setting up Skygear for app developers.
At the end of the guide, you will have a working installation for Skygear
in your computer that is suitable for app development.

**NOT IMPLEMENTED** In a future version of this guide, we will have a
one stop script to fetch the needed files and automatically configure the
environment for app developer.

## Install Docker

The recommended way to run Skygear is to run it using Docker.

On Mac, you can download and install [Docker Toolbox](http://docs.docker.com/mac/step_one/),
which has everything you need to get started.

If you run Linux, you need to install Docker daemon and Docker Compose.

## Create Docker Machine

**Note** If you use a Mac and you have installed Docker Toolbox, you can run
Kitematic to have the Docker Machine automatically created and started for you.

Since Mac cannot run Docker natively, you need to start a Docker Machine. In
this guide, we will use VirtualBox to run your Docker Machine, which is included
in Docker Toolbox you installed in last section.

If you run Linux and you have Docker daemon installed, you can skip this
section.

To create a Docker Machine:

```
$ docker-machine create --driver virtualbox default
```

When the Docker Machine is created, you need to start the virtual machine. You
also need to do this if the Docker Machine is stopped.

```
$ docker-machine start default
$ eval `docker-machine env default`
```

The last line tells your Mac how to reach the Docker Machine. Alternatively,
you can open a Docker Command Line Terminal in Kitematic to have the environment
automatically configured for you.

## Install Skygear

On your Mac, create a directory called `skygear`. You can also call it with any
name.

```
$ mkdir skygear
$ cd skygear
```

Download the docker-compose.yml file and save it in the directory you have just created.

```
curl -O {{< ref "intro/index.md" >}}docker-compose.yml
```

Now is the time to fetch Skygear from Docker Hub.

```
$ docker-compose pull
```

**NOTE**: If Skygear is in private beta, you may not be able to download
the Docker image for Skygear. You should register an account on Docker Hub
and log in to Docker Hub by running `docker login`.

## Run Skygear

Start the database of the Skygear by running:

```shell
$ docker-compose start db
```

If this is the first time you start Skygear database, you should wait 10-15
seconds for the database initialization to complete.

When the database is up, run this command to start the Skygear daemon:

```
$ docker-compose start app
# Alternatively, you can run the following command to run Skygear in the
foreground:
$ docker-compose up app
```

What Docker does here is to read the `docker-compose.yml` in the directory
you created, fetch the Skygear images and other dependencies, and run the
server with Docker.

To verify that the Skygear server is running. You can create a HTTP request
using the cURL utility or by entering the server endpoint in a browser.

For Windows/Mac, Skygear is listening in the Docker Machine. You find out the IP
of the Docker Machine by running `docker-machine ip default`.

``` bash
$ docker-machine ip default
192.168.99.100
```

In this case, the endpoint of Skygear is `http://192.168.99.100:3000`

For Linux, and if you run Docker locally, the endpoint is `http://localhost:3000`

To test that Skygear is running, run:

```
$ curl http://192.168.99.100:3000/
{"result":{"status":"OK"}}
```

## Connect to Skygear with SDK

To call API on Skygear, you need two pieces of information: the API Endpoint
and the API key.

The API endpoint is the URL where Skygear is listening on.
The API key is configured in Skype configuration or `docker-compose.yml`.

In this guide, the API endpoint and key is `http://192.168.99.100:3000` and
`changeme` respectively.

Please see Configuring Skygear section for how to change these settings. It is
recommended that you change the API key to something else when you publish your app.

## Connect with cURL

Assuming the IP of the Docker Machine remain unchanged, you can
try creating a new user by sending a request to Skygear using cURL:

```
curl -XPOST http://192.168.99.100:3000/ -d '{"action": "auth:signup", "api_key":
"changeme"}'
```

### Connect by (iOS SDK / JS SDK)


``` javascript
import skygear from 'skygear';
skygear.endPoint = 'http://192.168.99.100:3000/';
skygear.configApiKey('changeme')
```

### Create your first user

``` javascript
const username = 'ben';
const email = 'user@myapp.com';
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

### What's next?

- [Interact with server using cli]({{< relref "cli/intro.md" >}})
- [Create your plugin]({{< relref "plugin/intro.md" >}})
