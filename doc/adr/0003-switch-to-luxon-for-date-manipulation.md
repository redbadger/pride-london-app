# 3. Switch to luxon for date manipulation

Date: 2018-05-18

## Status

Accepted

## Context

Dates are hard. Whilst this app does not require much date manipulation across timezones, we need to make sure that anybody in the world at any time sees the right date and time for a pride event as it will be in London on the day it happens. We have noticed some issues with our current date library `date-fns` which reformats date strings in some situations to represent that date for the location the current device is in. This is an issue with javascript, but it's not paved over by the library.

## Decision

Switch all date manipulation to use the library `luxon`. Luxon is a cousin of `moment.js` with a slightly different API and immutable data. Luxon comes with full timezone support, and allows you to parse ISO date strings without manipulating the defined timezone in that string.

## Consequences

New bugs might be introduced as a result of not understanding the nuances of this library. We were able to switch to Luxon with minimal changes to unit tests, which at least suggests we have avoided regressions.
