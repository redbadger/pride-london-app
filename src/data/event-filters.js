// @flow
import type { DateTime } from "luxon";
import type { DateRange, Time } from "./date-time";
import type { EventCategoryName } from "./event";

export type Area = "Central" | "East" | "North" | "South" | "West";
export type Price = "free";
export type Audience = "Families" | "Youth" | "16+" | "18+";
export type VenueDetail = "Gender neutral toilets" | "Outdoors" | "Indoors";
export type AccessibilityOption =
  | "Step free access"
  | "Wheelchair accessibile"
  | "Accessible Toilets"
  | "BSL Interpreter"
  | "Hearing loop installed"
  | "Complimentary ticket for personal assistant"
  | "Service animals welcome"
  | "Accessible parking spaces at venue";

export type FilterCollection = {
  date: ?DateRange,
  timeOfDay: Set<Time>,
  categories: Set<EventCategoryName>,
  price: Set<Price>,
  audience: Set<Audience>,
  venueDetails: Set<VenueDetail>,
  accessibilityOptions: Set<AccessibilityOption>,
  area: Set<Area>
};

export type TagFilterSet =
  | Set<Area>
  | Set<Price>
  | Set<Audience>
  | Set<VenueDetail>
  | Set<AccessibilityOption>
  | Set<Time>;

export type StringFilterSet =
  | Set<EventCategoryName>
  | Set<Audience>
  | Set<VenueDetail>
  | Set<AccessibilityOption>;

export type State = {
  showEventsAfter: DateTime,
  selectedFilters: FilterCollection,
  stagedFilters: FilterCollection
};
