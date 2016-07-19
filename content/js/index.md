Skygear aims to provide a complete and open-source backend solution for your web applications.

By creating an app for each of your web applications on Skygear, each client app can be connected to the Skygear Server with an API key.

This guide will show you how to integrate Skygear into an existing web app project.

<a name="sign-up-hosting"></a>
## Signing up for Skygear Hosting

To start using the Skygear JS SDK, you need to register your account and
application at the Skygear [Developer Portal](https://portal.skygear.io)
website. After you registered, go to the **INFO** tab and copy down your
`Server EndPoint` and `API Key`.


<a name="include-js-sdk"></a>
## Include the SDK in your project

There are several ways to install Skygear JS SDK to you app. You can either:

- Install the stable release on npm
- Install the latest development version

### Install the stable release on npm

You can install Skygear JS SDK via [npm](https://www.npmjs.com/package/skygear).
The SDK package is available on the npm website.

``` bash
npm install skygear --save
```

### Install the latest development version

You can add the development branch GitHub Repository as a submodule in your project.

``` bash
git submodule add https://github.com/SkygearIO/skygear-SDK-JS.git skygear
cd skygear
npm install
cd ..
npm install skygear/
```

### Include in your npm project

The Skygear JS SDK is assumed to be run in ES6 runtime. If you wish to run it in
an older runtime, you need to require the [polyfill plugin](https://babeljs.io/docs/usage/polyfill/)
before importing the Skygear SDK.

``` javascript
import 'babel-polyfill';
import skygear from 'skygear';
```

Please refer to [ReactJS integration](/js/guide/reactjs) for more info.

### Include in your website

Include these two JS files before your own JS files, and then skygear will be
available globally (`window.skygear` or just `skygear`).

``` html
<script src="//code.skygear.io/js/polyfill/latest/polyfill.min.js"></script>
<script src="//code.skygear.io/js/skygear/latest/skygear.min.js"></script>
```

<a name="set-up-app"></a>
## Set up your JS App

<a name="container"></a>
### Set up Container

Container is the uppermost layer of skygear. In practice,
`import skygear from 'skygear'` will give you a container instance at variable
`skygear`. In most cases you will only need one instance of container. Remember
to configure your container with the `Server EndPoint` and `API Key` you get
on Skygear Developer Portal **BEFORE** you make API calls.

``` javascript
import skygear from 'skygear';
// or in the browser with ECMAScript 5 just use window.skygear or skygear

skygear.config({
  'endPoint': 'https://<your-app-name>.skygeario.com/', // trailing slash is required
  'apiKey': '<your-api-key>',
}).then(() => {
  console.log('skygear container is now ready');
}, (error) => {
  console.error(error);
});
```

<a name="whats-next"></a>
## What's Next

Now you've learnt how to start developing with Skygear, check out the SDK docs to learn some of the concepts behind Skygear:

- Learn how to [Authenticate Users](/js/guide/users)
- Learn how to [Save Records](/js/guide/record)
- Learn how to [Make Queries](/js/guide/query)
- [See example app](/js/guide/simple-app)
