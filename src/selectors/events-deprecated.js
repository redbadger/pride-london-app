// @flow
import R from "ramda";
import type { CmsEntry } from "../integrations/cms";
import {
  isSameDay,
  set as setDate,
  diff as diffDate,
  add as addToDate,
  toFormat as formatDate,
  FORMAT_EUROPEAN_DATE,
  FORMAT_CONTENTFUL_ISO
} from "../lib/date";
import type { State } from "../reducers";
import type {
  Event,
  FeaturedEvents,
  Performance,
  Reference
} from "../data/event-deprecated";
import { eventIsAfter } from "./event-filters";
import locale from "../data/locale";

const fieldsEventsLocaleLens = R.lensPath(["fields", "events", locale]);
const fieldsPerformancesLocaleLens = R.lensPath([
  "fields",
  "performances",
  locale
]);

export const uniqueEvents = R.uniqBy(element => element.sys.id);

const generateRecurringEvent = event => recurrence => {
  const [recurrenceDay, recurrenceMonth, recurrenceYear] = recurrence.split(
    "/"
  );

  const startTime = event.fields.startTime[locale];
  const endTime = event.fields.endTime[locale];

  const recurrenceStartTime = setDate(startTime, {
    year: recurrenceYear,
    month: recurrenceMonth,
    day: recurrenceDay
  });

  const difference = diffDate(recurrenceStartTime, startTime);
  const recurrenceEndTime = addToDate(endTime, difference);

  return R.mergeDeepRight(event, {
    fields: {
      startTime: {
        [locale]: formatDate(recurrenceStartTime, FORMAT_CONTENTFUL_ISO)
      },
      endTime: {
        [locale]: formatDate(recurrenceEndTime, FORMAT_CONTENTFUL_ISO)
      },
      recurrenceDates: {
        [locale]: [
          formatDate(startTime, FORMAT_EUROPEAN_DATE),
          ...event.fields.recurrenceDates[locale]
        ]
      }
    },
    sys: {
      id: `${event.sys.id}-recurrence-${recurrence}`
    }
  });
};

// When properly typed CmsEntry[] => CmsEntry[]
// flow inexblicably crashes on server start 💩 (flow-bin v0.67.0)
// $FlowFixMe
export const expandRecurringEventsInEntries = entries =>
  entries.reduce((acc, curr) => {
    if (curr.sys.contentType.sys.id !== "event") {
      return [...acc, curr];
    }

    const recurrenceDates = curr.fields.recurrenceDates
      ? curr.fields.recurrenceDates[locale]
      : [];
    const shouldExpandEvent =
      recurrenceDates.length > 0 && !curr.sys.id.includes("recurrence");

    if (shouldExpandEvent) {
      const clones = recurrenceDates.map(generateRecurringEvent(curr));

      const expandedEvents = R.uniqWith(
        (a: Event, b: Event) =>
          isSameDay(a.fields.startTime[locale], b.fields.startTime[locale]),
        [curr, ...clones]
      );

      return [...acc, ...expandedEvents];
    }
    return [...acc, curr];
  }, []);

const getDataState = (state: State) => state.data;

const addPerformances = (performances: Performance[]) => (event: Event) => {
  const eventPerformances = R.view(fieldsPerformancesLocaleLens, event);
  if (eventPerformances) {
    return R.set(
      fieldsPerformancesLocaleLens,
      eventPerformances.map(performance =>
        selectPerformanceById(performances, performance.sys.id)
      ),
      event
    );
  }
  return event;
};

// Type hack to force array filter to one type https://github.com/facebook/flow/issues/1915
export const selectEventsFromEntries = (entries: CmsEntry[]): Event[] =>
  ((entries.filter(
    entry => entry.sys.contentType.sys.id === "event"
  ): any[]): Event[]).map(
    addPerformances(selectPerformancesFromEntries(entries))
  );

export const selectEvents = (state: State): Event[] =>
  selectEventsFromEntries(getDataState(state).entries);

export const selectFeaturedEvents = (state: State): FeaturedEvents[] =>
  ((getDataState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "featuredEvents"
  ): any[]): FeaturedEvents[]).map((entry: FeaturedEvents) =>
    R.set(
      fieldsEventsLocaleLens,
      uniqueEvents(entry.fields.events[locale]),
      entry
    )
  );

export const selectPerformancesFromEntries = (entries: CmsEntry[]) =>
  ((entries.filter(
    entry => entry.sys.contentType.sys.id === "performance"
  ): any[]): Performance[]);

export const selectPerformances = (state: State) =>
  selectPerformancesFromEntries(getDataState(state).entries);

export const selectEventById = (state: State, id: string): ?Event =>
  selectEvents(state).find(event => event.sys.id === id);

export const selectPerformanceById = (
  performances: Performance[],
  id: string
) => performances.find(performance => performance.sys.id === id);

export const selectFeaturedEventsByTitle = (state: State, title: string) => {
  const featured = selectFeaturedEvents(state).find(
    entry => entry.fields.title[locale] === title
  );
  if (featured == null) {
    return [];
  }

  return featured.fields.events[locale]
    .reduce((acc, item: Reference) => {
      const event: ?Event = selectEventById(state, item.sys.id);
      if (event) {
        acc.push(event);
      }
      return acc;
    }, [])
    .filter(eventIsAfter(state.eventFilters.showEventsAfter));
};
