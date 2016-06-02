Skygear aims to provide a complete and open-source backend solution for your mobile applications.

By creating an App for each of your mobile applications on Skygear, each client App can be connected to the Skygear Server with an API key.

This guide will show you how to integrate Skygear into an existing iOS project.

<a name="signup"></a>
## Sign up for Skygear

Sign up an account at [Skygear Portal](http://portal.skygear.io/).

You will need the server endpoint and API Key to set up your app.


<a name="install"></a>
## Install Android SDK

1. Include our maven repo in `build.gradle` of your project
```gradle
repositories {
    maven {
        url 'https://dl.bintray.com/skygeario/maven'
    }
}
```

2. Add skygear as dependency in `build.gradle` of your application
```gradle
dependencies {
    // other dependencies
    compile 'io.skygear:skygear'
}
```

<a name="whats-next"></a>
## What's Next
Now you've learnt how to start developing with Skygear, check out the SDK docs to learn some of the concepts behind Skygear.

Interested in doing more with your Skygear backend server?

The Plugin interface is designed to empower developers to automate, extend, and integrate functionality provided by the Skygear Server with other services and applications. For more information, check out the Plugin docs.
