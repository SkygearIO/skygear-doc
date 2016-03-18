+++
date = "2015-09-23T17:20:54+08:00"
draft = true
title = "Setup from scratch"

+++

While we provide docker image for easy boostrap, you can clone the source and
start the server on your own by following steps.

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

Follow instruction at https://golang.org/doc/install

### Get the soruce code

``` bash
mkdir -p $GOPATH/src/github.com/oursky
cd $GOPATH/src/github.com/oursky
git clone git@github.com:skygeario/skygear-server.git
cd skygear
go generate ./...
go build
```

Modify the development.ini

``` bash
skygear development.ini
```

You should see following output
```
INFO[0000] Listening on 127.0.0.1:3000...
```
