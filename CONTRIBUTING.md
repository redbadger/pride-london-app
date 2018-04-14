# Contributing to Pride in London app

If you're interested in contributing code, be it a simple bug fix or a feature
to the Pride app, this document should hopefully be helpful to get your
changes in as smoothly as possible.

## Contributing code

### Pull requests

The Pride app follows a standard [Github flow](https://guides.github.com/introduction/flow/).
Start by forking the repo and starting a branch off of `master`. We do what
we can to keep the `master` branch working using automated testing and
continuous integration ([CircleCI](https://circleci.com/)).

Pick a short but descriptive brach name. We encourage you to open a Pull Request
early, you can mark it as work in progress by adding '[WIP]' to the title. This
helps us to provide feedback on your implementation early.

Try to make pull requests as small as they can be, it makes them easier to
review and quicker to integrate. It's ok to split a single feature across
multiple PRs as long as the app works fine and the UX isn't negatively
impacted after each pull request.

Try and provide a thorough description of what you've done and some reasoning
behind it, so that reviews can be done quickly and minimal back and forth is
required.

### Code style

Code style is checked and enforced by [Prettier](https://prettier.io/), we
highly recommend installing an extension for your favourite editor and
formatting on save.

Basic static analysis is done by [ESLint](https://eslint.org/), most editor
support error highlighting, which is also highly recommended.

### Accessibility

Follow these tips to make new features accessible:

* Use our `Touchable` component for all touchable components (e.g. buttons). It applies the button trait and a minimum size of 44x44 by default.
* Use the correct [`accessibilityTraits`](http://facebook.github.io/react-native/docs/accessibility.html#accessibilitytraits-ios) and [`accessibilityComponentType`](http://facebook.github.io/react-native/docs/accessibility.html#accessibilitycomponenttype-android).
* Make sure all touchable components have a hit area of at least 44x44.
* If a button only contains an image, make sure to add an `accessibilityLabel`.
* Try not to use fixed width/height for anything containing text. It will break when users scale the font size on their device. If it's difficult to do just using minWidth/minHweight, use `height: 44 * PixelRatio.getFontScale()` instead.

### Unit tests and test coverage

Pride app uses [Jest](https://facebook.github.io/jest/) as a test runner. Run

```
$ yarn test
```

to run unit tests. When working on a feature it may be useful to run Jest in
watch mode by

```
$ yarn test --watch
```

(You may need to use `-- --watch` if you have an older version of yarn)

Tests are collocated with the files they are testing, with an extra `.test` in
front of the extention (e.g. `events.test.js`).

In tests, prefer `describe`, `it` and `expect` as the structure of a test
suite and expectation syntax.

#### Coverage

Test coverage is calculated by Code Climate and reported on pull requests.
We don't have any specific target (because it's an easy metric to game and
the coverage itself is not the point, only an indicator), but test coverage
should not drop with changes.

## Reporting bugs

If you find a bug, please report it by creating an issue [on the issues page](https://github.com/redbadger/pride-london-app/issues) of the repo.
Give your issue a descriptive `Title` that helps identify the nature of the problem at first glance.
