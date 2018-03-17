// @flow
import {
  buildDateFilter,
  buildDateRangeFilter,
  buildTimeFilter
} from "./basic-event-filters";
import type { Event } from "../data/event";
import type { DateOrDateRange } from "../data/date-time";
import type { State } from "../reducers";

const getEventFiltersState = (state: State) => state.eventFilters;

export const selectDateFilter = (state: State) =>
  getEventFiltersState(state).date;
export const selectTimeFilter = (state: State) =>
  getEventFiltersState(state).time;

const buildDateOrDateRangeFilter = (date: DateOrDateRange) =>
  typeof date === "string" ? buildDateFilter(date) : buildDateRangeFilter(date);

export const buildEventFilter = (state: State) => {
  const { date, time } = getEventFiltersState(state);
  const dateFilter: (event: Event) => boolean = date
    ? buildDateOrDateRangeFilter(date)
    : () => true;
  const timeFilter = buildTimeFilter(time);

  return (event: Event) => dateFilter(event) && timeFilter(event);
};
