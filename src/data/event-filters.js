// @flow
import type { DateRange, Time } from "../data/date-time";

export type Area = "Central" | "East" | "North" | "South" | "West";

export type FilterCollection = {
  date: ?DateRange,
  timeOfDay: Set<Time>,
  categories: Set<string>,
  price: Set<string>,
  audience: Set<string>,
  venueDetails: Set<string>,
  accessibilityOptions: Set<string>,
  area: Set<Area>
};

export type State = {
  selectedFilters: FilterCollection,
  stagedFilters: FilterCollection
};
