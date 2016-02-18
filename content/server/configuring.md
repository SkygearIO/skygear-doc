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

### Configurations

#### S3 Asset Store

Copy the following section into your `development.ini` and replace
the `asset-store` section if the section is in the config file already.
Fill out the AWS access key, secret key, region and bucket.

```ini
# development.ini
[asset-store]
implementation = s3
path = data/asset
access-key = AKXXXXXXXXXXXXXXXXXX
secret-key = 3XXx/X/XxxXXXXxXxXxxXXXXxx00x0XXxXxx0xxX
region = us-east-1
bucket = thebucketname
public = false¬
```

If the S3 is public readable, you can set `public` to `true` such that
access signature can be omitted.

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


# Logging

Logging let you keep track of what is happening in Skygear. Information
from log are very important for bugs and performance diagnosis.

Level of logging: `debug`, `info`, `warn`, `error`, `fatal`, `panic`

To change the Skygear logging level, modify the `.ini` `[log]` section.

```
[log]
level = warn
```

Skygear support [Sentry](https://getsentry.com/) as logging backend, to
enable logging to Sentry, just add dsn config to the `.ini` as follows.

```
[log-hook]
sentry-dsn = http://abcd:efgh@sentry.example.com/sentry/project1
sentry-level = warn
```

# List of configuration settings

`[app]`

* `name` (env `APP_NAME`) - string, alphanumeric or underscore, name of the
  application
* `api-key` (env `API_KEY`) - string, shared secret between backend and client
  app
* `master-key` (env `MASTER_KEY`) - string, for potentially
  destructive operation and request options restricted to system administrator
* `cors-host` (env `CORS_HOST`) - string, hostname for cross origin access control


