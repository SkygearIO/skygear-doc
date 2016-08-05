<a name="android-existing"></a>
## For existing project

### Step 1: Installing SDK

Make sure jcenter repository is included in `build.gradle` of your project

```gradle
allprojects {
    repositories {
        jcenter()
    }
}
```

Add skygear as dependency in `build.gradle` of your application

```gradle
dependencies {
    // other dependencies
    compile 'io.skygear:skygear:+'
}
```

### Step 2: Configuring container

After you have installed the SDK, you must configure
your skygear container with the `Server EndPoint` and `API Key` you get on
Skygear Developer Portal **BEFORE** you make any API calls.

#### Option 1: Using `SkygearApplication` as custom application

Create custom class extends `SkygearApplication`

``` java
import io.skygear.skygear.SkygearApplication;

public class MyApplication extends SkygearApplication {
    @Override
    public String getSkygearEndpoint() {
        return "https://<your-app-name>.skygeario.com/";
    }

    @Override
    public String getApiKey() {
        return "<your-api-key>";
    }
}
```

Update `AndroidManifest.xml`
- add `android:name` attribute to `application` tag
- add `android.permission.INTERNET` permission

```html
<uses-permission android:name="android.permission.INTERNET" />
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

#### Option 2: Setting up when your application starts

If you have your own custom application class, you can set up skygear
when your application starts.

``` java
import io.skygear.skygear.Container;
import io.skygear.skygear.Configuration;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        Configuration config = new Configuration.Builder()
                .endPoint("https://<your-app-name>.skygeario.com/")
                .apiKey("<your-api-key>")
                .build();

        Container.defaultContainer(this).configure(config);

        // your code...
    }
}
```

Also, you need to make sure your application has grant
`android.permission.INTERNET` permission in `AndroidManifest.xml`.

```html
<uses-permission android:name="android.permission.INTERNET" />
```

<a name="android-new"></a>
## For new project

### Step 1: Installing Android Studio

We recommend developing Android apps with Skygear Android SDK using
[Android Studio](https://developer.android.com/studio/index.html).

### Step 2: Downloading scaffolding project

Download the repository on GitHub
[SkygearIO/skygear-Scaffolding-Android](https://github.com/SkygearIO/skygear-Scaffolding-Android).
After you have done so, launch Android Studio,
select **Open an existing Android Studio project** and find the scaffolding
project you have just downloaded. Follow any recommendations Android Studio
shows (such as installing the required SDKs) and then you are good to go.

### Step 3: Configure container

Have your `Server EndPoint` and `API Key` ready, open `Terminal` (which can
be found at the bottom of Android Studio), and run the following:

``` bash
./gradlew updateAppSettings
```

And you should see the following:

<pre>
<code class="language-bash">&gt; Building 0% &gt; :updateAppSettings
What is your skygear endpoint (You can find it in portal)?
Example: https://myapp.skygeario.com/
&gt; <span class="token keyword">https://&lt;your-app-name&gt;.skygeario.com/</span>

What is your skygear API key (You can find it in portal)?
Example: dc0903fa85924776baa77df813901efc
&gt; <span class="token keyword">&lt;your-api-key&gt;</span>
:updateAppSettings

BUILD SUCCESSFUL

Total time: 21.326 secs
</code>
</pre>

The script is just modifying `MyApplication.java` file, so you
can manually change the configurations as well.

### We're done, Woo-hoo!

Congratulations, you have your first skygear Android project set up! You
can now launch your App on the emulator and it should look like the following:

[![Screenshot: android scaffolding app preview](/assets/android/android-app-preview.png)](/assets/android/android-app-preview.png)