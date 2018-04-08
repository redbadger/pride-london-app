// @flow
import type { DateRange, Time } from "../data/date-time";

export type FilterCollection = {
  date: ?DateRange,
  time: Set<Time>,
  categories: Set<string>
};

export type State = {
  selectedFilters: FilterCollection,
  stagedFilters: FilterCollection
};
