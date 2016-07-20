<a name="manage-user"></a>
## Manage User

### How does it work

1. Web page load/refresh
2. SDK checks if user information exists in localstorage
  - yes: SDK checks if `accessToken` has expired
    + yes: user has to log in again
    + no: user remains logged in (skip 3)
  - no: user has to log in or sign up
3. User logs in or signs up (trigger `onUserChanged`)
4. SDK updates user information in localstorage
5. User logs out or `accessToken` expires (trigger `onUserChanged`)
6. SDK clears user information in localstorage

### Sign up

``` javascript
// We can signup using username or email. Both function will return a promise.
let req = skygear.signupWithUsername(username, password);
// Or by email.
req = skygear.signupWithEmail(email, password);

req.then((user) => {
  console.log('user id', user.id);
  // only after the user successfully signup or login
  // skygear.accessToken can be available
  console.log('access token', skygear.accessToken);
}, (error) => {
  // maybe username or email already exists
  // or the email format is incorrect
  console.error(error);
});
```

### Log in

Logging in is as straight-forward as signing up.

``` javascript
// If you signup with username, you can login by calling `loginWithUsername`.
let req = skygear.loginWithUsername(username, password);
// Or call `loginWithEmail` if you signup with email.
req = skygear.loginWithEmail(username, password);

req.then((user) => {
  console.log(user);
}, (error) => {
  console.error(error);    
})
```

### Log out

``` javascript
skygear.logout().then(() => {
  console.log('logout successfully');
}, (error) => {
  console.error(error);
});
```

### Change password

``` javascript
skygear.changePassword(oldPassword, newPassword).then((user) => {
  console.log('User now have new password', user);
}, (error) => {
  // maybe user has not logged in or old password not match
  console.error(error);
});
```

### Change email

``` javascript
skygear.saveUser({
  id: '<your-user-id>', // such as skygear.currentUser.id
  email: '<your-new-email-address>',
}).then((user) => {
  console.log('Email updated to:', user.email);
}, (error) => {
  console.error(error);
});
```

### Log out all other session (not yet implemented)

``` javascript
skygear.changePassword(oldPassword, newPassword, invalidateTokens=true)
.then((user) => {
  console.log('skygear will got new accessToken automatically', user);
}, (error) => {
  console.error(error);
});
```

### Forget password (not yet implemented)

<a name="current-user"></a>
## Current User

Skygear provide currentUser object after login.

``` javascript
// if not logged in, it will be null
let user = skygear.currentUser;
```

### Hook currentUser change

When a user's access token is expired, the SDK will return `401 Unauthorized`,
and clear the persisted access token and current user info. To handle the forced
logout gracefully at your application, you should register a callback by
`onUserChanged` and do appropriate application logic to alert the user. The
handler is also invoked every time a user logs in or logs out.

``` javascript
let handler = skygear.onUserChanged(function (user) {
  if (user === null) {
    console.log('The user is logged out');
  } else {
    console.log('The user is logged in or changed');
  }
});

handler.cancel(); // The callback is cancelable
```

### Other user lookup

Skygear provide a user discovery method by email. Everyone has access to this method without even having to be logged in.

``` javascript
// it takes an array of email and callback with an array of users
skygear.getUsersByEmail(['ben@skygear.com']).then((users) => {
  console.log(users);
}, (error) => {
  console.error(error);
});
```

User discovery by username is **not yet implemented**.

``` javascript
skygear.discover('chpapa').then((ben) => {
  console.log(ben);
}, (error) => {
  console.error(error);
});
```

<a name="social-login"></a>
## Social Login (Facebook, Twitter, etc)

Right now to allow social login such as Facebook, plugin code must be written
to enable it on the backend. Read more [here](/plugin/guide/guide-auth).
After the code is written, we can then have social login:

``` javascript
skygear.loginWithProvider(provider, authData).then(...);
// provider is just the name of the provider (e.g. 'com.facebook')
// authData is the access token you obtained from the social media's API website
```

<a name="user-profile"></a>
## User Profile

Whenever a new user signs up, a user profile is automatically created for
you to track user information other than their username, email or password.
Username, email and password are stored inside the reserved `_user` database,
but user profile is stored in the public `user` database. They share the same
column `_id` with exactly same value. You can access the
user profile the same way as accessing a record, and everything stored in
user profile is public and thus visible to any user.

``` javascript
const User = skygear.Record.extend("user");

// get the current user's profile
var query = new skygear.Query(User);
query.equalTo("_id", skygear.currentUser.id);
skygear.publicDB.query(query).then((records) => {
  var profile = records[0];
  console.log(profile);
}, (error) => {
  console.error(error);
});
```

### User relations

See [Social](/js/guide/relation) section for more.

### User access control

See [Access Control](/js/guide/access-control/role) section for more.
