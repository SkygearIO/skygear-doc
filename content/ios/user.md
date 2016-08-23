<a name="manage-user"></a>
## Manage User

### Signing up

The first thing you want a user to do is to sign up. The following code illustrates the sign up process:

```obj-c
[container signupWithUsername:@"john.doe"
                     password:@"verysecurepasswd"
            completionHandler:^(SKYUser *user, NSError *error) {
    if (error) {
        NSLog(@"error signing up user: %@", error);
        return;
    }

    NSLog(@"sign up successful");
    // do something else
}];
```

You can use `signupWithEmail:password:` to sign up users with emails as well:

```obj-c
[container signupWithEmail:@"john.doe@example.com"
                  password:@"verysecurepasswd"
         completionHandler:^(SKYUserRecordID *user, NSError *error) {
    if (error) {
        NSLog(@"error signing up user: %@", error);
        return;
    }

    NSLog(@"sign up successful");
    // do something else
}];
```

These two methods will create a new user in your app. Before completing the process, it automatically checks if the username is unique. New users should always be created with either one of the methods.

When a new user is successfully created, a `SKYUser` is returned.

If the signup is not successful, you should read the error object returned. Usually it is just that the username or the email has been taken. You should communicate this to your users and ask them to try a different username. They may also be other kinds of errors that you should take note of.

### Logging in

You can use `loginWithUsername:password:` to let users log in to their accounts by:

```obj-c
[container loginWithUsername:@"john.doe"
                    password:@"verysecurepasswd"
           completionHandler:^(SKYUserRecordID *user, NSError *error) {
    if (error) {
        NSLog(@"error loggin user in: %@", error);
        return;
    }

    NSLog(@"login successful");
    // do something else
}];
```

You can also use `loginWithEmail:password:` to log in users with emails:

```obj-c
[container loginWithEmail:@"john.doe@example.com"
                 password:@"verysecurepasswd"
        completionHandler:^(SKYUserRecordID *user, NSError *error) {
    if (error) {
        NSLog(@"error loggin user in: %@", error);
        return;
    }

    NSLog(@"login successful");
    // do something else
}];
```

### Logging out

Of course, you also would want to allow users to log out of their accounts by using `logoutWithCompletionHandler:`.

```obj-c
[container logoutWithCompletionHandler:nil];
```

### Changing password

To change the password of the current user:

```obj-c
[container changePassword:@"oldPassword"
                 password:@"newPassword"
        completionHandler:^(SKYUserRecordID *user, NSError *error) {
    if (error) {
        NSLog(@"can't change password: %@", error);
        // Can be old password not matched?
        return;
    }

    NSLog(@"password change successfully");
}]
```

<a name="current-user"></a>
## Current User

### Getting current user id

You can get the `currentUserRecordID` by:

```obj-c
if (container.currentUserRecordID) {
    // user is logged in, proceed
    NSString *userID = [container currentUserRecordID];
} else {
    // ask user to sign up / login
}
```

You can get the latest information (e.g. roles, emails, etc.) of the current
user by asking "Who am I" to Skygear:

```obj-c
[[SKYContainer defaultContainer] getWhoAmIWithCompletionHandler:^(SKYUser *user, NSError *error) {
    if (error) {
        // Error handling...
    } else {
        NSLog(@"Oh. I am %@.", user.username);
    }
}];
```

### Looking up users by email

Skygear provide a user discovery method by email. Everyone has access to this method without even having to be logged in.

```obj-c
SKYQueryUsersOperation *operation = [SKYQueryUsersOperation discoverUsersOperationByEmails:@[@"john.doe@example.com", @"jane.doe@example.com"]];
operation.queryUserCompletionBlock = ^(NSArray /* SKYUser */ *users, NSError *operationError) {
    for (SKYUser *user in users) {
        // do something with the user
    }
};
operation.container = [SKYContainer defaultContainer];
[[SKYContainer defaultContainer] addOperation:operation];
```

### User Relations

See [Friends and Followers]({{< relref "relation.md" >}}).

<a name="social-login"></a>
## Social Login (Facebook, Twitter, etc)

Right now to allow social plugin such as Facebook. Plugin code must be written to enable it on the backend. Read more about in the [Plugin]({{< relref "plugin.md" >}}) section.

<a name="user-profile"></a>
## User Profile

Whenever a new user signs up, a user profile is automatically created for
you to track user information other than their _username_, _email_ or _password_. _Username_, _email_ and _password_ are stored inside the reserved `_user` database, but user profile is stored in the public `user` database. They share the same column `_id` with exactly same value. You can access the
user profile the same way as accessing a record, and everything stored in
user profile is public and thus visible to any user.

```obj-c
SKYDatabase *publicDB = [[SKYContainer defaultContainer] publicCloudDatabase];
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"_id ==[c] %@", [container currentUserRecordID]];
SKYQuery *query = [SKYQuery queryWithRecordType:@"user" predicate:predicate];

[publicDB performQuery:query completionHandler:^(NSArray *results, NSError *error) {
    if (error) {
        NSLog(@"error quering user profile: %@", error);
        return;
    }

    NSLog(@"query successful");
    // do something else
}];
```
