// @flow
import parseDate from "date-fns/parse";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import getHours from "date-fns/get_hours";
import { buildEventFilter } from "./event-filters";
import type { State } from "../reducers";
import type {
  Asset,
  Event,
  FeaturedEvents,
  EventDays,
  Performance,
  PerformancePeriods
} from "../data/event";

import locale from "../data/locale";

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

export const getTimePeriod = (date: Date) => {
  const splits = [12, 17];
  const hours = getHours(date);
  if (hours >= splits[1]) {
    return "Evening";
  } else if (hours >= splits[0]) {
    return "Afternoon";
  }
  return "Morning";
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

const addPerformances = (state: State) => event => {
  const oldEvent = ((event: any): Event);
  const newEvent: Event = { ...oldEvent };
  if (oldEvent.fields && oldEvent.fields.performances) {
    const performances = (oldEvent.fields.performances[locale].map(
      performance => selectPerformanceById(state, performance.sys.id)
    ): any[]);
    newEvent.fields.performances[locale] = performances;
  }
  return newEvent;
};

// Type hack to force array filter to one type https://github.com/facebook/flow/issues/1915
export const selectEvents = (state: State): Event[] =>
  ((getEventsState(state)
    .entries.filter(entry => entry.sys.contentType.sys.id === "event")
    .map(addPerformances(state)): any[]): Event[]);

export const selectFeaturedEvents = (state: State) =>
  ((getEventsState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "featuredEvents"
  ): any[]): FeaturedEvents[]);

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
