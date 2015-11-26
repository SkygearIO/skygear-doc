+++
date = "2015-11-24T18:14:37+08:00"
draft = true
title = "How to contribute"

+++

# How to contribute?

**TODO** Where to file issue? How to propose new features? Where to ask
questions? What are the style guideline / coding standard.

We recommend contributors to develop Skygear in Docker image provided,
please follows the instruction below to set up your development environment.

# Install Docker

Please follow the Getting Started guide to set up the Docker environment.
You do not need to install Go to develop Skygear in docker environment.

# Obtaining the source

Clone the [GitHub repository](https://github.com/oursky/skygear).

```sh
$ git clone git@github.com:oursky/skygear.git
$ cd skygear
```

# Config Docker for Skygear Development

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

# Running test case

```sh
# initialize skygear database for testing
$ docker-compose run db psql -h db -c 'CREATE DATABASE skygear_test;' -U postgres
$ docker-compose run db psql -h db -c 'CREATE EXTENSION postgis;' -U postgres -d skygear_test

# run test cases
$ docker-compose run --rm app go test ./...
```

# Running other commands with Docker

```sh
$ docker-compose run --rm --service-ports app <command>
```

