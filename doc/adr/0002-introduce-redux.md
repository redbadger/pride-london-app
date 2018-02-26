# 1. Record architecture decisions

Date: 2018-02-25

## Status

Accepted

## Context

We were interested in pushing the project until we felt we needed redux to see how necessary it really was.

## Decision

We added redux to the project relatively early

## Consequences

Redux involves writing a lot of boilerplate and learning a new system. However at this stage we feel redux would be useful for:

* Abstracting Syncing and fetching logic further away from pages.
* Make in-memory data easier to access from page to page, and avoid us having to pass data around through the strange react-navigation api.
* Abstracting logic for sorting and filtering of events with the use of actions and selectors.
* Provide a clear place to put logic for future pages and components.
