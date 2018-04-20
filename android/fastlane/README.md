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

## Android

### android test

```
fastlane android test
```

Runs all the tests

### android build_beta

```
fastlane android build_beta
```

Build application

### android build_alpha

```
fastlane android build_alpha
```

Build alpha

### android alpha

```
fastlane android alpha
```

Build and deploy to Alpha lane

### android beta

```
fastlane android beta
```

Build and deploy to Beta lane

### android deploy_play_store_beta

```
fastlane android deploy_play_store_beta
```

Build & Deploy to Play Store Beta channel

### android deploy_hockey

```
fastlane android deploy_hockey
```

Upload to HockeyApp

### android deploy_fabric

```
fastlane android deploy_fabric
```

Upload to Beta by Fabric

### android deploy_store

```
fastlane android deploy_store
```

Upload to Play Store

---

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
