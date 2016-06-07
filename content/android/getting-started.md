Skygear aims to provide a complete and open-source backend solution for your mobile applications.

By creating an App for each of your mobile applications on Skygear, each client App can be connected to the Skygear Server with an API key.

This guide will show you how to integrate Skygear into an existing iOS project.

<a name="signup"></a>
## Sign up for Skygear

Sign up an account at [Skygear Portal](http://portal.skygear.io/).

You will need the server endpoint and API Key to set up your app.


<a name="install"></a>
## Install Android SDK

1. Make sure jcenter repository is included in `build.gradle` of your project

  ```gradle
  allprojects {
      repositories {
          jcenter()
      }
  }
  ```

2. Add skygear as dependency in `build.gradle` of your application

  ```gradle
  dependencies {
      // other dependencies
      compile 'io.skygear:skygear:+'
  }
  ```

<a name="setup"></a>
## Set up Skygear

### Option 1: Use `SkygearApplication` as Custom Application

If you does not have a custom application class, you can set up skygear as following:

1. Create custom class extends `SkygearApplication`

  ```java
  import io.skygear.skygear.SkygearApplication;

  public class MyApplication extends SkygearApplication {
      // ...
  }
  ```

2. Update `AndroidManifest.xml`, add `android:name` attribute to `application` tag

  ```html
  <application
      android:name=".MyApplication"
      android:allowBackup="true"
      android:icon="@mipmap/ic_launcher"
      android:label="@string/app_name"
      android:supportsRtl="true"
      android:theme="@style/AppTheme">
      <!-- different activities ... -->
  </application>
  ```

3. Implement required methods in custom application class

  ```java
  public class MyApplication extends SkygearApplication {
      @Override
      public String getSkygearEndpoint() {
          return "http://your-endpoint.skygeario.com/";
      }

      @Override
      public String getApiKey() {
          return "your-api-key";
      }
  }
  ```


### Option 2: Set up Skygear when your application starts

If you have your custom application class, you can set up skygear when your application starts.

  ```java
  public class MyApplication extends Application {
      @Override
      public void onCreate() {
          super.onCreate();

          Configuration config = new Configuration.Builder()
                  .endPoint("http://your-endpoint.skygeario.com/")
                  .apiKey("your-api-key")
                  .build();

          Container.defaultContainer(this).configure(config);

          // your code...
      }
  }
  ```

<a name="whats-next"></a>
## What's Next
Now you've learnt how to start developing with Skygear, check out the SDK docs to learn some of the concepts behind Skygear.

Interested in doing more with your Skygear backend server?

The Plugin interface is designed to empower developers to automate, extend, and integrate functionality provided by the Skygear Server with other services and applications. For more information, check out the Plugin docs.
