// @flow
import type { State } from "../reducers";
import type { CmsEntry, Event, FeaturedEvents } from "../integrations/cms";

const getEventsState = (state: State) => state.events;

export const selectEvents = (state: State): CmsEntry<Event>[] =>
  getEventsState(state).data.entries.filter(
    entry => entry.sys.contentType.sys.id === "event"
  );
export const selectFeaturedEvents = (
  state: State
): CmsEntry<FeaturedEvents>[] =>
  getEventsState(state).data.entries.filter(
    entry => entry.sys.contentType.sys.id === "featuredEvents"
  );
export const selectEventsLoading = (state: State) =>
  getEventsState(state).loading;
export const selectEventsRefreshing = (state: State) =>
  getEventsState(state).refreshing;

export const selectEventById = (state: State, id: String) =>
  selectEvents(state).find(event => event.sys.id === id);
