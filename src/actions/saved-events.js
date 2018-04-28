// @flow
import type { Dispatch } from "redux";

type AddSavedEventAction = { type: "ADD_SAVED_EVENT", id: string };
type RemoveSavedEventAction = { type: "REMOVE_SAVED_EVENT", id: string };

export type SavedEventAction = AddSavedEventAction | RemoveSavedEventAction;

export const addSavedEvent = (id: string) => (
  dispatch: Dispatch<SavedEventAction>
) => dispatch({ type: "ADD_SAVED_EVENT", id });

export const removeSavedEvent = (id: string) => (
  dispatch: Dispatch<SavedEventAction>
) => dispatch({ type: "REMOVE_SAVED_EVENT", id });
