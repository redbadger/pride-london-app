// @flow
import type { State } from "../reducers";
import type { Sponsor } from "../data/sponsor";

const getEventsState = (state: State) => state.events;

/* eslint-disable import/prefer-default-export */
export const selectSponsors = (state: State): Sponsor[] =>
  ((getEventsState(state).entries.filter(
    entry => entry.sys.contentType.sys.id === "sponsor"
  ): any[]): Sponsor[]);
