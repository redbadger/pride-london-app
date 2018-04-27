// @flow
import type { Dispatch } from "redux";
import type { StandardAction } from "./";

type SaveEventActionType = "ADD_SAVED_EVENT" | "REMOVE_SAVED_EVENT";

export type SaveEventAction = StandardAction<SaveEventActionType, string>;

export const addEvent = (id: string) => (dispatch: Dispatch<SaveEventAction>) =>
  dispatch({ type: "ADD_SAVED_EVENT", payload: id });

export const removeEvent = (id: string) => (
  dispatch: Dispatch<SaveEventAction>
) => dispatch({ type: "REMOVE_SAVED_EVENT", payload: id });
