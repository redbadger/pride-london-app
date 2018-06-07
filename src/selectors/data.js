// @flow
import type { Event, Events } from "../data/event";
import type { Performance, Performances } from "../data/performance";
import type { State as DataState } from "../reducers/data";

type ObjectWithId<A> = {
  id: string
} & A;

const reduceToMapHelp = <A>(
  acc: { [id: string]: ObjectWithId<A> },
  item: ObjectWithId<A>
): { [id: string]: ObjectWithId<A> } => {
  acc[item.id] = item; // intentional mutation as this happens in a reduce
  return acc;
};

export const selectEvents = (data: DataState): Array<Event> => data.events;

export const selectEventsMap = (events: Array<Event>): Events =>
  events.reduce(reduceToMapHelp, {});

export const selectEventById = (events: Events, id: string): ?Event =>
  events[id];

export const selectPerformancesMap = (data: DataState): Performances =>
  data.performances;

export const selectPerformanceById = (
  performances: Performances,
  id: string
): ?Performance => performances[id];
