+++
date = "2015-09-24T17:58:08+08:00"
draft = true
title = "Installing Javascript SDK"

+++

# Using npm

``` bash
npm install skygear --save
```

# Install the latest

``` bash
git submodule git@github.com:skygeario/skygear-server.git
cd skygear
npm install
cd ..
npm install skygear/
```

# Include in react-native
``` js
require('babel-polyfill');
var React = require('react-native');

/* ... */

var skygear = require('skygear');
```

# Include in your website

``` html
<script src="//cdn.skygear.io/polyfill.min.js"></script>
<script src="//cdn.skygear.io/skygear.js"></script>
```
