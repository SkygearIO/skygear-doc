+++
date = "2015-09-25T17:03:21+08:00"
draft = true
title = "Upgrade Ourd"

+++

Upgrading Ourd is simple if you use Docker. If you have Docker configured
to run Ourd. You can fetch a new docker image by running:

```
docker pull oursky/ourd
```

With the new docker image in place, you need to rebuild the Ourd docker
container. This is achieved by first deleting the Ourd container, and then
recreate it:

```
docker stop ourd
docker rm ourd
docker run --name ourd oursky/ourd
```

Note: the exact command varies in your environment.

## Database schema migration

From time to time, the database schema might change and this requires
migrating the database to a new version.

When Ourd runs, it will first check if the version of the database is
up-to-date. If the database version is not up to date. You will see
an error similar to the following in the Ourd log.

```
docker logs ourd
ourd: oddb/pq: got version_num = bd=d120fadd, want fef0a121
```

When this happens, you are required to run database migration. You can
trigger migration to happen by running the `ourd-db` utility.

```
docker exec -i -t ourd ourd-db migrate
```





