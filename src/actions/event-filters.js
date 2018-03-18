// @flow
import type { DateOrDateRange, Time } from "../data/date-time";
import type { StandardAction } from "./";

type EventFiltersActionType = "UPDATE_EVENT_FILTERS";
type EventFiltersPayload = {
  date?: ?DateOrDateRange,
  time?: Time[]
};

export type EventFiltersAction = StandardAction<
  EventFiltersActionType,
  EventFiltersPayload
>;

/* eslint-disable import/prefer-default-export */
export const updateEventFilters = (updates: EventFiltersPayload) => (
  dispatch: Dispatch<EventFiltersAction>
) => {
  dispatch({
    type: "UPDATE_EVENT_FILTERS",
    payload: updates
  });
};
