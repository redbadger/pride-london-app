// @flow
import type { Dispatch } from "redux";
import { fetchSavedEvents, storeSavedEvents } from "../integrations/storage";

type AddSavedEventAction = { type: "ADD_SAVED_EVENT", id: string };
type RemoveSavedEventAction = { type: "REMOVE_SAVED_EVENT", id: string };
type RequestSavedEventsAction = { type: "REQUEST_SAVED_EVENTS" };
type RecieveSavedEventsAction = {
  type: "RECEIVE_SAVED_EVENTS",
  events: Set<string>
};

export type SavedEventAction =
  | AddSavedEventAction
  | RemoveSavedEventAction
  | RequestSavedEventsAction
  | RecieveSavedEventsAction;

export const addSavedEvent = (
  id: string,
  fetchSavedEventsFn: typeof fetchSavedEvents = fetchSavedEvents,
  storeSavedEventsFn: typeof storeSavedEvents = storeSavedEvents
) => async (dispatch: Dispatch<SavedEventAction>) => {
  dispatch({ type: "ADD_SAVED_EVENT", id });
  const events = await fetchSavedEventsFn();
  return storeSavedEventsFn(events.add(id));
};

export const removeSavedEvent = (
  id: string,
  fetchSavedEventsFn: typeof fetchSavedEvents = fetchSavedEvents,
  storeSavedEventsFn: typeof storeSavedEvents = storeSavedEvents
) => async (dispatch: Dispatch<SavedEventAction>) => {
  dispatch({ type: "REMOVE_SAVED_EVENT", id });
  const events = await fetchSavedEventsFn();
  events.delete(id);
  return storeSavedEventsFn(events);
};

export const loadSavedEvents = (
  fetchSavedEventsFn: typeof fetchSavedEvents = fetchSavedEvents
) => async (dispatch: Dispatch<SavedEventAction>) => {
  dispatch({
    type: "REQUEST_SAVED_EVENTS"
  });

  const events = await fetchSavedEventsFn();

  dispatch({
    type: "RECEIVE_SAVED_EVENTS",
    events
  });
};
