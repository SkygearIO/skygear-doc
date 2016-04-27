All asynchronous methods in `skygear` return [Promise](https://www.promisejs.org/).

## Basic flow

```js
skygear.signup('johndoe', 'john.doe@example.com', 'verysecurepassword').then(() => {
  // user logged in successfully
}, (error) => {
  if (error.code == skygear.Error.DUPLICATED) {
    console.log('username has been taken');
  } else {
    console.log('unexpected error', error.code)
  }
});

```

## Ignoring errors

```js
// omit the error callback
skygear.signup('johndoe', 'john.doe@example.com', 'verysecurepassword').then(() => {
  // user logged in successfully
});

```
