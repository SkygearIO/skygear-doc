+++
date = "2015-09-22T16:58:04+08:00"
draft = true
title = "What is ourd?"

+++

The cloud backend

How to kick start the server
```
docker run oursky/ourd
```

Save a record to DB using SDK

``` javascript
jsourd.publicDB.save(new Note({
    'content': 'Hello World!'
})).then(function (record) {
    console.log(record);
}, function (error) {
    console.log(error);
});
```

[Get Start!]({{< relref "intro/getting-start.md" >}})

[SDK Doc]({{< relref "ios/getting-started.md" >}})

### Core

- Easy to use CLI
- Schema free to kick start
- Lock model on production to prevent error
- Model reference to build relation
- Build-in relation-based access control
- MIT Licensed

### Plugin

- Database hook: beforeSave, afterSave, beforeDelete, afterDelete
- Able to run random SQL if you know what you are doing

### Client SDKs

- Easily presist data on client
- Send and recive push notification
- Store file
- iOS/Android
- javascript - node.js, browser, react-native


### What's next?

[Interact with server using cli]({{< relref "cli/intro.md" >}})
[Create your plugin]({{< relref "plugin/intro.md" >}})
