+++
date = "2015-12-21T10:38:57+08:00"
draft = true
title = "Release cycle"

+++

# Release cycle

Every WED.

- `py-skygear` will upload to pypi as `skygear`
- `py-skygear` will upload to hub.docker.com as `skygeario/py-skygear`
- `skygear-SDK-iOS` will upload to cocoapods as `SKYKit`
- `skygear-SDK-JS` will upload to npm as `skygear`

# Version number

`x.y.z` will be used. For same relase cycle, `x.y` will equal to all above 4 
module, and a corresponding tag at skygear. `y` is left for hot fix before the
next release cycle.

# How to relase?

## py-skygear

1. Change the version number at `setup.py`
2. run `python setup.py sdist upload`
3. Tag as `vx.y.z` and push to SkygearIO/py-skygear

## skygear-SDK-iOS

1. Change the version number at `SKYKit.podspec`
2. run `pod trunk push SKYKit.podspec`
3. Tag as `x.y.z` and push to SkygearIO/skygear-SDK-iOS

## skygear-SDK-JS

1. Change the version number at `package.json`
2. run `npm publish`
3. Tag as `vx.y.z` and push to SkygearIO/skygear-SDK-JS
