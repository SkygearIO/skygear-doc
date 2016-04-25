## Using latest stable release on npm

``` bash
npm install skygear --save
```

## Install the latest development version

``` bash
git submodule git@github.com:skygeario/skygear-server.git
cd skygear
npm install
cd ..
npm install skygear/
```

## Include in your npm project

Since skygear-SDk-JS is develop by assuming ES6 runtime. If you want to run it
on older runtime, you need to require the polyfill before import skygear

``` js
import 'babel-polyfill';
import skygear from 'skygear';
```

## Include in react-native

``` js
require('babel-polyfill');
var React = require('react-native');

/* ... */

var skygear = require('skygear');
```

## Include in your website __NOT IMPLEMENTED__

``` html
<script src="//cdn.skygear.io/polyfill.min.js"></script>
<script src="//cdn.skygear.io/skygear.js"></script>
```
