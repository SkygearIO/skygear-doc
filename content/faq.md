## How to dump postgres of skygear server using docker

```shell
$ docker run --rm -i --link skygear_db_1:db mdillon/postgis:9.4 pg_dump -h db -U postgres > dumpfile
```

**Note**: `skygear_db_1` is the name of the *running* postgres database container. If you use Docker Compose,
the name of the container is usually `<foldername>_<servicename>_1`.
