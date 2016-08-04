<a name="sdk-existing"></a>
## For existing project

### Step 1: Installing SDK

#### Scenario 1: HTML5 project

``` html
<script src="//code.skygear.io/js/polyfill/latest/polyfill.min.js"></script>
<script src="//code.skygear.io/js/skygear/latest/skygear.min.js"></script>
<script> console.log(skygear); // it's here! </script>
```

#### Scenario 2: Node.js project

Skygear JS SDK can be directly used in Node.js environment. Simply install it
via [npm](https://www.npmjs.com) and require it in your project.

``` bash
npm install skygear --save
```

Using [Babel](https://babeljs.io/) with ES6 syntax is recommended (but not
required).

``` javascript
import skygear from 'skygear';
```

If you are using Node.js v0.12 or before, please make sure that
you require [Babel Polyfill](https://babeljs.io/docs/usage/polyfill/).

``` javascript
require('babel-polyfill');
var skygear = require('skygear');
```

#### Scenario 3: For webpack project

If you wish to use [webpack](https://webpack.github.io/) to bundle up your
front end JavaScript code together with Skygear JS SDK, simply modify your
webpack configuration file (by default `webpack.config.js`) to include the
following:

``` javascript
module.exports = {
  /* your own configurations */
  externals: {
    'react-native': 'undefined',  // don't include react-native
    'websocket': 'undefined'      // don't include node.js websocket
  }
}
```

Then you can `require('skygear')` in your front end code. You are also welcomed
to use bundler of your choice, but bear in mind that you need to "exclude"
React Native and Node.js Websocket. Also, Skygear JS SDK needs
[Babel Polyfill](https://babeljs.io/docs/usage/polyfill/).

#### Scenario 4: For React Native project

The SDK works with [React Native](https://facebook.github.io/react-native/)
well. Simply do `npm install --save skygear` and then you can
`import skygear from 'skygear'` in your `index.ios.js` and `index.android.js`.

### Step 2: Configuring container

In all usage scenario after you have installed the SDK, you must configure your
skygear container (`skygear`) with the `Server EndPoint` and `API Key` you get
on Skygear Developer Portal **BEFORE** you make any API calls.

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

<a name="sdk-new"></a>
## For new project

Following the steps below will help you set up a new scaffolding project with
Skygear JS SDK. React.js, Babel 6 and Webpack are also automatically
included and configured.

### Step 1: Installing Node.js

We recommend setting up the build system using [Node.js](https://nodejs.org).
To install `node` and package manager `npm`, simply do:

``` bash
# for MacOS
brew install node

# for Debian/Ubuntu
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

If you are using a different operating system, please see this
[page](https://nodejs.org/en/download) for installing Node.js.
If bash shell is not available on your machine (such as Windows),
we recommend using [GitBash](https://git-scm.com/downloads).

### Step 2: Installing and running yeoman generator

After Node.js is installed, we suggest using [Yeoman](http://yeoman.io/) to
dynamically generate your project. Make use you have your Skygear
`Server EndPoint` and `API Key` ready before you proceed.

``` bash
# install yeoman and skygear generator globally
npm install -g yo
npm install -g generator-skygear

# create your project folder
mkdir new-skygear-project
cd new-skygear-project

# generate your project
yo skygear
```

### Step 3: Answering the questions for generator

You will then be prompted a few questions, please make sure that you
answer these questions correctly:
- What is your skygear endpoint?
- What is your skygear API key?
- Please choose your application name?
- Overwrite `<some-path>/<some-file>.js`? (confirm to overwrite)

### We're done, Woo-hoo!

Congratulations, you have your first skygear web project set up!
[React.js](https://facebook.github.io/react/), [Babel](https://babeljs.io/)
and [Webpack](https://webpack.github.io/) are automatically included for you.
To launch your first application, simply do `npm start`.
