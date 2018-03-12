// @flow
import { parse as parseDate, differenceInCalendarDays } from "date-fns";
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

  return [...sections.days, sections.buffer];
};

const getEventsState = (state: State) => state.events;

export const selectEvents = (state: State) => getEventsState(state).events;
export const selectEventsLoading = (state: State) =>
  getEventsState(state).loading;
export const selectEventsRefreshing = (state: State) =>
  getEventsState(state).refreshing;

export const selectEventById = (state: State, id: String) =>
  selectEvents(state).find(event => event.sys.id === id);

export const selectEventsGroupedByDay = (state: State): EventDays =>
  groupByStartTime(getEventsState(state).events);
