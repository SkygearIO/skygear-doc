Upgrading Skygear Server is simple if you use Docker. 

If you have Docker configured to run Skygear. You can fetch a new docker image by running:

```
docker pull skygeario/skygear-server
```

With the new docker image in place, you need to rebuild the Skygear Server docker container. 

This is achieved by first deleting the Skygear Server container, and then recreate it:

```
docker stop skygear-server
docker rm skygear-server
docker run --name skygear-server skygeario/skygear-server
```

Note: the exact command might vary depend on your environment.

## Database schema migration

From time to time, the database schema might change and this requires
migrating the database to a new version.

When Skygear Server runs, it will first check if the version of the database is up-to-date. The Skygear Server will automatically upgrade the schema to the latest version when it's started in a development mode.

To set the Skygear Server in development mode,  set `DEV_MODE=YES` in environment variable.
