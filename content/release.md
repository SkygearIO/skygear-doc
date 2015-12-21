+++
date = "2015-12-21T10:38:57+08:00"
draft = true
title = "Release cycle"

+++

# Release cycle

Every WED.

- Upload `py-skygear` to pypi as `skygear`
- Docker Hub automatically build `skygeario/py-skygear` triggered by git push
- Upload `skygear-SDK-iOS` to cocoapods as `SKYKit`
- Upload `skygear-SDK-JS` to npm as `skygear`

# Version number

Version number conforms to `x.y.z` format. For each release cycle, `y`
is incremented by 1. The same `x.y` corresponds to the tag of skygear and it
will stay the same for all above modules during the release cycle.
For hot fix within a release cycle, increment `z`
by 1 and `z` is reset to 0 on the next release cycle.

# How to relase?

## py-skygear

1. Change the version number at `setup.py`
2. run `python setup.py sdist upload`
3. Tag as `vx.y.z` and push to SkygearIO/py-skygear

Example:

```shell
$ edit setup.py
$ python setup.py sdist upload
$ git tag -a v0.1.0
$ git push --follow-tags upstream v0.1.0
```

## skygear-SDK-iOS

1. Change the version number at `SKYKit.podspec`
2. run `pod trunk push SKYKit.podspec`
3. Tag as `x.y.z` and push to SkygearIO/skygear-SDK-iOS

## skygear-SDK-JS

1. Change the version number at `package.json`
2. run `npm publish`
3. Tag as `vx.y.z` and push to SkygearIO/skygear-SDK-JS
