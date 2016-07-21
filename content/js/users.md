<a name="manage-user"></a>
## Manage User

### How does it work

Notice that even without logging in, user can still interact with the SDK,
such as querying data in public database (`skygear.publicDB`). However, this
behavior can be changed by setting different access control for public. For
more information, please refer to [access control](/js/guide/access-control#acl-default)
page. Skygear uses access token (`skygear.accessToken`) with localstorage to
track user authentication. Typical flow is shown below:

1. Web page load/refresh
2. SDK checks if user information exists in localstorage
  - yes: SDK checks if access token has expired
    + yes: user has to log in again
    + no: user remains logged in (skip 3)
  - no: user has to log in or sign up
3. User logs in or signs up (trigger [onUserChanged](#current-user))
4. SDK updates user information in container and localstorage
  - `skygear.currentUser` is available
  - `skygear.accessToken` is available
5. User logs out or access token expires (trigger [onUserChanged](#current-user))
6. SDK clears user information in container and localstorage

### User object

In the callback function for login, signup or onUserChanged and the variable
at `skygear.currentUser`, user object is like the following:

``` javascript
{
  id: "12345abcde...",
  username: "Ben",
  email: "ben@skygear.com",
}
```

### Sign up

To deal with duplicate username or email error, please refer to
[handling errors](/js/guide/handling-errors) page.

``` javascript
skygear.signupWithUsername(username, password).then((user) => {
  console.log(user); // user object
}, (error) => {
  console.error(error);
});
```

Email signup is available as well: `skygear.signupWithEmail(email, password)`

### Log in

To deal with nonexisting username or wrong password error, please refer to
[handling errors](/js/guide/handling-errors) page.

``` javascript
skygear.loginWithUsername(username, password).then((user) => {
  console.log(user); // user object
}, (error) => {
  console.error(error);    
})
```

Email login is available as well: `skygear.loginWithEmail(email, password)`

### Log out

``` javascript
skygear.logout().then(() => {
  console.log('logout successfully');
}, (error) => {
  console.error(error);
});
```

### Change password

It's for current logged in user only.

``` javascript
skygear.changePassword(oldPassword, newPassword).then((user) => {
  console.log('User now have new password', user);
}, (error) => {
  console.error(error);
});
```

### Change email

By providing user id, current user can change his email.
Only users with admin privileges can modify other users' email.

``` javascript
skygear.saveUser({
  id: '<your-user-id>', // usually skygear.currentUser.id
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

After login or signup, user object will be available at `skygear.currentUser`:

``` javascript
const user = skygear.currentUser; // if not logged in, user will be null
```

### Hook currentUser change

When a user's access token is expired, the SDK will return `401 Unauthorized`,
and clear the persisted access token and current user info. To handle the forced
logout gracefully at your application, you should register a callback by
`onUserChanged` and do appropriate application logic to alert the user. The
handler is also invoked every time a user logs in or logs out.

``` javascript
const handler = skygear.onUserChanged(function (user) {
  if (user) {
    console.log('user logged in or signed up');
  } else {
    console.log('user logged out or accessToken expired');
  }
});

handler.cancel(); // The callback is cancelable
```

### Other user lookup

Skygear provide a user discovery method by email. Everyone has access to this
method without even having to be logged in.

``` javascript
skygear.getUsersByEmail(['ben@skygear.com', 'tak@oursky.com']).then((users) => {
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
skygear.loginWithProvider(provider, authData);
```

- provider: name of provider, such as `com.facebook` or `com.google`
- authData: an object that will be passed as a dictionary to the backend python
plugin code

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
const query = new skygear.Query(User);
query.equalTo("_id", skygear.currentUser.id);
skygear.publicDB.query(query).then((records) => {
  const profile = records[0];
  console.log(profile);
}, (error) => {
  console.error(error);
});
```

### User relations

See [Social](/js/guide/relation) section for more.

### User access control

See [Access Control](/js/guide/access-control/role) section for more.
