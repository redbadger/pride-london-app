// @flow
import R from "ramda";
import { DateTime } from "luxon";
import {
  getHours,
  compareAsc as compareDateAsc,
  isSameDay,
  set as setDate,
  diff as diffDate,
  add as addToDate,
  toFormat as formatDate,
  FORMAT_EUROPEAN_DATE,
  FORMAT_CONTENTFUL_ISO
} from "../lib/date";
import { buildEventFilter } from "./event-filters";
import type { State } from "../reducers";
import type {
  Event,
  FeaturedEvents,
  EventDays,
  Performance,
  PerformancePeriods,
  Reference
} from "../data/event";
import locale from "../data/locale";

const fieldsEventsLocaleLens = R.lensPath(["fields", "events", locale]);
const fieldsPerformancesLocaleLens = R.lensPath([
  "fields",
  "performances",
  locale
]);

export const uniqueEvents = R.uniqBy(element => element.sys.id);

const sortByStartTimeAsc = (a: Event | Performance, b: Event | Performance) =>
  compareDateAsc(a.fields.startTime[locale], b.fields.startTime[locale]);

export const groupEventsByStartTime = (events: Event[]): EventDays =>
  R.groupWith(
    (a: Event, b: Event) =>
      isSameDay(a.fields.startTime[locale], b.fields.startTime[locale]),
    events.sort(sortByStartTimeAsc)
  );

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

export const getTimePeriod = (date: string) => {
  const splits = [6, 12, 18];
  const hours = getHours(date);
  if (hours >= splits[0] && hours < splits[1]) {
    return "Morning";
  } else if (hours >= splits[1] && hours < splits[2]) {
    return "Afternoon";
  }
  return "Evening";
};

export const groupPerformancesByPeriod = (
  performances: Performance[]
): PerformancePeriods => {
  if (performances == null) return [];
  return R.groupWith(
    (a: Performance, b: Performance) =>
      getTimePeriod(a.fields.startTime[locale]) ===
      getTimePeriod(b.fields.startTime[locale]),
    performances.sort(sortByStartTimeAsc)
  );
};

const getDataState = (state: State) => state.data;
const getSavedEventsState = (state: State) => state.savedEvents;
const getEventFiltersState = (state: State) => state.eventFilters;

const addPerformances = (state: State) => (event: Event) => {
  const performances = R.view(fieldsPerformancesLocaleLens, event);
  if (performances) {
    return R.set(
      fieldsPerformancesLocaleLens,
      performances.map(performance =>
        selectPerformanceById(state, performance.sys.id)
      ),
      event
    );
  }
  return event;
};

export const eventIsAfter = (date: DateTime) => (event: Event) => {
  const endTime = DateTime.fromISO(event.fields.endTime[locale]);
  return DateTime.max(date, endTime) === endTime;
};

// Type hack to force array filter to one type https://github.com/facebook/flow/issues/1915
export const selectEvents = (state: State): Event[] =>
  ((getDataState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "event"
  ): any[]): Event[])
    .map(addPerformances(state))
    .filter(eventIsAfter(getEventFiltersState(state).showEventsAfter));

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

export const selectPerformances = (state: State) =>
  ((getDataState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "performance"
  ): any[]): Performance[]);

export const selectEventsLoading = (state: State) =>
  getDataState(state).loading;
export const selectEventsRefreshing = (state: State) =>
  getDataState(state).refreshing;

export const selectEventById = (state: State, id: string): ?Event =>
  selectEvents(state).find(event => event.sys.id === id);

export const selectPerformanceById = (state: State, id: string) =>
  selectPerformances(state).find(performance => performance.sys.id === id);

export const selectFilteredEvents = (
  state: State,
  selectStagedFilters?: boolean = false
) => selectEvents(state).filter(buildEventFilter(state, selectStagedFilters));

export const selectFeaturedEventsByTitle = (state: State, title: string) => {
  const featured = selectFeaturedEvents(state).find(
    entry => entry.fields.title[locale] === title
  );
  if (featured == null) {
    return [];
  }

  return featured.fields.events[locale].reduce((acc, item: Reference) => {
    const event: ?Event = selectEventById(state, item.sys.id);
    if (event) {
      acc.push(event);
    }
    return acc;
  }, []);
};

export const selectSavedEvents = (state: State): Event[] => {
  const events = selectEvents(state);
  const savedEvents = getSavedEventsState(state);
  return events.filter(event => savedEvents.has(event.sys.id));
};
