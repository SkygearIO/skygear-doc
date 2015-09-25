+++
date = "2015-09-25T17:48:38+08:00"
draft = true
title = "Handling Errors"

+++

All asynchronous methods in `jsourd` return [Promise](https://www.promisejs.org/).

## Basic flow

```js
jsourd.signup('johndoe', 'john.doe@example.com', 'verysecurepassword').then(function() {
  // user logged in successfully
}, function(error) {
  if (error.code == jsourd.Error.DUPLICATED) {
    console.log('username has been taken');
  } else {
    console.log('unexpected error', error.code)
  }
});

```

## Ignoring errors

```js
// omit the error callback
jsourd.signup('johndoe', 'john.doe@example.com', 'verysecurepassword').then(function() {
  // user logged in successfully
});

```
