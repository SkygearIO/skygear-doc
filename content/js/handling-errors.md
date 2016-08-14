All asynchronous methods in `skygear` return [Promise](https://www.promisejs.org/).

``` javascript
import skygearError from 'skygear/lib/error';

skygear.signupWithUsername('johndoe', 'verysecurepassword').then(() => {
  // user logged in successfully
}, (error) => {
  if (error.error.code === skygearError.Duplicated) {
    // alert the user that username 'johndoe' already exists
  }
  console.error(error);
});
```

With the above code, if user tries to sign up with an existing username,
error will be displayed in the console like the following image:

[![Screenshot: duplicate user error example](/assets/js/error-example.png)](/assets/js/error-example.png)

<a name="error-code"></a>
## Using Skygear Error Codes

Error Name | Code Number
--- | ---
`NotAuthenticated` | 101
`PermissionDenied` | 102
`AccessKeyNotAccepted` | 103
`AccessTokenNotAccepted` | 104
`InvalidCredentials` | 105
`InvalidSignature` | 106
`BadRequest` | 107
`InvalidArgument` | 108
`Duplicated` | 109
`ResourceNotFound` | 110
`NotSupported` | 111
`NotImplemented` | 112
`ConstraintViolated` | 113
`IncompatibleSchema` | 114
`AtomicOperationFailure` | 115
`PartialOperationFailure` | 116
`UndefinedOperation` | 117
`PluginUnavailable` | 118
`PluginTimeout` | 119
`RecordQueryInvalid` | 120
