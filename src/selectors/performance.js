// @flow
import R from "ramda";
import type { State } from "../reducers";
import type { Performance, Performances } from "../data/performance";
import { getHours, compareAsc as compareDateAsc } from "../lib/date";

export const selectPerformances = (state: State): Performances =>
  state.data.performances;

export const selectPerformanceById = (
  performances: Performances,
  id: string
): ?Performance => performances[id];

const sortByStartTimeAsc = (a: Performance, b: Performance) =>
  compareDateAsc(a.fields.startTime, b.fields.startTime);

export const getTimePeriod = (date: string) => {
  const splits = [6, 12, 18];
  const hours = getHours(date);
  if (hours >= splits[0] && hours < splits[1]) {
    return "Morning";
  } else if (hours >= splits[1] && hours < splits[2]) {
    return "Afternoon";
  }
  return "Evening";
};

export const groupPerformancesByPeriod = (
  performances: Performance[]
): Performance[][] => {
  if (performances.length === 0) return [];
  return R.groupWith(
    (a: Performance, b: Performance) =>
      getTimePeriod(a.fields.startTime) === getTimePeriod(b.fields.startTime),
    performances.sort(sortByStartTimeAsc)
  );
};
