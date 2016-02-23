+++
date = "2015-09-25T17:03:21+08:00"
draft = true
title = "Upgrade Skygear"

+++

Upgrading Skygear is simple if you use Docker. If you have Docker configured
to run Skygear. You can fetch a new docker image by running:

```
docker pull oursky/skygear
```

With the new docker image in place, you need to rebuild the Skygear docker
container. This is achieved by first deleting the Skygear container, and then
recreate it:

```
docker stop skygear
docker rm skygear
docker run --name skygear oursky/skygear
```

Note: the exact command varies in your environment.

## Database schema migration

From time to time, the database schema might change and this requires
migrating the database to a new version.

When Skygear runs, it will first check if the version of the database is
up-to-date. Skygear Server will automatically upgrade the schema to the
latest version when Skygear Server starts in development mode.

To put Skygear Server in development, either set `dev-mode = true` in
`development.ini` or set `DEV_MODE=YES` in environment variable.
