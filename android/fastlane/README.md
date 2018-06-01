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

### android build_alpha

```
fastlane android build_alpha
```

Build alpha

### android build_beta

```
fastlane android build_beta
```

Build beta

### android build_release

```
fastlane android build_release
```

Build release

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

### android release

```
fastlane android release
```

Build and deploy to Play Store

### android deploy_hockey

```
fastlane android deploy_hockey
```

Deploy to HockeyApp

### android deploy_fabric

```
fastlane android deploy_fabric
```

Deploy to Beta by Fabric

### android deploy_play_store

```
fastlane android deploy_play_store
```

Deploy to Play Store

### android promote_to_production

```
fastlane android promote_to_production
```

Promote to production

---

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
