+++
date = "2015-09-18T16:59:25+08:00"
draft = true
title = "Getting Started"

+++

### Setup by Docker

```
curl -O {{< ref "index.md" >}}docker-compose.yml
curl -O {{< ref "index.md" >}}development.ini
docker-compose up
```

Get the dev ip by runing 

``` bash
docker-machine ip default
192.168.99.100
```

If you are not already docker user, you will follow the instruction at
[Getting Start by Docker]({{< relref "intro/setup-by-docker.md" >}})

### Connect by (iOS SDK / JS SDK)


``` javascript
import skygear from 'skygear';
skygear.endPoint = 'http://192.168.99.100:3000/';
skygear.configApiKey('secret_at_development.ini')
```

### Create your first user

``` javascript
const username = 'ben';
const email = 'user@myapp.com';
const password = 'truelyrandom';
skygear.signup(username, email, password).then(function() {
  console.log('Signup ok, got token', skygear.currentAccessToken);
}, function(error) {
  console.log('Signup failed with error', error);
});
```

### Create your first record

``` javascript
const Note = skygear.Record.extend('note');
const note = new Note({
  'content': 'Hello World.'
});
skygear.publicDB.save(note).then(function (record) {
  console.log('Record saved', record);
}, function (error) {
  console.log('Saving failed', error);
});

```

### What's next?

- [Interact with server using cli]({{< relref "cli/intro.md" >}})
- [Create your plugin]({{< relref "plugin/intro.md" >}})
