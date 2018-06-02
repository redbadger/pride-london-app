// @flow
import type { State } from "../reducers";
import type { Sponsor } from "../data/sponsor";

/* eslint-disable import/prefer-default-export */
export const selectSponsors = (state: State): Sponsor[] => state.data.sponsors;
