// @flow
import type { Dispatch } from "redux";
import { getCmsData, updateCmsData } from "../integrations/cms";
import type { Event } from "../integrations/cms";
import type { StandardAction } from "./";

type EventsActionType =
  | "REQUEST_EVENTS"
  | "RECEIVE_EVENTS"
  | "REQUEST_UPDATE_EVENTS";
type EventsPayload = { events: Event[] };

export type EventsAction = StandardAction<EventsActionType, EventsPayload>;

export const getEvents = (getCmsDataFn: getCmsData = getCmsData) => async (
  dispatch: Dispatch<EventsAction>
) => {
  dispatch({
    type: "REQUEST_EVENTS"
  });

  const cmsData = await getCmsDataFn();

  const events = cmsData.entries.filter(
    entry => entry.sys.contentType.sys.id === "event"
  );

  dispatch({
    type: "RECEIVE_EVENTS",
    payload: {
      events
    }
  });
};

export const updateEvents = (
  updateCmsDataFn: updateCmsData = updateCmsData
) => async (dispatch: Dispatch<EventsAction>) => {
  dispatch({
    type: "REQUEST_UPDATE_EVENTS"
  });

  const cmsData = await updateCmsDataFn();

  const events = cmsData.entries.filter(
    entry => entry.sys.contentType.sys.id === "event"
  );

  dispatch({
    type: "RECEIVE_EVENTS",
    payload: {
      events
    }
  });
};
