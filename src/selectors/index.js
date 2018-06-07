// @flow
import type { State } from "../reducers";
import type { State as DataState } from "../reducers/data";

/* eslint-disable import/prefer-default-export */
export const selectData = (state: State): DataState => state.data;
