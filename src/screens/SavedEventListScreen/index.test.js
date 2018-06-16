// @flow
import React from "react";
import type { NavigationScreenProp } from "react-navigation";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import { DateTime } from "luxon";
import { Container } from "./";
import { createEventFiltersState } from "../../reducers/event-filters";

const navigation: NavigationScreenProp<*> = ({}: any);

const mockStore = configureStore([thunk]);

const initialState = {
  data: {
    events: [],
    featuredEvents: [],
    headerBanners: [],
    images: {},
    performances: {},
    sponsors: [],
    loading: true,
    refreshing: false
  },
  eventFilters: createEventFiltersState(
    DateTime.fromISO("2018-07-07T00:00:00+01:00")
  ),
  savedEvents: new Set()
};

describe("SavedEventListScreen Container", () => {
  it("returns cached props when not focused", () => {
    const store = mockStore(() => ({ ...initialState }));
    const output = shallow(
      <Container store={store} navigation={navigation} isFocused={false} />
    );

    const props = output.props();
    store.dispatch({ type: "DUMMY" });

    expect(output.props()).toBe(props);
  });
});
