+++
date = "2016-02-16T11:10:04+08:00"
draft = true
title = "Next step with CloudFormation"

+++

# Manage your Skygear Server Quickstart instance

## Install Fabric

The Quickstart instance is designed to be used with the [Fabric
script](https://raw.githubusercontent.com/skygeario/skygear-server/master/examples/quickstart/fabfile.py).
To use the script, you need to install Fabric

```shell
# Using easy_install
$ sudo easy_install fabric pyyaml
# Using pip
$ sudo pip install fabric pyyaml
```

Download the script and put it in a directory called `myapp`.

You can see the list of available commands by running `fab -l`.

## Service Management

To restart Skygear Server

```shell
fab -H ubuntu@<ip> restart
```

## Plugin Management

To deploy a plugin you need a SSH key. Run `ssh-keygen` if you do not have a SSH
key.

To add your SSH key in `~/.ssh/id_rsa.pub`, run:

```shell
$ fab -H ubuntu@<ip> add_upload_key:yourname
```

replace `yourname` with a name for your SSH key.

Add a plugin configuration to your Skygear Server instance

```shell
$ fab -H ubuntu@<ip> add_plugin:catapi
```

You need a git repository with the plugin source and a Dockerfile:

```
# Dockerfile
FROM skygeario/py-skygear:onbuild

# __init__.py
import skygear

@skygear.op('catapi:get')
def get_cat():
    return {'message': 'Hello World!'}
```

You also need a file called `requirements.txt` in project root. This file can
be initially blank.

```
$ touch requirements.txt
```

Set up a git repository:

```shell
git init
git add Dockerfile __init__.py requirements.txt
git commit -m "Initial commit."
```

Set up a git remote for deploying your plugin to your instance:

```shell
git remote add deploy git@<ip>:catapi
```

Push your git repo:

```shell
git push deploy master
```

Upon push, your plugin is built and Skygear Server will restart automatically.

To test your new plugin:

```shell
$ curl -XPOST http://<ip> -d '{"action": "catapi:get"}'`
`{"result":{"message":"Hello World!"}}`
```

You can checkout the logs of the server and plugins:

```shell
$ fab -H ubuntu@<ip> logs:server
$ fab -H ubuntu@<ip> logs:plugin_catapi
```

## Upgrade

Run this to upgrade your Skygear Server and plugins:

```shell
fab -H ubuntu@<ip> upgrade
```
