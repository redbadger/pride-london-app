# fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using

```
[sudo] gem install fastlane -NV
```

or alternatively using `brew cask install fastlane`

# Available Actions

## iOS

### ios test

```
fastlane ios test
```

Runs all the tests

### ios build

```
fastlane ios build
```

Signed build

### ios alpha

```
fastlane ios alpha
```

Alpha build and deploy

### ios beta

```
fastlane ios beta
```

Beta build and deploy

### ios release

```
fastlane ios release
```

Build and Deploy a release to iTunes Connect

### ios promote_to_production

```
fastlane ios promote_to_production
```

Promote to Production

### ios deploy_testflight

```
fastlane ios deploy_testflight
```

Upload to TestFlight and notify testers

### ios deploy_hockey

```
fastlane ios deploy_hockey
```

Upload to HockeyApp

### ios deploy_fabric

```
fastlane ios deploy_fabric
```

Upload to Beta by Fabric

### ios devices

```
fastlane ios devices
```

Add devices

### ios refresh_dsyms

```
fastlane ios refresh_dsyms
```

---

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
