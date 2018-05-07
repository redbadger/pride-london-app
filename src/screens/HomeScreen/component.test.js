// @flow
import React from "react";
import { shallow } from "enzyme";
import Component from "./component";
import { FEATURED_EVENT_LIST, EVENT_DETAILS } from "../../constants/routes";
import type { Event } from "../../data/event";
import type { HeaderBanner } from "../../data/header-banner";
import Loading from "../../components/Loading";

const generateHeaderBanners = (count = 2): HeaderBanner[] =>
  Array.from(Array(count)).map(
    (_, i) =>
      ({
        sys: {
          id: String(i + 1)
        },
        fields: {
          heading: {
            "en-GB": "Pride"
          },
          headingLine2: {
            "en-GB": "Festival"
          },
          subHeading: {
            "en-GB": "from - to"
          },
          heroImage: {
            "en-GB": {
              sys: {
                id: `asset${i + 1}`
              }
            }
          },
          backgroundColour: {
            "en-GB": "#ff0000"
          }
        }
      }: any)
  );

const generateEvents = (count = 2): Event[] =>
  Array.from(Array(count)).map(
    (_, i) =>
      ({
        sys: {
          id: String(i + 1)
        },
        fields: {
          name: {
            "en-GB": "some other"
          },
          eventsListPicture: {
            "en-GB": {
              sys: {
                id: `asset${i + 1}`
              }
            }
          },
          startTime: {
            "en-GB": "2018-07-10T00:00"
          },
          eventCategories: {
            "en-GB": ["Cabaret & Variety", "Music"]
          }
        }
      }: any)
  );

const getAssetSource = jest.fn().mockReturnValue({
  uri: "http://example.com/image.png",
  width: 1,
  height: 1
});
const navigation: any = {
  navigate: jest.fn()
};

describe("HomeScreen Component", () => {
  const render = props =>
    shallow(
      <Component
        navigation={navigation}
        loading={false}
        headerBanners={generateHeaderBanners(2)}
        featuredEventsTitle="Featured events"
        featuredEvents={generateEvents(2)}
        getAssetSource={getAssetSource}
        {...props}
      />
    );

  it("renders correctly", () => {
    const featuredEvents = generateEvents(5);
    const output = render({ featuredEvents });
    expect(output).toMatchSnapshot();
    expect(getAssetSource).toHaveBeenCalledTimes(5); // 4 events + 1 banner
    expect(getAssetSource).toHaveBeenCalledWith({ sys: { id: "asset1" } });
  });

  it("renders max 6 events", () => {
    const featuredEvents = generateEvents(10);
    const output = render({ featuredEvents });
    expect(output).toMatchSnapshot();
    expect(getAssetSource).toHaveBeenCalledTimes(7); // 6 events + 1 banner
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
    const eventTile = output.find({ testID: "event-tile-1" });
    eventTile.simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith(EVENT_DETAILS, {
      eventId: "1"
    });
  });

  describe("#shouldComponentUpdate", () => {
    const props = {
      headerBanners: generateHeaderBanners(2),
      featuredEventsTitle: "Title",
      featuredEvents: generateEvents(3),
      loading: false
    };

    it("stops updates if loading state, title and events are the same", () => {
      const output = render(props);
      const nextProps = {
        headerBanners: generateHeaderBanners(2),
        featuredEventsTitle: "Title",
        featuredEvents: generateEvents(3),
        loading: false
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
        loading: false
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
        loading: false
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
        loading: true
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
        loading: false
      };

      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });
  });
});

afterEach(() => {
  getAssetSource.mockClear();
  navigation.navigate.mockClear();
});
