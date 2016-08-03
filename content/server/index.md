While we provide docker image for easy bootstrap, you can clone the source and start the server on your own by following steps.

### Prerequisite

1. go v1.5+
2. https://github.com/tools/godep is used for managing go lib
3. PostgreSQL, Recommended version: 9.4
4. zmq is used for connecting plugin
   * brew install libsodium zeromq czmq


### Install PostgreSQL

``` bash
brew install postgresql
brew install postgis
createdb myapp
psql -c 'CREATE EXTENSION postgis;' -U postgres -d myapp
```

### Install go

Follow the instructions at https://golang.org/doc/install

### Get the source code

``` bash
mkdir -p $GOPATH/src/github.com/oursky
cd $GOPATH/src/github.com/oursky
git clone git@github.com:skygeario/skygear-server.git
cd skygear
go generate ./...
go build
```

Modify the environment variable for configuration. For detail see
[Skygear Server Configuration](/server/guide)

``` bash
skygear-server
```

You should see following output
```
INFO[0000] Starting Skygear Server(v0.xx.0)...
.....
INFO[0000] Listening on :3000... 
```
