// @flow
import type { Dispatch } from "redux";
import {
  getEvents as getEventsCms,
  updateEvents as updateEventsCms
} from "../integrations/cms";
import type { Event } from "../data/event";
import type { StandardAction } from "./";

type EventsActionType =
  | "REQUEST_EVENTS"
  | "RECEIVE_EVENTS"
  | "REQUEST_UPDATE_EVENTS";
type EventsPayload = { events: Event[] };

export type EventsAction = StandardAction<EventsActionType, EventsPayload>;

export const getEvents = (getEventsFn: getEventsCms = getEventsCms) => async (
  dispatch: Dispatch<EventsAction>
) => {
  dispatch({
    type: "REQUEST_EVENTS"
  });

  const events = await getEventsFn();

  dispatch({
    type: "RECEIVE_EVENTS",
    payload: {
      events
    }
  });
};

export const updateEvents = (
  updateEventsFn: updateEventsCms = updateEventsCms
) => async (dispatch: Dispatch<EventsAction>) => {
  dispatch({
    type: "REQUEST_UPDATE_EVENTS"
  });

  const events = await updateEventsFn();

  dispatch({
    type: "RECEIVE_EVENTS",
    payload: {
      events
    }
  });
};
