// @flow
import type { Dispatch } from "redux";

type AddSavedEventAction = { type: "ADD_SAVED_EVENT", id: string };
type RemoveSavedEventAction = { type: "REMOVE_SAVED_EVENT", id: string };

export type SaveEventAction = AddSavedEventAction | RemoveSavedEventAction;

export const addSavedEvent = (id: string) => (
  dispatch: Dispatch<SaveEventAction>
) => dispatch({ type: "ADD_SAVED_EVENT", id });

export const removeSavedEvent = (id: string) => (
  dispatch: Dispatch<SaveEventAction>
) => dispatch({ type: "REMOVE_SAVED_EVENT", id });
