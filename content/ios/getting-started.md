<a name="getting-started"></a>
## Introduction

Skygear aims to provide a complete and open-source backend solution for
your mobile applications.

By creating an App for each of your mobile applications on Skygear, each
client App can be connected to the Skygear Server with an API key.

This guide will show you how to integrate Skygear into an existing iOS project.

<a name="sign-up-hosting"></a>
## Signing up for Skygear Hosting

To start using the Skygear JS SDK, you need to register your account and
application at the Skygear [Developer Portal](https://portal.skygear.io)
website. After you registered, go to the **INFO** tab and copy down your
`Server EndPoint` and `API Key`.

[![Screenshot: where to look for Server EndPoint and API Key](/assets/common/portal-endpoint-apikey.png)](/assets/common/portal-endpoint-apikey.png)


<a name="include-ios-sdk"></a>
## Including SDK in existing project

The installation requires Xcode and [CocoaPods](https://cocoapods.org/). If you haven't installed them already, please head to [this section](#new-project) to read about how to create a new project with configured SDK.

### Step 1: Install SDK using CocoaPods

To install the Skygear iOS SDK as your iOS application dependency:

1. You need to close Xcode.
2. Open Terminal and navigate to the directory that contains your iOS
   project by using the cd command: `cd ~/Path/To/Your/App`.
   You can just drag the file icon to Terminal and the path will be 	automatically typed for you.
3. Run this command in Terminal `pod init` to create a [Podfile](https://guides.cocoapods.org/using/the-podfile.html).
4. Run this command in Terminal `open -a Xcode Podfile` to edit the Podfile using Xcode. You should avoid using TextEdit to edit the Podfile because it may mess up the format and confuse CocoaPods.

### Step 2: Edit the Podfile

1. Open and edit the `Podfile` file. Your `Podfile` file should look like this:

	```
	use_frameworks!
	platform :ios, '8.0'
	
	target 'YourProjectName' do
	    pod 'SKYKit'
	end
	```
	Replace `'YourProjectName'` with your actual project name.

	CocoaPods 0.36 and above introduces the `use_frameworks!` instruction, so 	the Objective-C bridging header is no longer needed if you're using Swift in 	your project.

2. Run `pod install` in your terminal.
3. You would see that an Xcode Workspace file is created. Open the file and go to the project.
4. It's done! You have installed Skygear SDK in your app. If you're using Swift, just import the SDK in each Swift file to call the SDK.

### Step 3: Configure container

Now, you are going to setup the server endpoint and API key for your app. Read more about [SKYContainer](#skycontainer).

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

<a name="new-project"></a>
## Create a new project with configured SDK

### Step 1: Install Xcode

Download the latest version of Xcode from the Mac App Store [here](https://itunes.apple.com/en/app/xcode/id497799835?mt=12).

### Step 2: Install CocoaPods

CocoaPods manages library dependencies for your Xcode projects.

The dependencies for your projects are specified in a single text file called a Podfile. CocoaPods will resolve dependencies between libraries, fetch the resulting source code, then link it together in an Xcode workspace to build your project.

You can read more about CocoaPods [here](https://guides.cocoapods.org/using/getting-started.html).

Installing CocoaPods is very simple:

1. Open terminal.
2. Run this command `$ sudo gem install cocoapods`.
3. Wait for it to complete the process. It should take a few minutes.

### Step 3: Create new project

1. Open terminal and run this command `pod lib create --silent --template-url=https://github.com/SkygearIO/skygear-Scaffolding-iOS.git "YourProjectName"`. Change `"YourProjectName"` to something you like.
2. You will then be prompted a few questions, please make sure that you answer these questions correctly:

- What is your skygear endpoint?
- What is your skygear API key?
- What language do you want to use?

### We're done, Woo-hoo!
Congratulations, you have your first Skygear iOS project set up! The SDK is automatically included for you. Your project will be automatically launched.

<a name="skycontainer"></a>
## SKYContainer

The `SKYContainer` object is the uppermost layer of `SKYKit`. It represents the root of all resources accessible by an application and one application should have exactly one container.

Remember to configure your `SKYContainer` with the `Server EndPoint` and `API Key` you get on Skygear Developer Portal **BEFORE** you make API calls. 

In `SKYKit`, such container is accessed via the singleton
`defaultContainer`:

```obj-c
SKYContainer *container = [SKYContainer defaultContainer];
```

Container provides [User Authentication](/ios/guide/users),
[Asset Storage](/ios/guide/asset) and access to
[public and private databases](/ios/guide/record).

<a name="whats-next"></a>
## What's Next

Now you've learned how to start developing with Skygear, check out the SDK docs to learn some of the concepts behind Skygear:

- Learn how to [Authenticate Users](/ios/guide/users)
- Learn how to [Save Records](/ios/guide/record)
- Learn how to [Make Queries](/ios/guide/query)
- [See example app](/ios/guide/first-app)
