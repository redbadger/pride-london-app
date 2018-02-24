// @flow
import type { Dispatch } from "redux";
import { getEvents as getEventsCms } from "../integrations/cms";
import type { Event } from "../integrations/cms";

type StandardAction<A, P> = {|
  type: A,
  payload?: P
|};

type EventsActionType = "REQUEST_EVENTS" | "RECEIVE_EVENTS";
type EventsPayload = { events: Event[] };

export type EventsAction = StandardAction<EventsActionType, EventsPayload>;

// eslint-disable-next-line import/prefer-default-export
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
