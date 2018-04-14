// @flow
import type { DateRange, Time } from "../data/date-time";

export type FilterCollection = {
  date: ?DateRange,
  timeOfDay: Set<Time>,
  categories: Set<string>,
  price: Set<string>,
  audience: Set<string>,
  venueDetails: Set<string>
};

export type State = {
  selectedFilters: FilterCollection,
  stagedFilters: FilterCollection
};
