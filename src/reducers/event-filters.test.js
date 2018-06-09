// @flow
import each from "jest-each";
import { DateTime } from "luxon";
import Reducer, { createEventFiltersState } from "./event-filters";
import { init } from "../actions";
import { routesWithoutEvents, EVENT_LIST } from "../constants/routes";

const oldTime = DateTime.fromISO("2018-04-01T12:00:00+01:00");
const newTime = DateTime.fromISO("2018-08-01T13:00:00+01:00");

describe("Event filters reducer", () => {
  it("initialises with default state", () => {
    const reducer = Reducer(() => newTime);
    const state = reducer(undefined, init());

    expect(state).toMatchSnapshot();
  });

  it("updates state with filters from payload for SET_EVENT_FILTERS action", () => {
    const initialState = createEventFiltersState(newTime);
    const reducer = Reducer(() => newTime);
    const state = reducer(initialState, {
      type: "SET_EVENT_FILTERS",
      payload: {
        date: { startDate: "2018-03-12", endDate: "2018-03-12" }
      }
    });

    expect(state.stagedFilters.categories).toBe(
      initialState.stagedFilters.categories
    );
    expect(state.stagedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    expect(state.stagedFilters.timeOfDay).toBe(
      initialState.stagedFilters.timeOfDay
    );

    expect(state.selectedFilters.categories).toBe(
      initialState.stagedFilters.categories
    );
    expect(state.selectedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    expect(state.selectedFilters.timeOfDay).toBe(
      initialState.stagedFilters.timeOfDay
    );

    expect(state.stagedFilters).toBe(state.selectedFilters);
  });

  it("updates state with filters from payload for STAGE_EVENT_FILTERS action", () => {
    const initialState = createEventFiltersState(newTime);
    const reducer = Reducer(() => newTime);
    const state = reducer(initialState, {
      type: "STAGE_EVENT_FILTERS",
      payload: {
        date: { startDate: "2018-03-12", endDate: "2018-03-12" }
      }
    });

    expect(state.stagedFilters.categories).toBe(
      initialState.stagedFilters.categories
    );
    expect(state.stagedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    expect(state.stagedFilters.timeOfDay).toBe(
      initialState.stagedFilters.timeOfDay
    );
  });

  it("updates state with filters from payload for COMMIT_EVENT_FILTERS action", () => {
    const initialState = createEventFiltersState(newTime);
    initialState.stagedFilters.date = {
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    };
    const reducer = Reducer(() => newTime);
    const state = reducer(initialState, {
      type: "COMMIT_EVENT_FILTERS"
    });

    expect(state.stagedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    expect(state.selectedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    // this is used by selectIsStagingFilters
    expect(state.stagedFilters).toBe(state.selectedFilters);
  });

  it("updates state with filters from payload for CLEAR_STAGED_EVENT_FILTERS action", () => {
    const initialState = createEventFiltersState(newTime);
    initialState.selectedFilters.date = {
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    };
    initialState.stagedFilters.date = {
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    };
    const reducer = Reducer(() => newTime);
    const state = reducer(initialState, {
      type: "CLEAR_STAGED_EVENT_FILTERS"
    });

    expect(state.stagedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    expect(state.selectedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    // this is used by selectIsStagingFilters
    expect(state.stagedFilters).toBe(state.selectedFilters);
  });

  it("clears the event filters for CLEAR_EVENT_FILTERS action", () => {
    const initialState = createEventFiltersState(newTime);
    initialState.selectedFilters.date = {
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    };
    initialState.stagedFilters.date = {
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    };

    const reducer = Reducer(() => oldTime);
    const state = reducer(initialState, {
      type: "CLEAR_EVENT_FILTERS"
    });

    const emptyFilters = {
      categories: new Set(), // When this is empty it signifies no category filter.
      date: null,
      timeOfDay: new Set(),
      price: new Set(),
      audience: new Set(),
      venueDetails: new Set(),
      accessibilityOptions: new Set(),
      area: new Set()
    };

    expect(state.stagedFilters).toEqual(emptyFilters);
    expect(state.selectedFilters).toEqual(emptyFilters);
    expect(state.showEventsAfter).toEqual(newTime);
  });

  describe("NAVIGATION action", () => {
    test("does not update showEventsAfter when route is not in routesWithoutEvents", () => {
      const reducer = Reducer(() => newTime);
      const state = reducer(createEventFiltersState(oldTime), {
        type: "NAVIGATION",
        route: EVENT_LIST
      });

      expect(state.showEventsAfter).toEqual(oldTime);
    });

    each(routesWithoutEvents.map(item => [item])).test(
      "updates showEventsAfter when route is %s",
      a => {
        const reducer = Reducer(() => newTime);
        const state = reducer(createEventFiltersState(oldTime), {
          type: "NAVIGATION",
          route: a
        });

        expect(state.showEventsAfter).toEqual(newTime);
      }
    );

    test("updates if new time is more than 60 minutes", () => {
      const timeA = DateTime.fromISO("2018-08-01T13:00:00+01:00");
      const timeB = DateTime.fromISO("2018-08-01T13:30:00+01:00");
      const reducer = Reducer(() => timeB);
      const state = reducer(createEventFiltersState(timeA), {
        type: "NAVIGATION",
        route: routesWithoutEvents[0]
      });
      expect(state.showEventsAfter).toEqual(timeB);
    });

    test("does not update if new time is less than 30 minutes", () => {
      const timeA = DateTime.fromISO("2018-08-01T13:00:00+01:00");
      const timeB = DateTime.fromISO("2018-08-01T13::29+01:00");
      const reducer = Reducer(() => timeB);
      const state = reducer(createEventFiltersState(timeA), {
        type: "NAVIGATION",
        route: routesWithoutEvents[0]
      });
      expect(state.showEventsAfter).toEqual(timeA);
    });
  });
});
