// @flow
import parseDate from "date-fns/parse";
import differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import { buildEventFilter } from "./event-filters";
import type { State } from "../reducers";
import type { Event, EventDays } from "../data/event";

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

export const selectEvents = (state: State): Event[] =>
  ((getEventsState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "event"
  ): any[]): Event[]);
export const selectFeaturedEvents = (state: State) =>
  getEventsState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "featuredEvents"
  );
export const selectEventsLoading = (state: State) =>
  getEventsState(state).loading;
export const selectEventsRefreshing = (state: State) =>
  getEventsState(state).refreshing;
export const selectAssets = (state: State) => getEventsState(state).assets;

export const selectEventById = (state: State, id: String) =>
  selectEvents(state).find(event => event.sys.id === id);

export const selectAssetById = (state: State, id: String) =>
  selectAssets(state).find(asset => asset.sys.id === id);

export const selectFilteredEvents = (state: State) =>
  selectEvents(state).filter(buildEventFilter(state));

export const selectFilteredEventsGroupedByDay = (state: State): EventDays =>
  groupByStartTime(selectFilteredEvents(state));
