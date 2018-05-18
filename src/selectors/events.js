// @flow
import R from "ramda";
import { DateTime } from "luxon";
import { getHours, compareAsc as compareDateAsc, isSameDay } from "../lib/date";
import { buildEventFilter } from "./event-filters";
import { contentfulFormat } from "../data/formatters";
import type { State } from "../reducers";
import type {
  Event,
  FeaturedEvents,
  EventDays,
  Performance,
  PerformancePeriods
} from "../data/event";
import type { Asset } from "../data/asset";
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

  const startTime = DateTime.fromISO(event.fields.startTime[locale], {
    setZone: true
  });

  const endTime = DateTime.fromISO(event.fields.endTime[locale], {
    setZone: true
  });

  const recurrenceStartTime = startTime.set({
    year: recurrenceYear,
    month: recurrenceMonth,
    day: recurrenceDay
  });

  // $FlowFixMe
  const diff = recurrenceStartTime.diff(startTime);

  const recurrenceEndTime = endTime.plus(diff);

  return R.mergeDeepRight(event, {
    fields: {
      startTime: {
        [locale]: recurrenceStartTime.toFormat(contentfulFormat)
      },
      endTime: {
        [locale]: recurrenceEndTime.toFormat(contentfulFormat)
      },
      recurrenceDates: {
        [locale]: [
          startTime.toFormat("dd/LL/yyyy"),
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

const getEventsState = (state: State) => state.events;
const getSavedEventsState = (state: State) => state.savedEvents;

const addPerformances = (state: State) => event => {
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

// Type hack to force array filter to one type https://github.com/facebook/flow/issues/1915
export const selectEvents = (state: State): Event[] =>
  ((getEventsState(state)
    .entries.filter(entry => entry.sys.contentType.sys.id === "event")
    .map(addPerformances(state)): any[]): Event[]);

export const selectFeaturedEvents = (state: State): FeaturedEvents[] =>
  ((getEventsState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "featuredEvents"
  ): any[]): FeaturedEvents[]).map((entry: FeaturedEvents) =>
    R.set(
      fieldsEventsLocaleLens,
      uniqueEvents(entry.fields.events[locale]),
      entry
    )
  );

export const selectPerformances = (state: State) =>
  ((getEventsState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "performance"
  ): any[]): Performance[]);

export const selectEventsLoading = (state: State) =>
  getEventsState(state).loading;
export const selectEventsRefreshing = (state: State) =>
  getEventsState(state).refreshing;
export const selectAssets = (state: State) => getEventsState(state).assets;

export const selectEventById = (state: State, id: string) =>
  selectEvents(state).find(event => event.sys.id === id);

export const selectPerformanceById = (state: State, id: string) =>
  selectPerformances(state).find(performance => performance.sys.id === id);

export const selectAssetById = (state: State, id: string): Asset =>
  (selectAssets(state).find(asset => asset.sys.id === id): any);

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

  return ((featured.fields.events[locale].map(e =>
    selectEventById(state, e.sys.id)
  ): any): Event[]);
};

export const selectSavedEvents = (state: State) => {
  const events = getEventsState(state).entries;
  const savedEvents = getSavedEventsState(state);
  return ((events.filter(event =>
    savedEvents.has(event.sys.id)
  ): any): Event[]);
};
