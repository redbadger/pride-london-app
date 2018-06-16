// @flow
import type { DateRange, Time } from "../data/date-time";
import type { EventCategoryName } from "../data/event";
import type {
  Area,
  Price,
  Audience,
  VenueDetail,
  AccessibilityOption
} from "../data/event-filters";
import type { StandardAction } from "./";

type EventFiltersActionType =
  | "SET_EVENT_FILTERS"
  | "STAGE_EVENT_FILTERS"
  | "COMMIT_EVENT_FILTERS"
  | "CLEAR_STAGED_EVENT_FILTERS"
  | "CLEAR_EVENT_FILTERS";

export type EventFiltersPayload = {
  date?: ?DateRange,
  timeOfDay?: Set<Time>,
  price?: Set<Price>,
  categories?: Set<EventCategoryName>,
  audience?: Set<Audience>,
  venueDetails?: Set<VenueDetail>,
  accessibilityOptions?: Set<AccessibilityOption>,
  area?: Set<Area>
};

export type EventFiltersAction = StandardAction<
  EventFiltersActionType,
  EventFiltersPayload
>;

export const setEventFilters = (updates: EventFiltersPayload) => (
  dispatch: Dispatch<EventFiltersAction>
) => {
  dispatch({
    type: "SET_EVENT_FILTERS",
    payload: updates
  });
};

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

export const clearEventFilters = () => (
  dispatch: Dispatch<EventFiltersAction>
) => dispatch({ type: "CLEAR_EVENT_FILTERS" });
