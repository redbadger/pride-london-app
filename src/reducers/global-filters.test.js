// @flow
import each from "jest-each";
import { DateTime } from "luxon";
import Reducer from "./global-filters";
import {
  EVENT_LIST,
  EVENT_DETAILS,
  FEATURED_EVENT_LIST,
  SAVED_EVENT_LIST,
  HOME,
  EVENT_CATEGORIES_FILTER,
  PARADE,
  SUPPORT_US,
  FILTER_MODAL,
  DONATE,
  SPONSOR
} from "../constants/routes";

const oldTime = DateTime.fromISO("2018-04-01T12:00:00+01:00");
const newTime = DateTime.fromISO("2018-08-01T13:00:00+01:00");

describe("Global filters reducer", () => {
  it("initialises with default state", () => {
    const reducer = Reducer(() => newTime);
    const state = reducer(undefined, { type: "NAVIGATION", route: "Test" });

    expect(state.hideEventsBefore).toEqual(newTime);
  });

  describe("NAVIGATION action", () => {
    each([[HOME], [PARADE], [DONATE], [SPONSOR], [SUPPORT_US]]).test(
      "updates hideEventsBefore when route is %s",
      a => {
        const reducer = Reducer(() => newTime);
        const state = reducer(
          { hideEventsBefore: oldTime },
          {
            type: "NAVIGATION",
            route: a
          }
        );

        expect(state.hideEventsBefore).toEqual(newTime);
      }
    );

    each([
      [EVENT_DETAILS],
      [EVENT_LIST],
      [FEATURED_EVENT_LIST],
      [SAVED_EVENT_LIST],
      [EVENT_CATEGORIES_FILTER],
      [FILTER_MODAL]
    ]).test("does not update hideEventsBefore when route is %s", a => {
      const reducer = Reducer(() => newTime);
      const state = reducer(
        { hideEventsBefore: oldTime },
        {
          type: "NAVIGATION",
          route: a
        }
      );

      expect(state.hideEventsBefore).toEqual(oldTime);
    });
  });
});
