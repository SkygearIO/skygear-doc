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
skygear.signup(username, password).then(() => {
  console.log('access token', skygear.currentAccessToken);
}, (error) => {
  console.log('error signing up', error);
});
```

# Logging in

```js
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
skygear.login(username, password).then(() => {
  console.log('access token', skygear.currentAccessToken);
}, (error) => {
  console.log('error logging in', error);
});
```

# Logging out

```js
skygear.logout().then(() => {
  console.log('logout successfully');
}, (error) => {
  console.log('error logging out', error);
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

# Using email as login name

At Skygear, we allow you use email as the user identifier. When you specified
you are using email as identifier, Skygear will ensure the email are in proper
format. And you may enable the recover password by email function. 

You will signup and login the user as follow.

``` javascript
skygear.signupWithEmail(email, password).then(() => {
  console.log('access token', skygear.currentAccessToken);
}, (error) => {
  console.log('May be incorrect email format?');
  console.log('error signing up', error);
});
```

## Login by email

``` javascript
skygear.loginWithEmail(email, password).then(() => {
  console.log('access token', skygear.currentAccessToken);
}, (error) => {
  console.log('error logging up:', error);
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
