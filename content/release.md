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

## Preparation

```shell
$ export GITHUB_TOKEN=abcdef1234
$ export SKYGEAR_VERSION="0.5.0"
$ export KEY_ID="12CDA17C"

$ brew install github-release
$ brew install gpg2
```

## skygear

```shell
# Draft new release changelog
$ git log --first-parent `git describe --abbrev=0`.. > new-release
$ edit new-release
$ github-release release -u oursky -r skygear --draft --tag v$SKYGEAR_VERSION --name "v$SKYGEAR_VERSION" --pre-release --description "`cat new-release`"
$ open https://github.com/oursky/skygear/releases/edit/v$SKYGEAR_VERSION

# Update changelog
$ edit CHANGELOG.md
$ git commit -m "Update CHANGELOG for v$SKYGEAR_VERISON"

# Tag and push commit
$ git tag -a v$SKYGEAR_VERSION -s -u $KEY_ID -m "Release v$SKYGEAR_VERISON"
$ git push --follow-tags origin v$SKYGEAR_VERSION

# Click `Publish release` in github release page
```

## py-skygear

```shell
# Draft new release changelog
$ git log --first-parent `git describe --abbrev=0`.. > new-release
$ edit new-release
$ github-release release -u oursky -r py-skygear --draft --tag v$SKYGEAR_VERSION --name "v$SKYGEAR_VERSION" --pre-release --description "`cat new-release`"
$ open https://github.com/oursky/py-skygear/releases/edit/v$SKYGEAR_VERSION
$ github-release release -u skygeario -r py-skygear --draft --tag v$SKYGEAR_VERSION --name "v$SKYGEAR_VERSION" --pre-release --description "`cat new-release`"
$ open https://github.com/skygeario/py-skygear/releases/edit/v$SKYGEAR_VERSION

# Update changelog and version number
$ edit CHANGELOG.md
$ sed -i "" 's/version=".*"/version="$SKYGEAR_VERSION"/' setup.py
$ git add CHANGELOG.md setup.py
$ git commit -m "Update CHANGELOG for v$SKYGEAR_VERSION"

# Release to pypi
$ python setup.py sdist upload

# Tag and push commit
$ git tag -a v$SKYGEAR_VERSION -s -u $KEY_ID -m "Release v$SKYGEAR_VERSION"
$ git push --follow-tags origin v$SKYGEAR_VERSION
$ git push --follow-tags skygeario v$SKYGEAR_VERSION

# Click `Publish release` in github release page
```

## skygear-SDK-iOS

**IMPORTANT**: Note that Cocoapods does not allow tag prefixed with `v`.
Therefore the tag name is different from other projects.

**IMPORTANT**: Cocoapods requires that that tag is pushed to repo before
it will accept a new release.

```shell
# Draft new release changelog
$ git log --first-parent `git describe --abbrev=0`.. > new-release
$ edit new-release
$ github-release release -u oursky -r skygear-SDK-iOS --draft --tag $SKYGEAR_VERSION --name "$SKYGEAR_VERSION" --pre-release --description "`cat new-release`"
$ open https://github.com/oursky/skygear-SDK-iOS/releases/edit/$SKYGEAR_VERSION
$ github-release release -u skygeario -r skygear-SDK-iOS --draft --tag $SKYGEAR_VERSION --name "$SKYGEAR_VERSION" --pre-release --description "`cat new-release`"
$ open https://github.com/skygeario/skygear-SDK-iOS/releases/edit/$SKYGEAR_VERSION

# Update changelog and version number
$ edit CHANGELOG.md
$ edit SKYKit.podspec
$ git add CHANGELOG.md SKYKit.podspec
$ git commit -m "Update CHANGELOG for $SKYGEAR_VERSION"

# Test podspec before pushing
$ pod spec --verbose lint SKYKit.podspec

# Tag and push commit
$ git tag -a $SKYGEAR_VERSION -s -u $KEY_ID -m "Release $SKYGEAR_VERSION"
$ git push --follow-tags origin $SKYGEAR_VERSION
$ git push --follow-tags skygeario $SKYGEAR_VERSION

# Push commit to Cocoapods
$ pod trunk push SKYKit.podspec

# Click `Publish release` in github release page
```

## skygear-SDK-JS

```shell
# Draft new release changelog
$ git log --first-parent `git describe --abbrev=0`.. > new-release
$ edit new-release
$ github-release release -u oursky -r skygear-SDK-JS --draft --tag v$SKYGEAR_VERSION --name "v$SKYGEAR_VERSION" --pre-release --description "`cat new-release`"
$ open https://github.com/oursky/skygear-SDK-JS/releases/edit/v$SKYGEAR_VERSION
$ github-release release -u skygeario -r skygear-SDK-JS --draft --tag v$SKYGEAR_VERSION --name "v$SKYGEAR_VERSION" --pre-release --description "`cat new-release`"
$ open https://github.com/skygeario/skygear-SDK-JS/releases/edit/v$SKYGEAR_VERSION

# Update changelog and version number
$ edit CHANGELOG.md
$ edit package.json
$ git add CHANGELOG.md package.json
$ git commit -m "Update CHANGELOG for v$SKYGEAR_VERSION"

# Release to npm
$ npm publish

# Tag and push commit
$ git tag -a v$SKYGEAR_VERSION -s -u $KEY_ID -m "Release v$SKYGEAR_VERSION"
$ git push --follow-tags origin v$SKYGEAR_VERSION
$ git push --follow-tags skygeario v$SKYGEAR_VERSION

# Click `Publish release` in github release page
```
