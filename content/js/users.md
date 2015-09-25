+++
date = "2015-09-25T18:25:39+08:00"
draft = true
title = "Users (Authentication)"

+++

Consider the following HTML:

```html
<form>
  <p>
    <label>Username</label>
    <input id="username" type="text">
  </p>
  <p>
    <label>Password</label>
    <input id="password" type="password">
  </p>
</form>
```

## Signing up

```js
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
jsourd.signup(username, username, password).then(function() {
  console.log('access token: %s', jsourd.currentAccessToken);
}, function(error) {
  console.log('error signing up: %o', error);
});
```

## Logging in

```js
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
jsourd.login(username, password).then(function() {
  console.log('access token: %s', jsourd.currentAccessToken);
}, function(error) {
  console.log('error logging in: %o', error);
});
```

## Logging out

```js
jsourd.logout().then(function() {
  console.log('logout successfully');
}, function(error) {
  console.log('error logging out: %o', error);
});
```
