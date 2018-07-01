// @flow
import type { Event, Events } from "../data/event";
import type { FeaturedEvents } from "../data/featured-events";
import type { FieldRef } from "../data/field-ref";
import type { Performance, Performances } from "../data/performance";
import type { Amenity } from "../data/amenity";
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

export const selectLoading = (data: DataState): boolean => data.loading;

export const selectRefreshing = (data: DataState): boolean => data.refreshing;

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

export const selectFeaturedEvents = (data: DataState): FeaturedEvents[] =>
  data.featuredEvents;

export const selectFeaturedEventsByTitle = (
  featuredEventsList: FeaturedEvents[],
  title: string
): ?FeaturedEvents =>
  featuredEventsList.find(entry => entry.fields.title === title);

export const selectAmenities = (data: DataState): Array<Amenity> =>
  data.amenities;

const resolveEventsHelp = (eventMap: Events) => (
  acc: Event[],
  reference: FieldRef
) => {
  const event = eventMap[reference.sys.id];
  if (event) {
    acc.push(event);
  }
  return acc;
};

export const resolveEvents = (
  eventMap: Events,
  references: FieldRef[]
): Event[] => references.reduce(resolveEventsHelp(eventMap), []);
