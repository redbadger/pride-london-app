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

#### Template for reporting bugs:

Give your issue a descriptive `Title` that helps identify the nature of the problem at first glance.

In the body of the issue, please provide the following information:

### Description of issue

Describe the error in as much detail as possible.

### Expected behaviour

If it's a functional issue, describe what would have been the correct behaviour.

### Steps to reproduce

List the exact steps you took to arrive at the issue.

### OS / Browser / Device model

List all the devices and browsers effected, with specific version numbers.

## Screenshots

If it's a visual bug, please provide screenshots or screen captures.
