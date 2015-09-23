+++
date = "2015-09-21T19:36:40+08:00"
draft = true
title = "Users"

+++

TODO: Only logged in user can do write operation on databases

## Signing up

```obj-c
[container signupUserWithUsername:@"john.doe@example.com" password:@"verysecurepasswd" completionHandler:^(ODUserRecordID *user, NSError *error) {
    if (error) {
        NSLog(@"error signing up user: %@", error);
        return;
    }

    NSLog(@"sign up successful");
    // do something else
}];
```

TODO: It checks for uniqueness username
TODO: Remind developer to use email as username when necessary

## Logging in

```obj-c
[container loginUserWithUsername:@"john.doe@example.com" password:@"verysecurepasswd" completionHandler:^(ODUserRecordID *user, NSError *error) {
    if (error) {
        NSLog(@"error loggin user in: %@", error);
        return;
    }

    NSLog(@"login successful");
    // do something else
}];
```

## Getting current user id

```obj-c
if (container.currentUserRecordID) {
    // user is logged in, proceed
} else {
    // ask user to sign up / login
}
```

## Logging out

```obj-c
[container logoutUserWithcompletionHandler:nil];
```

## User Relations

See [Friends and Followers]({{< relref "relation.md" >}}).
