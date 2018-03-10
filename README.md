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

## Installation and setup

### Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* [Watchman](https://facebook.github.io/watchman/docs/install.html)
* [Install Yarn](https://yarnpkg.com/en/docs/install)
* `$ yarn global add react-native-cli`

More information on getting started can be found here: https://facebook.github.io/react-native/docs/getting-started.html under the `Building prodjects with React Native` tab.

#### General

Clone the repository

`$ git clone git@github.com:redbadger/pride-london-app.git`

And install dependencies

`$ yarn`

#### iOS

* Install Xcode from the App Store and accept the license agreement.
* Run Xcode once so that it can install additional components it will need.

#### Android

* Install [Android Studio](https://developer.android.com/studio/index.html).
* Install the Android SDK and necessary components.
  * Open Android Studio. If this is the first time you open it, it will prompt you to install the Android SDK. You can proceed with the default settings.
  * Select "Open an existing Android Studio project" and select the `./android` folder in this repository. This will help you to get the necessary dependencies installed.
  * Android Studio will automatically try to build the project. You will see the Gradle process running.
  * When dependencies are missing (e.g. SDK Platform or build tools), it will error and show a link to install them (e.g. "Install Build Tool xx.x.x and sync project"). Click on the link (in the Gradle Sync tab) to resolve. Repeat this until you get a BUILD SUCCESSFUL message.
  * It will also automatically create the file `./android/local.properties` with a entry `sdk.dir=<path to your android sdk>`, which is required for the build to work. You will need this in the next step
* Create and start an emulator (aka AVD (Android Virtual Device)).
  * Open Android Studio and click on the AVD Manager icon (4th from the far right) in the toolbar (this will appear when the project compiled correctly).
  * Choose any device you want.
  * Select a system image. Choose a recommended one (e.g. API 27). Click on the download link next to the image name. It will automatically start downloading.
  * Click next through to finish.
  * Start your AVD by clicking the green play button under actions.
* Add `<path to your android sdk>/platform-tools` (find it in `./android/local.properties`) to your `PATH`. This is required because React Native will run `adb` to install the app on your emulator/device. e.g. add
  ```
  export PATH="<path-to-sdk>/platform-tools:$PATH"
  ```
  to your `.bashrc`/`.zshrc`
* Make sure you have Java 8 installed (Java 9 won't work). If you wany, you can point `JAVA_HOME` to the embedded JDK from Android Studio to make sure you have a JDK version, which works with Android.

### Environment Variables

In order to run the application locally you will need to find and add some environment variables to the project. These can be found in `.env.example`. Copy this file into another file called `.env`:

```bash
cp .env.example .env
```

And fill in the required variables from the appropriate developer portals (e.g. app.contentful.com/spaces/\<space-id\>/api/keys) - use the Delivery API key.

## Running

### iOS

* `yarn run-ios [--simulator="iPhone X"]`

### Android

* `yarn run-android`

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
