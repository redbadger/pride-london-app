const getEventsState = state => state.events;

export const selectEvents = state => getEventsState(state).events;
export const selectEventsLoading = state => getEventsState(state).loading;
export const selectEventsRefreshing = state => getEventsState(state).refreshing;

export const selectEventById = (state, id) =>
  selectEvents(state).find(event => event.sys.id === id);
