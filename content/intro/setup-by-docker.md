+++
date = "2015-09-18T16:59:33+08:00"
draft = true
title = "Setup by Docker"

+++

This guide will show you how to run Ourd on docker for development and verify that it is working.

## Getting Docker

### Mac OS X

Please consult the official guide from docker to install docker toolbox: http://docs.docker.com/mac/step_one/

Ourd would need `docker` and `docker-compose`. Let's see if they are working:

```bash
$ docker run hello-world

Hello from Docker.
# more message skipped

$ docker-compose --version
docker-compose version: 1.4.0
```

If similiar message is seen, then you are good to go.

## Running Ourd

Ourd has an official [Docker Hub repository](https://hub.docker.com/r/oursky/ourd/). It saves you the effort to build docker images yourself. For development, we have a pre-configured `docker-compose` file to start with.

Now to clone and set up Ourd from scratch:

```bash
$ git clone git@github.com:oursky/ourd.git
Cloning into 'ourd'...
remote: Counting objects: 2724, done.
remote: Compressing objects: 100% (17/17), done.
remote: Total 2724 (delta 5), reused 0 (delta 0), pack-reused 2707
Receiving objects: 100% (2724/2724), 650.80 KiB | 94.00 KiB/s, done.
Resolving deltas: 100% (1797/1797), done.
Checking connectivity... done.
$ cd ourd
$ cp docker-compose.yml.sample docker-compose.yml
$ docker-compose up
Creating ourd_db_1...
Creating ourd_ourd_1...
Attaching to ourd_db_1, ourd_ourd_1
# more db initialization skipped
```

If it is the first time that you run `docker-compose up` on this directory, there will be lots of logging describing what is going on. Stay calm and wait for the log to stabilize.

Now let's try a simple cURL to see whether the ourd server is up and running. On Mac OS X, you will have to determine the docker machine's ip first:

```bash
$ docker-machine ip default
192.168.99.100
```

Then fire a request:

```bash
$ curl http://192.168.99.100:3000/
{"result":{"status":"OK"}}
```

Good! It's up and running.

Now let's try signing up an anonymous user to see if the db is working fine:

```bash
$ curl -XPOST http://192.168.99.100:3000/ -d '{"action": "auth:signup"}'
{"result":{"user_id":"e50bef5b-aa08-41ab-b0c6-d216ee227c49","access_token":"9aeca7b8-c4ae-4948-b5e6-cc2c80940cf1"}}
```

Great!

## What Now?

Explore Ourd's SDKs to start developing :D

* [Objective C SDK](https://github.com/oursky/ODKit)
* [Javascript SDK](https://github.com/oursky/jsourd)
