// @flow
import type { State } from "../reducers";
import type { Performance, Performances } from "../data/performance";

export const selectPerformances = (state: State): Performances =>
  state.data.performances;

export const selectPerformanceById = (
  performances: Performances,
  id: string
): ?Performance => performances[id];
