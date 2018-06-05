// @flow
import React from "react";
import { shallow } from "enzyme";
import { HomeScreen as Component } from "./component";
import { FEATURED_EVENT_LIST, EVENT_DETAILS } from "../../constants/routes";
import Loading from "../../components/Loading";
import {
  generateImageDetails,
  generateHeaderBanner,
  generateEvent,
  sampleArrayOf,
  sampleOne
} from "../../data/__test-data";

const getImageDetails = jest
  .fn()
  .mockReturnValue(sampleOne(generateImageDetails));

const navigation: any = {
  navigate: jest.fn()
};

const generateHeaderBanners = sampleArrayOf(generateHeaderBanner);
const generateEvents = sampleArrayOf(generateEvent);

describe("HomeScreen Component", () => {
  const render = props =>
    shallow(
      <Component
        navigation={navigation}
        loading={false}
        headerBanners={generateHeaderBanners(2)}
        featuredEventsTitle="Featured events"
        featuredEvents={generateEvents(2)}
        getImageDetails={getImageDetails}
        isFocused
        {...props}
      />
    );

  it("renders correctly", () => {
    const featuredEvents = generateEvents(5);
    const output = render({ featuredEvents });
    expect(output).toMatchSnapshot();
  });

  it("renders max 6 events", () => {
    const featuredEvents = generateEvents(10);
    const output = render({ featuredEvents });
    expect(output).toMatchSnapshot();
  });

  it("renders loading indicator when loading", () => {
    const output = render({
      loading: true
    });

    const loadingText = output.find(Loading);

    expect(loadingText.length).toEqual(1);
  });

  it("navigates to featured event list when tapped", () => {
    const output = render();
    const viewAll = output.find({ testID: "view-all" });
    viewAll.simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith(FEATURED_EVENT_LIST, {
      title: "Featured events"
    });
  });

  it("navigates to event when tapped", () => {
    const output = render();
    const eventTile = output.find({ testID: `event-tile-KAHR4` });
    eventTile.simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith(EVENT_DETAILS, {
      eventId: "KAHR4"
    });
  });

  describe("#shouldComponentUpdate", () => {
    const props = {
      headerBanners: generateHeaderBanners(2),
      featuredEventsTitle: "Title",
      featuredEvents: generateEvents(3),
      loading: false,
      isFocused: true
    };

    it("stops updates if loading state, title and events are the same", () => {
      const output = render(props);
      const nextProps = {
        headerBanners: generateHeaderBanners(2),
        featuredEventsTitle: "Title",
        featuredEvents: generateEvents(3),
        loading: false,
        isFocused: true
      };

      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(false);
    });

    it("updates when different events are displayed", () => {
      const output = render(props);
      const nextProps = {
        headerBanners: generateHeaderBanners(2),
        featuredEventsTitle: "Title",
        featuredEvents: generateEvents(5),
        loading: false,
        isFocused: true
      };

      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("updates when different title is shown", () => {
      const output = render(props);
      const nextProps = {
        headerBanners: generateHeaderBanners(2),
        featuredEventsTitle: "Other Title",
        featuredEvents: generateEvents(3),
        loading: false,
        isFocused: true
      };

      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("updates when loading events", () => {
      const output = render(props);
      const nextProps = {
        headerBanners: generateHeaderBanners(2),
        featuredEventsTitle: "Title",
        featuredEvents: generateEvents(3),
        loading: true,
        isFocused: true
      };

      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("updates when different header banner is displayed", () => {
      const output = render(props);
      const nextProps = {
        headerBanners: generateHeaderBanners(3),
        featuredEventsTitle: "Title",
        featuredEvents: generateEvents(3),
        loading: false,
        isFocused: true
      };

      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("does not update when not focused", () => {
      const output = render(props);
      const nextProps = {
        isFocused: false
      };

      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(false);
    });
  });
});

afterEach(() => {
  getImageDetails.mockClear();
  navigation.navigate.mockClear();
});
