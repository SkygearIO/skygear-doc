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

### For existing projects

#### For HTML5 project

``` html
<script src="//code.skygear.io/js/polyfill/latest/polyfill.min.js"></script>
<script src="//code.skygear.io/js/skygear/latest/skygear.min.js"></script>
<script> console.log(skygear); // it's here! </script>
```

#### For npm project

Skygear JS SDK can be directly used in Node.js environment. Simply install
[npm](https://www.npmjs.com) and require it in your project.

``` bash
npm install skygear --save
```

``` javascript
// server.js
var skygear = require('skygear');
```

Or it certainly works in ES6 syntax using [Babel](https://babeljs.io/).

``` javascript
// server.js
import skygear from 'skygear';
```

However, if you are using Node.js v0.12 or before, please make sure that
you require [Babel Polyfill](https://babeljs.io/docs/usage/polyfill/).

``` javascript
// server.js
require('babel-polyfill');
var skygear = require('skygear');
```

#### For webpack project

If you wish to use [webpack](https://webpack.github.io/) to bundle up your
front end JavaScript code, please read [this guide](/js/guide/reactjs) about
Skygear JS SDK integration with React.js using Babel and Webpack. You are also
welcomed to use bundler of your choice, but bear in mind that there might be
conditional require issues and make sure
[Babel Polyfill](https://babeljs.io/docs/usage/polyfill/) is included.

### For new projects

Please refer to this [Scaffolding](/coming-soon) project on Github.

<a name="set-up-app"></a>
## Set up your JS App

Remember to configure your skygear container (variable `skygear` is the default
container instance) with the `Server EndPoint` and `API Key` you get on Skygear
Developer Portal **BEFORE** you make API calls.

``` javascript
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
