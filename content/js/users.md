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

# Signing up

```js
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
jsourd.signup(username, username, password).then(function() {
  console.log('access token: %s', jsourd.currentAccessToken);
}, function(error) {
  console.log('error signing up: %o', error);
});
```

# Logging in

```js
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
jsourd.login(username, password).then(function() {
  console.log('access token: %s', jsourd.currentAccessToken);
}, function(error) {
  console.log('error logging in: %o', error);
});
```

# Logging out

```js
jsourd.logout().then(function() {
  console.log('logout successfully');
}, function(error) {
  console.log('error logging out: %o', error);
});
```

# Changing password **[Not implemented]**

``` javascript
jsourd.changePassword(oldPassword, newPassword).then(function(_user) {
  console.log('User now have new password', user);
}, function (error) {
  console.log('You need too login before changing password!', user);
  console.log('Old password not match?', error);
});
```

__Good to have__

Allow use to logout all other session.

``` javascript
jsourd.changePassword(oldPassword, newPassword, invalidateTokens=true).then(
  function (user) {
    console.log('jsourd will got new accessToken automatically', user);
  },
  function (error) {
    console.log('Failed', error);
  }
);
```
