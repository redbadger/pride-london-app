// @flow
import parseDate from "date-fns/parse";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import getHours from "date-fns/get_hours";
import isSameDay from "date-fns/is_same_day";
import isBefore from "date-fns/is_before";
import R from "ramda";
import { buildEventFilter } from "./event-filters";
import { formatContentfulDate } from "../data/formatters";

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

export const groupEventsByStartTime = (events: Event[]): EventDays => {
  const sections = events
    .sort(
      (a: Event, b: Event) =>
        parseDate(a.fields.startTime[locale]) -
        parseDate(b.fields.startTime[locale])
    )
    .reduce(
      ({ days, buffer }, event) => {
        if (buffer.length < 1) return { days, buffer: [event] };

        const previous: Event = buffer[buffer.length - 1];
        const diff = differenceInCalendarDays(
          parseDate(previous.fields.startTime[locale]),
          parseDate(event.fields.startTime[locale])
        );

        if (diff !== 0) return { days: [...days, buffer], buffer: [event] };

        return { days, buffer: [...buffer, event] };
      },
      { days: [], buffer: [] }
    );

  return sections.buffer.length > 0
    ? [...sections.days, sections.buffer]
    : sections.days;
};

const generateRecurringEvent = event => recurrance => {
  const [recurranceDay, recurrancyMonth, recurranceYear] = recurrance.split(
    "/"
  );
  const [eventStartDate, eventStartTime] = event.fields.startTime[locale].split(
    "T"
  );
  const eventEndTime = event.fields.endTime[locale].split("T")[1];
  const [eventStartYear, eventStartMonth, eventStartDay] = eventStartDate.split(
    "-"
  );

  const recurrenceStartDate = formatContentfulDate(
    recurranceYear,
    recurrancyMonth,
    recurranceDay,
    eventStartTime
  );

  const shouldModifyEndTime =
    isSameDay(event.fields.startTime[locale], event.fields.endTime[locale]) ||
    isBefore(event.fields.endTime[locale], recurrenceStartDate);

  const recurrenceEndDate = shouldModifyEndTime
    ? formatContentfulDate(
        recurranceYear,
        recurrancyMonth,
        recurranceDay,
        eventEndTime
      )
    : event.fields.endTime[locale];

  return R.mergeDeepRight(event, {
    fields: {
      startTime: {
        [locale]: recurrenceStartDate
      },
      endTime: {
        [locale]: recurrenceEndDate
      },
      recurrenceDates: {
        [locale]: [
          `${eventStartDay}/${eventStartMonth}/${eventStartYear}`,
          ...event.fields.recurrenceDates[locale]
        ]
      }
    },
    sys: {
      id: `${event.sys.id}-recurrence-${recurrance}`
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
      return [...acc, curr, ...clones];
    }
    return [...acc, curr];
  }, []);

export const getTimePeriod = (date: Date) => {
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
  const sections = performances
    .sort(
      (a: Performance, b: Performance) =>
        parseDate(a.fields.startTime[locale]) -
        parseDate(b.fields.startTime[locale])
    )
    .reduce(
      ({ periods, buffer }, performance) => {
        if (buffer.length < 1) return { periods, buffer: [performance] };

        const previous: Performance = buffer[buffer.length - 1];

        if (
          getTimePeriod(parseDate(previous.fields.startTime[locale])) !==
          getTimePeriod(parseDate(performance.fields.startTime[locale]))
        )
          return { periods: [...periods, buffer], buffer: [performance] };

        return { periods, buffer: [...buffer, performance] };
      },
      { periods: [], buffer: [] }
    );

  return sections.buffer.length > 0
    ? [...sections.periods, sections.buffer]
    : sections.periods;
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
