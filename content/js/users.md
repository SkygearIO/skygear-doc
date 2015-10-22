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
skygear.signup(username, username, password).then(() => {
  console.log('access token: %s', skygear.currentAccessToken);
}, (error) => {
  console.log('error signing up: %o', error);
});
```

# Logging in

```js
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
skygear.login(username, password).then(() => {
  console.log('access token: %s', skygear.currentAccessToken);
}, (error) => {
  console.log('error logging in: %o', error);
});
```

# Logging out

```js
skygear.logout().then(() => {
  console.log('logout successfully');
}, (error) => {
  console.log('error logging out: %o', error);
});
```

# Changing password **[Not implemented]**

``` javascript
skygear.changePassword(oldPassword, newPassword).then((_user) => {
  console.log('User now have new password', user);
}, (error) => {
  console.log('You need too login before changing password!', user);
  console.log('Old password not match?', error);
});
```

__Good to have__

Allow use to logout all other session.

``` javascript
skygear.changePassword(oldPassword, newPassword, invalidateTokens=true).then(
  (user) => {
    console.log('skygear will got new accessToken automatically', user);
  },
  (error) => {
    console.log('Failed', error);
  }
);
```
