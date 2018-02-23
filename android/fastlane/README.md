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

### android build

```
fastlane android build
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

### android deploy_hockey

```
fastlane android deploy_hockey
```

Deploy to HockeyApp

---

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
