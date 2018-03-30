// @flow
import type { DateOrDateRange, Time } from "../data/date-time";
import type { StandardAction } from "./";

type EventFiltersActionType =
  | "STAGE_EVENT_FILTERS"
  | "COMMIT_EVENT_FILTERS"
  | "CLEAR_STAGED_EVENT_FILTERS";
type EventFiltersPayload = {
  date?: ?DateOrDateRange,
  time?: Set<Time>
};

export type EventFiltersAction = StandardAction<
  EventFiltersActionType,
  EventFiltersPayload
>;

export const stageEventFilters = (updates: EventFiltersPayload) => (
  dispatch: Dispatch<EventFiltersAction>
) => {
  dispatch({
    type: "STAGE_EVENT_FILTERS",
    payload: updates
  });
};

export const commitEventFilters = () => (
  dispatch: Dispatch<EventFiltersAction>
) => dispatch({ type: "COMMIT_EVENT_FILTERS" });

export const clearStagedEventFilters = () => (
  dispatch: Dispatch<EventFiltersAction>
) => dispatch({ type: "CLEAR_STAGED_EVENT_FILTERS" });
