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
  * [Debugging](#debugging)
* [Generating test data](#generating-test-data)
* [Contributing](#contributing)
  * [Architecture Decision Records](#architecture-decision-records)
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

### Debugging

The recommended tool for debugging is [React Native Debugger](https://github.com/jhen0409/react-native-debugger) which has built in support for Redux Devtools.

To install React Native Debugger:

```bash
brew update && brew cask install react-native-debugger
```

Then to debug:

1. Close any other debugger windows you have open
1. Open the App from your Applications folder
1. Start debugging in the app using one of the following methods:

| Platform    | Command                                                                           |
| ----------- | --------------------------------------------------------------------------------- |
| **iOS**     | Press Cmd+R to reload, Cmd+D or shake for dev.                                    |
| **Android** | Double tap R on your keyboard to reload, shake or press menu button for dev menu. |

## Generating test data

In order to fill the test CMS space with test data you can use our `generate-content` script. It goes without saying make sure you are doing this on a test CMS rather than production.

To generate test data:

```bash
node ./scripts/generate-content.js generate -s <space_id> -a <access_token>
```

To delete the generated data again:

```bash
node ./scripts/generate-content.js delete -s <space_id> -a <access_token>
```

## Contributing

Pieces of work currently up for grabs will be listed on the [issues page](https://github.com/redbadger/pride-london-app/issues) and tracked on the [projects page](https://github.com/redbadger/pride-london-app/projects). If you are able to work on the piece of work, comment on the issue. You can also discuss the feature in the isssue page. Be honest about if you have the time to work on it, there's no shame in parking a piece of work and letting someone else pick it up if you're too busy.

All Pull Requests are built by [CircleCI](https://circleci.com/gh/redbadger/workflows/pride-london-app)
Merging a Pull Request to the master branch will trigger a build number increase followed by a deploy to TestFight for iOS devices and to HockeyApp for Android devices.

Submit your Pull Request from a repo fork and one of the core dev team will review and merge it.

### Architecture Decision Records

We will keep a collection of records for "architecturally significant" decisions: those that affect the structure, non-functional characteristics, dependencies, interfaces, or construction techniques.

When making such changes please include a new ADR in your PR for future prosperity.

* Install `adr-tools`: https://github.com/npryce/adr-tools
* To create a new record: `adr new Implement as Unix shell scripts`

To find out more about ADRs have a read of this article: http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions

## Links

* [CI Pipeline](https://circleci.com/gh/redbadger/workflows/pride-london-app): View and debug builds
