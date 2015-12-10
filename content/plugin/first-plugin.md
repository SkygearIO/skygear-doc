+++
date = "2015-09-18T17:02:40+08:00"
draft = true
title = "Developing Your First Plugin"

+++

It is simple to create your first plugin. 

To create a plugin, you have to define functions in your Python program that takes arguments defined by each type of extension point. For Skygear to find your function, you have to decorate your
functions using decorators provided by the `py-skygear` package. Doing so will also allows py-skygear to register your hooks to Skygear when the plugin program starts. When Skygear calls your plugin, `py-skygear` will take the plugin message and calls the appropriate function automatically.

# Install py-skygear

Install `py-skygear` by using `pip`.

```shell
$ pip install py-skygear
```

Alternatively, you can install py-skygear from source by cloning`py-skygear` from the official repository.

Depending on your operating system, you may need to install extra dependencies to install from source. 

```shell
# Ubuntu 14.04
$ sudo apt-get install python3-dev libpq-dev libzmq3-dev

# Mac OS X with homebrew
$ brew install zeromq
```

With the above dependencies installed, run:

```shell
$ git clone git@github.com:oursky/py-skygear.git
$ python setup.py install
```

# Create main plugin file

The first thing you have to do is create a main plugin file. This file is where you put all your plugin code. If your plugin consists of code that spread across multiple file, your must also import those files in your main plugin file.

The name of the main file is arbitrary. You can name it however you want, but you have to specify the name of the main file when executing the plugin. We will call the main plugin file `sample.py`.

The first thing you have to include in your plugin code is to import the `skygear` module:

```python
import skygear
```

This will import decorators for your plugin function.

# Test run your first plugin

To verify our setup, run this:

```shell
$ py-skygear sample.py --subprocess init
{"provider": [], "timer": [], "op": [], "hook": [], "handler": {}}
```

This command finds all hooks already defined in the plugin. The command has a `--subprocess` flag so that you can verify that the plugin works without running Skygear. This is standalone version allows you to call plugin hooks by command line.

All types of hooks are now empty because we have not defined any! Let’s go ahead to implement the easiest extension point—lambda function:

```python
import skygear

@skygear.op("chima:echo")
def echo():
    return {"message": "Hello World"}
```

```shell
$ skygear sample.py --subprocess init
{"op": ["chima:hello"], "provider": [], "hook": [], "timer": [], "handler": {}}
```

Now that it is defined, let’s try to call the lambda function:

```
$ echo '["Bob"]' | py-skygear sample.py --subprocess op chima:hello
{"result": {"message": "Hello Bob"}}
```

# Add plugin to Skygear configuration

Add the following section to Skygear configuration to declare a new plugin.

```ini
[plugin "sample"]
transport = zmq
path = python
args = tcp://0.0.0.0:5555/
```

When Skygear starts, it will wait for plugin registration information before serving requests. We need to start our plugin so that the plugin can send registration information to Skygear.

```
$ py-skygear sample.py
Connecting to address tcp://127.0.0.1:5555
```

You can now try out your new lambda function by calling it through Skygear API or calling it from your app.

# Integrate with Docker

To integrate the plugin with Docker, see the [catapi
example](https://github.com/oursky/py-skygear/blob/master/examples/catapi) in `py-skygear`
repo.

The example contains everything you need to start a Skygear plugin in the
Docker environment.
