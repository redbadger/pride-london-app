// @flow
import parseDate from "date-fns/parse";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import { buildEventFilter } from "./event-filters";
import type { State } from "../reducers";
import type { Event, FeaturedEvents, EventDays } from "../data/event";

const locale = "en-GB";

const groupByStartTime = (events: Event[]): EventDays => {
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

const getEventsState = (state: State) => state.events;

// Type hack to force array filter to one type https://github.com/facebook/flow/issues/1915
export const selectEvents = (state: State): Event[] =>
  ((getEventsState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "event"
  ): any[]): Event[]);
export const selectFeaturedEvents = (state: State) =>
  ((getEventsState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "featuredEvents"
  ): any[]): FeaturedEvents[]);

export const selectEventsLoading = (state: State) =>
  getEventsState(state).loading;
export const selectEventsRefreshing = (state: State) =>
  getEventsState(state).refreshing;
export const selectAssets = (state: State) => getEventsState(state).assets;

export const selectEventById = (state: State, id: string) =>
  selectEvents(state).find(event => event.sys.id === id);

export const selectAssetById = (state: State, id: string) =>
  selectAssets(state).find(asset => asset.sys.id === id);

export const selectFilteredEvents = (state: State) =>
  selectEvents(state).filter(buildEventFilter(state));

export const selectFilteredEventsGroupedByDay = (state: State): EventDays =>
  groupByStartTime(selectFilteredEvents(state));

export const selectFeaturedEventsByTitle = (state: State, title: string) => {
  const featured = selectFeaturedEvents(state).find(
    entry => entry.fields.title[locale] === title
  );
  if (featured == null) {
    return [];
  }
  return featured.fields.events[locale].map((e: Event) =>
    selectEventById(state, e.sys.id)
  );
};
