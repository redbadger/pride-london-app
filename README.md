# Pride in London App

[![CircleCI](https://circleci.com/gh/redbadger/pride-london-app.svg?style=svg&circle-token=9de45c24a3720e16a6d568c0868750e1d0fe8e40)](https://circleci.com/gh/redbadger/pride-london-app)

<!-- Generateed with markdown-toc (https://github.com/jonschlinkert/markdown-toc) -->

<!-- toc -->

* [Running](#running)
  * [`yarn start`](#yarn-start)
  * [`yarn test`](#yarn-test)
  * [`yarn ios`](#yarn-ios)
  * [`yarn android`](#yarn-android)
* [Contributing](#contributing)
* [Links](#links)

<!-- tocstop -->

## Running

This project is built with [Yarn package manager](https://yarnpkg.com). To install yarn:

```bash
npm install -g yarn
```

### `yarn start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

### `yarn test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

### `yarn ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

### `yarn android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools, see [create react native app Readme](./docs/create-react-native-app.md) and the [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup.

## Contributing

All Pull Requests are built by [CircleCI](https://circleci.com/gh/redbadger/workflows/pride-london-app) and deployed to [Expo](https://expo.io/@redbadger/pride-london).

When a build is completed on a branch, [BadgerBot](https://github.com/badgerbot) will comment on your Pull Request with a QR code linking to the deployed version of the branch's app.

All branches built off master are deployed to [Pride London](https://expo.io/@redbadger/pride-london) on Expo.

## Links

* [Ci Pipeline](https://circleci.com/gh/redbadger/workflows/pride-london-app): View and debug builds
* [Expo page](https://expo.io/@redbadger/pride-london): View deployed test builds, and load them into your Expo app.
* [Test build](https://expo.io/@redbadger/pride-london): The latest Expo build off the master branch.
