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
up-to-date. If the database version is not up to date. You will see
an error similar to the following in the Skygear log.

```
docker logs skygear
skygear: oddb/pq: got version_num = bd=d120fadd, want fef0a121
```

When this happens, you are required to run database migration. You can
trigger migration to happen by using the skygear-migrate docker image.

```
docker run --rm --link skygear_db_1:db oursky/skygear-migrate
```

Note: skygear_db_1 is the docker container in your setup.
