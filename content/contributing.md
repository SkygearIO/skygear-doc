+++
date = "2015-11-24T18:14:37+08:00"
draft = true
title = "How to contribute"

+++

# Obtaining the source

Skygear is written in Go. To obtain Skygear source files, you can clone the
the [GitHub repository](https://github.com/oursky/skygear).

```sh
$ git clone git@github.com:oursky/skygear.git
Cloning into 'skygear'...
remote: Counting objects: 2724, done.
remote: Compressing objects: 100% (17/17), done.
remote: Total 2724 (delta 5), reused 0 (delta 0), pack-reused 2707
Receiving objects: 100% (2724/2724), 650.80 KiB | 94.00 KiB/s, done.
Resolving deltas: 100% (1797/1797), done.
Checking connectivity... done.
$ cd skygear
```

You can choose whether to develop Skygear with Docker or not. You are not required
to install Go if you are developing Skygear with Docker.

## Develop with Docker

You need development-specific configuration for Docker Compose. Create
a file named `docker-compose.override.yml` in the same directory where
`docker-compose.yml` can be found in the repository.

```yaml
# docker-compose.override.yml
app:
  build: .
  dockerfile: Dockerfile-development
  volumes:
  - .:/go/src/app
  command: sh -c "go build && ./app development.ini"
```

To start the Skygear daemon,

```sh
# start the database first to keep it running
$ docker-compose start db

# run Skygear daemon
$ docker-compose up app
```

If this is the first time you run the “app”, Docker Compose will build the
Docker development image.

Each time you run `docker-compose up app`, the Skygear daemon is compiled
from the source files in your project directory.

### Running test case

```sh
# initialize skygear database for testing
$ docker-compose run db psql -h db -c 'CREATE DATABASE skygear_test;' -U postgres
$ docker-compose run db psql -h db -c 'CREATE EXTENSION postgis;' -U postgres -d skygear_test

# run test cases
$ docker-compose run --rm app go test ./...
```

### Running other commands with Docker

```sh
$ docker-compose run --rm --service-ports app <command>
```

## Develop without Docker

**TODO**

