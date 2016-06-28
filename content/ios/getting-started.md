<a name="getting-started"></a>
## Getting Started

Skygear aims to provide a complete and open-source backend solution for your mobile applications.

By creating an App for each of your mobile applications on Skygear, each client App can be connected to the Skygear Server with an API key.

This guide will show you how to integrate Skygear into an existing iOS project.

## Sign up for Skygear

Sign up an account at [Skygear Portal](http://portal.skygear.io/).

You will need the server endpoint and API Key to set up your app.


<a name="install-ios-sdk"></a>
## Install iOS SDK
<a name="add-as-dependency"></a>
### Include Skygear SDK as CocoaPods dependency

The installation requies [CocoaPods](https://cocoapods.org/).

To install the Skygear iOS SDK as your iOS application dependency:

#### For Objective-C Projects

1. Open and edit the `Podfile` file, add the following in the last line:

```
pod "SKYKit"
```

2. Run `pod install` in your terminal
3. It's done! You now have installed Skygear SDK in your app.

#### For Swift Projects

1. Open and edit the `Podfile` file. Your `Podfile` file should look like this:

```
use_frameworks!
platform :ios, '8.0'
pod 'SKYKit'
```

Cocoapods 0.36 and above introduces the `use_frameworks!` instruction, so the Objective-C bridging header is no longer needed.

2. Run `pod install` in your terminal
3. You would see that an Xcode Workspace file is created. Open the file and go to the project
4. It's done! You have installed Skygear SDK in your app. Just import the SDK in each swift file to call the SDK.

<a name="set-up-ios-app"></a>
## Set up your iOS app

Now, you are going to setup the server endpoint and API key for your app.

<a name="configure-container"></a>
### Configure the Skygear Container
The `SKYContainer` (Skygear Container) object is the primary interface for interacting with the Skygear service. The object is initialized with the sever endpoint and an API key.

In `AppDelegate.m`, include `SKYKit`:

```obj-c
import <SKYKit/SKYKit.h>
```

Then add these lines in the `application:didFinishLaunchingWithOptions:` method:

```obj-c
SKYContainer *container = [SKYContainer defaultContainer];
[container configAddress:@"https://your-endpoint.skygeario.com/"]; //Your server endpoint
[container configureWithAPIKey:@"SKYGEAR_API_KEY"]; //Your Skygear API Key
```

Replace `your-endpoint.skygeario.com` with your Server Endpoint and `SKYGEAR_API_KEY` with your API Key.

<a name="test-sdk"></a>
## Test the SDK

First, make sure you have included our SDK libraries from your .h file:

```obj-c
import <SKYKit/SKYKit.h>
```

Now, let's test the SDK installation by creating a new user sign up.You can copy the following code into your app, for example in the `viewDidLoad` method:

```obj-c
SKYContainer *container = [SKYContainer defaultContainer];
[container signupUserWithUsername:@"john.doe@example.com" 
                         password:@"supersecurepasswd"
                completionHandler:^(SKYUserRecordID *user, NSError *error) {
    if (error) {
        NSLog(@"Error occurried while signing up: %@", error);
        return;
    }

    NSLog(@"Congratulations! %@ signed up successfully!", user.username);
    // Do other work here
}];
```

Run your app, you should see the following in the app console:

```
2015-09-21 17:48:00.626 noteapp[77092:1147374] Congratulations! john.doe@example.com signed up successfully!
```

<a name="whats-next"></a>
## What's Next
Now you've learnt how to start developing with Skygear, check out the SDK docs to learn some of the concepts behind Skygear.

Interested in doing more with your Skygear backend server? 

The Plugin interface is designed to empower developers to automate, extend, and integrate functionality provided by the Skygear Server with other services and applications. For more information, check out the Plugin docs.