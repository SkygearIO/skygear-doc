<br/><br/>
<a name="install-js-sdk"></a>
# Install Skygear JS SDK

There are several ways to install Skygear JS SDK to you app. You can either:

- Install the stable release on npm
- Install the latest development version

## Install the stable release on npm

You can install Skygear JS SDK via [npm](https://www.npmjs.com/package/skygear).
The SDK package is available on the npm website.

``` bash
npm install skygear --save
```

## Install the latest development version

You can add the development branch GitHub Repository as a submodule in your project.

``` bash
git submodule git@github.com:skygeario/skygear-server.git
cd skygear
npm install
cd ..
npm install skygear/
```










<br/><br/>
<a name="include-js-sdk"></a>
# Include Skygear JS SDK in your project

## Include in your npm project

The Skygear JS SDK is assumed to be run in ES6 runtime. If you wish to run it in
an older runtime, you need to require the [polyfill plugin](https://babeljs.io/docs/usage/polyfill/)
before importing the Skygear SDK.

``` javascript
import 'babel-polyfill';
import skygear from 'skygear';
```

## Include in your website

Build the Skygear module first (make sure all the tests pass,
if not please check your node version or report an issue):

``` bash
cd skygear
npm test
cd ..
```

Then you can just include the javascript file `skygear/dist/bundle.js` to your
html file like this:

``` html
<script src="/skygear/dist/bundle.js"></script>
```










<br/><br/>
<a name="intro-portal"></a>
# Introduce the portal

To start using the Skygear JS SDK, you need to register your account and
application at the Skygear [portal](https://portal-staging.skygear.io) website.
After you registered, go to the **INFO** tab and copy your `Server EndPoint` and
`API Key`, and right after where you include Skygear JS SDK configure the
skygear container:

``` javascript
import skygear from 'skygear';
// or in the browser with ECMAScript 5 just use window.skygear or skygear

skygear.config({
  'endPoint': 'https://<your-app-name>.staging.skygeario.com/', // trailing slash is required
  'apiKey': '<your-api-key>'
}).then((container) => {
  console.log(container);
}, (error) => {
  console.error(error);
});
```










<br/><br/>
<a name="whats-next"></a>
# What's Next

Now you've learnt how to start developing with Skygear, check out the SDK docs to learn some of the concepts behind Skygear.

Interested in doing more with your Skygear backend server?

The Plugin interface is designed to empower developers to automate, extend, and integrate functionality provided by the Skygear Server with other services and applications. For more information, check out the Plugin docs.
