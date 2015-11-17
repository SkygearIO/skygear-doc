+++
date = "2015-11-17T11:28:18+08:00"
draft = true
title = "Configuration"

+++

This section covers how to configure skygear. While configuration is not
required to get Skygar up and running, you should configure it for production
deployment.

# How to configure Skygear?

The Skygear can be configured by modifying its configuration file, which
is often referred to as `development.ini`. You can also override the
default configuration file by using environment variables.

## development.ini

A copy of the configuration file, `development.ini` can be obtained from
the repository or from a running Docker container:

```
docker cp <app_container_name>:development.ini .
```

If you run Skygear using Docker Compose, change the `docker-compose.yml`
so that your changes are mounted into the container.

```
# docker-compose.yml
app:
  volumes:
  - ./development.ini:/go/src/app/development.ini
  command: skygear development.ini
```

If you run Skygear without Docker, you can specify the path from where the
configuration file is loaded.

```
$ skygear /path/to/development.ini
```

## Environment variable

You can override configuration in the default configuration file by
specifying environment variable. Some environment variables are described
below. Using environment variable is recommended because it is easier to be
deployed across different services, such as Elastic Beanstalk or Heroku.

If you run Skygear using Docker Compose:

```
# docker-compose.yml
app:
  environment:
    ENV_NAME: ENV_VALUE
```

If you run skygear with Docker but not using Compose:

```
$ docker run -e ENV_NAME=ENV_VALUE oursky/skygear
```

If you run Skygear without Docker:

```
$ skygear development.ini
```

# App Name and API Key

It is strongly recommended that you change the App Name and API Key.
The App Name should be a string of alphanumeric and underscore characters
that can identify your app among other apps that might reside on the same
system. The App Name also serves as a prefix to the database schema, which
isolates data from other potential apps.

The API Key serves as a shared secret between the Skygear backend and Skygear
client app. The Skygear client app must possess the key to make API request
to Skygear backend.

The App Name and API Key can be configured by modifying `development.ini` or
specifying environment variable in `docker-compose.yml`.

```
# docker-compose.yml
app:
  environment:
    APP_NAME: simpleapp
    API_KEY: thisissupersecret
```

```
# development.ini
[app]
name = simpleapp
api_key = thisissupersecret
```

# List of configuration settings

`[app]`

* `name` (env `APP_NAME`) - string, alphanumeric or underscore, name of the
  application
* `api-key` (env `API_KEY`) - string, shared secret between backend and client
  app


