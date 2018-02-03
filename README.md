# Pride in London App

[![CircleCI](https://circleci.com/gh/redbadger/pride-london-app.svg?style=svg&circle-token=9de45c24a3720e16a6d568c0868750e1d0fe8e40)](https://circleci.com/gh/redbadger/pride-london-app)

<!-- Generateed with markdown-toc (https://github.com/jonschlinkert/markdown-toc) -->

<!-- toc -->

* [Running](#running)
  * [Prerequisites](#prerequisites)
  * [Environment Variables](#environment-variables)
  * [Running](#running-1)
    * [iOS](#ios)
    * [Android](#android)
* [Contributing](#contributing)
* [Links](#links)

<!-- tocstop -->

## Running

### Prerequisites

* Install Xcode from the App Store and accept the license agreement.
* `brew install node`
* `brew install watchman`
* `yarn global add react-native-cli`

More information on getting started can be found here: https://facebook.github.io/react-native/docs/getting-started.html under the `Building prodjects with React Native` tab.

### Environment Variables

In order to run the application locally you will need to find and add some environment variables to the project. These can be found in `.env.example`. Copy this file into another file called `.env`:

```bash
cp .env.example .env
```

And fill in the required variables from the appropriate developer portals (e.g. app.contentful.com/spaces/\<space-id\>/api/keys).

### Running

#### iOS

* `yarn run-ios [--simulator="iPhone X"]`

#### Android

The quickest way is to have an Android device connected with [unknown sources enabled](https://www.androidcentral.com/unknown-sources)

* `yarn run-android`

Instructions for setting up an Android emulator can be found [here](https://developer.android.com/studio/run/emulator.html)

## Contributing

Pieces of work currently up for grabs will be listed on the [issues page](https://github.com/redbadger/pride-london-app/issues) and tracked on the [projects page](https://github.com/redbadger/pride-london-app/projects). If you are able to work on the piece of work, comment on the issue. You can also discuss the feature in the isssue page. Be honest about if you have the time to work on it, there's no shame in parking a piece of work and letting someone else pick it up if you're too busy.

All Pull Requests are built by [CircleCI](https://circleci.com/gh/redbadger/workflows/pride-london-app)
Merging a Pull Request to the master branch will trigger a build number increase and deploy to TestFight for iOS device testing.

Submit your Pull Request from a repo fork and one of the core dev team will review and merge it.

## Links

* [CI Pipeline](https://circleci.com/gh/redbadger/workflows/pride-london-app): View and debug builds
