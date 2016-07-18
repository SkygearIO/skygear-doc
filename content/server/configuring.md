Configuration is not mandatory to get Skygear up and running in development. However, for production environment, Skygear should be configured to secure the server and achieve optimal performance.

<a name="configure"></a>
## How to configure Skygear?

Skygear is configured by environment variables.

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

If you wish to run Skygear with Docker without using Compose:

```
$ docker run -e ENV_NAME=ENV_VALUE skygeario/skygear-server
```

If you run Skygear without Docker, Skygear supports the `.env` for easy
development. You can refer to the example config:
https://github.com/SkygearIO/skygear-server/blob/master/.env.example

For more information about how the `.env` file works, please read
https://github.com/joho/godotenv

```
$ export API_KEY=changeme
$ export MASTER_KEY=thisissupersecret // Or you can put them in .env
$ skygear-server
```

#### Configurations

##### S3 Asset Store

Skygear supports using Amazon S3 as the default storage backend.
Set the AWS access key, secret key, region and bucket by the following
environment variables.

```
$ export ASSET_STORE=s3
$ export ASSET_STORE_PUBLIC=NO
$ export ASSET_STORE_ACCESS_KEY=AKXXXXXXXXXXXXXXXXXX
$ export ASSET_STORE_SECRET_KEY=3XXx/X/XxxXXXXxXxXxxXXXXxx00x0XXxXxx0xxX
$ export ASSET_STORE_REGION=us-east-1
$ export ASSET_STORE_BUCKET=thebucketname
```

If your S3 is readable by the public, you can set `ASSET_STORE_PUBLIC` to `YES`
so that the access signature can be omitted.

<a name="name-and-key"></a>
## App Name and API Key

It is strongly recommended that you change the App Name and the API Key.
The App Name should be a string consisting of alphanumeric and underscorem
that can identify your app among other apps that might reside on the same
system. The App Name also serves as a prefix to the database schema, which
isolates data from the other apps.

The API Key serves as a shared secret between the Skygear backend and the
Skygear client app. The Skygear client app must possess the key to make API
requests to Skygear backend.

The App Name and the API Key can be configured by modifying the corresponding
environment variables in `docker-compose.yml`:

```
## docker-compose.yml
app:
  environment:
    APP_NAME: simpleapp
    API_KEY: thisissupersecret
```

<a name="logging"></a>
## Logging

Logging lets you keep track of what is happening in Skygear. Information
from log is very important for diagnosing bugs and performance issues.

List of logging levels: `debug`, `info`, `warn`, `error`, `fatal`, `panic`.

To change the Skygear logging level, modify `LOG_LEVEL`:

```
$ export LOG_LEVEL=warn
```

Skygear supports using [Sentry](https://getsentry.com/) as the logging backend.
To enable logging with Sentry, simply add `SENTRY_DSN` and `SENTRY_LEVEL`:

```
$ export SENTRY_DSN=http://abcd:efgh@sentry.example.com/sentry/project1
$ export SENTRY_LEVEL=warn
```

<a name="others"></a>
## List of configuration settings

To configure the local development environment, it is recommended to put the
settings in the `.env` file.

If you are using Skygear portal, you can set the environment variables on the
<a href="http://portal-staging.skygear.io/app/settings">settings page</a>.

### Application related
* `APP_NAME` - string, alphanumeric or underscore, name of the application
* `API_KEY` - string, shared secret between backend and client app
* `MASTER_KEY` - string, for potentially destructive operations and request
  options restricted to system administrators
* `CORS_HOST` - string, hostname for cross origin access control

### Token store related
* `TOKEN_STORE` - the backing store for user token, supporting `fs`,
  `redis` and `jwt`. `fs` is intended for local development.
  Please use `redis` or `jwt` for production deployment.
  * `fs` - uses the file system to store access tokens
  * `redis` - uses Redis database to store access tokens
  * `jwt` - encodes user info in the access token passed to the client
* `TOKEN_STORE_PATH` - where the token will store when using `fs`. Or the
  URL when using `redis`, e.g. `redis://localhost:6379`
* `TOKEN_STORE_PREFIX` - string, prefix to the access token for using redis.
* `TOKEN_STORE_EXPIRY` - integer, number of seconds the created access token
  will expire. Default is to never expire.
* `TOKEN_STORE_SECRET` - string, for `jwt`, the secret used to validates
  the access token.

### Asset store related
* `ASSET_STORE` - the backing store of assets, currently supporting `fs` and `s3`.
  `fs` is intended for local development
* `ASSET_STORE_PUBLIC` - specifiying the asset is public or follows ACL: `YES` or
  `NO`
* `ASSET_STORE_PATH` - where the asset is saved when using `fs` backing store.
* `ASSET_STORE_URL_PREFIX` - the URL prefix Skygear will generate for `fs`
  store.
* `ASSET_STORE_SECRET` - the signing key for `fs` store
* `ASSET_STORE_ACCESS_KEY` - `s3` access key
* `ASSET_STORE_SECRET_KEY` - `s3` secret key
* `ASSET_STORE_REGION` - `s3` region, with the default as `us-east-1`
* `ASSET_STORE_BUCKET` - `s3` bucket name

### Apple Push notification related
* `APNS_ENVABLE` - string, `YES` or `NO`
* `APNS_ENV` - string, `sandbox` or `production`
* `APNS_CERTIFICATE` - full string of the certificate in PEM format
* `APNS_PRIVATE_KEY` - full string of the private key in PEM format
* `APNS_CERTIFICATE_PATH` - string, absolute path to the cert, in PEM format.
* `APNS_PRIVATE_KEY_PATH` - string, absolute path to the private key, in PEM format.

Read [this
guide](http://docs.moengage.com/docs/ios-push-notifications#making-a-pem-file)
to learn how to convert a cert/key to PEM.

### GCM(Google Cloud Messaging) related
* `GCM_ENABLE` - string , `YES` or `NO`
* `GCM_APIKEY` - string, the api-key you obtained from Google
