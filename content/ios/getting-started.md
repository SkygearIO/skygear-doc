+++
date = "2015-09-21T15:09:02+08:00"
draft = true
title = "iOS: Getting started"

+++

This guide will show you how to integrate Ourd into an existing iOS project.

It is assumed that you use [CocoaPods](https://cocoapods.org/) to manage your
iOS application dependency.

## Include Ourd as a dependency

1. [Download the source](https://github.com/oursky/ODKit/archive/master.zip)
   of Ourd's iOS SDK (_ODKit_) and unzip it to your project folder.

   * If you use _git_ for source control, it is recommended to submodule ODKit
     instead:

     	```bash
     	git submodule add git@github.com:oursky/ODKit.git
     	```

2. Edit your `Podfile` to include the this line:

   	```ruby
   	pod "ODKit", :path => './ODKit'
   	```

3. `pod install`
4. Done!

## Configure Ourd container

Now, edit `AppDelegate.m` and include ODKit:

```obj-c
import <ODKit/ODKit.h>
```

Then add the followings in the `application:didFinishLaunchingWithOptions:` method:

```obj-c
ODContainer *container = [ODContainer defaultContainer];
[container configAddress:@"localhost:3000"];
[container configAddress:@"OURD_API_KEY"];
```

Note: Replace `localhost:3000` and `OURD_API_KEY` with your server configuration.

## Test the SDK

Now let's test the SDK installation by signing up a new user.

```obj-c
[[ODContainer defaultContainer] signupUserWithUsername:@"john.doe@example.com" password:@"supersecurepasswd" completionHandler:^(ODUserRecordID *user, NSError *error) {
    if (error) {
        NSLog(@"Error occurried while signing up: %@", error);
        return;
    }

    NSLog(@"Congratulation! %@ signed up successfully!", user.username);
}];
```

Now run your app, you should see the following in the app console:

```
2015-09-21 17:48:00.626 noteapp[77092:1147374] Congratulation! john.doe@example.com signed up successfully!
```
