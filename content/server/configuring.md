This section covers how to configure skygear. While configuration is not
required to get Skygear up and running, you should configure it for production
deployment.

## How to configure Skygear?

The Skygear is configured by environment variable.

If you run Skygear using Docker Compose, change the `docker-compose.yml`
so that your changes are mounted into the container.

```
## docker-compose.yml
app:
  command: skygear-server
  environment:
    APP_NAME: yourapp
    API_KEY: changeme
    MASTER_KEY: thisissupersecret
    DATABASE_URL: postgresql://postgres:@db/postgres?sslmode=disable
```

If you run skygear with Docker but not using Compose:

```
$ docker run -e ENV_NAME=ENV_VALUE skygeario/skygear-server
```

If you run Skygear without Docker, Skygear support the .env for easy
development. Checkout the example config:
https://github.com/SkygearIO/skygear-server/blob/master/.env.example

For more information about how `.env` files works, please read
https://github.com/joho/godotenv 

```
$ export API_KEY=changeme
$ export MASTER_KEY=thisissupersecret // Or you can put tham in .env
$ skygear-server
```

#### Configurations

##### S3 Asset Store

Skygear support s3 as storage backend.
Fill out the AWS access key, secret key, region and bucket by the following
environment variable.

```
$ export ASSET_STORE=s3
$ export ASSET_STORE_PUBLIC=NO
$ export ASSET_STORE_ACCESS_KEY=AKXXXXXXXXXXXXXXXXXX
$ export ASSET_STORE_SECRET_KEY=3XXx/X/XxxXXXXxXxXxxXXXXxx00x0XXxXxx0xxX
$ export ASSET_STORE_REGION=us-east-1
$ export ASSET_STORE_BUCKET=thebucketname
```

If the S3 is public readable, you can set `ASSET_STORE_PUBLIC` to `YES` such
that access signature can be omitted.

## App Name and API Key

It is strongly recommended that you change the App Name and API Key.
The App Name should be a string of alphanumeric and underscore characters
that can identify your app among other apps that might reside on the same
system. The App Name also serves as a prefix to the database schema, which
isolates data from other potential apps.

The API Key serves as a shared secret between the Skygear backend and Skygear
client app. The Skygear client app must possess the key to make API request
to Skygear backend.

The App Name and API Key can be configured by modifying specifying environment
variable in `docker-compose.yml`.

```
## docker-compose.yml
app:
  environment:
    APP_NAME: simpleapp
    API_KEY: thisissupersecret
```

## Logging

Logging let you keep track of what is happening in Skygear. Information
from log are very important for bugs and performance diagnosis.

Level of logging: `debug`, `info`, `warn`, `error`, `fatal`, `panic`

To change the Skygear logging level, modify the `LOG_LEVEL`.

```
$ export LOG_LEVEL=warn
```

Skygear support [Sentry](https://getsentry.com/) as logging backend, to
enable logging to Sentry, just add `SENTRY_DSN` and `SENTRY_LEVEL`.

```
$ export SENTRY_DSN=http://abcd:efgh@sentry.example.com/sentry/project1
$ export SENTRY_LEVEL=warn
```

## List of configuration settings

To set up the configuration settings in the local development environment, it
is recommended to put the setting in `.env` file.

If you are using the Skygear portal, you can set the environment variable on the 
<a href="http://portal-staging.skygear.io/app/settings">settings page</a>.

### Application related
* `APP_NAME` - string, alphanumeric or underscore, name of the application
* `API_KEY` - string, shared secret between backend and client
  app
* `MASTER_KEY` - string, for potentially destructive operation and request
  options restricted to system administrator
* `CORS_HOST` - string, hostname for cross origin access control

### Token store related
* `TOKEN_STORE` - The backing store for user token, supporting `fs` and
  `redis`. `fs` is intent for local dev. Please use `redis` for production
  deployment.
* `TOKEN_STORE_PATH` - Where the token will store when using `fs`. Or the
  URL of `redis`, i.e. `redis://localhost:6379`
* `TOKEN_STORE_PREFIX` - string, prefix to access token for storing in redis.

### Asset store related
* `ASSET_STORE` - The backing store of asset, surrently support `s3`. And `fs`
  for local development
* `ASSET_STORE_PUBLIC` - Specific the asset is public or follow ACL
* `ASSET_STORE_PATH` - Where is the asset saved if using `fs` backing store.
* `ASSET_STORE_URL_PREFIX` - The URL prefix Skygear will generate for `fs`
  store.
* `ASSET_STORE_SECRET` - The signing key for `fs` store
* `ASSET_STORE_ACCESS_KEY` - `s3` access key
* `ASSET_STORE_SECRET_KEY` - `s3` secret key
* `ASSET_STORE_REGION` - `s3` region, defauling to us-east-1
* `ASSET_STORE_BUCKET` - `s3` bucket name

### Apple Push notification related
* `APNS_ENVABLE` - string, `YES` or `NO`
* `APNS_ENV` - string, `sandbox` or `production`
* `APNS_CERTIFICATE` - full string of the certificate in PEM format
* `APNS_PRIVATE_KEY` - full string of the private key in PEM format
* `APNS_CERTIFICATE_PATH` - string, absolute path to the cert. In PEM format.
* `APNS_PRIVATE_KEY_PATH` - string, absolute path to the private key. In PEM format.

Read [this
guide](http://docs.moengage.com/docs/ios-push-notifications#making-a-pem-file)
to learn how to convert cert/key to PEM.

### GCM(Google Cloud Messaging) related
* `GCM_ENABLE` - string , `YES` or `NO`
* `GCM_APIKEY` - string, the api-key you obtained from Google

