// @flow
import React from "react";
import { shallow } from "enzyme";
import Component from "./component";
import { FEATURED_EVENT_LIST, EVENT_DETAILS } from "../../constants/routes";
import type { Event } from "../../data/event";
import Loading from "../../components/Loading";

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
          }
        }
      }: any)
  );

const getAssetUrl = jest.fn().mockReturnValue("http://example.com/image.png");
const navigation: any = {
  navigate: jest.fn()
};

describe("HomeScreen Component", () => {
  const render = props =>
    shallow(
      <Component
        navigation={navigation}
        loading={false}
        featuredEventsTitle="Featured events"
        featuredEvents={generateEvents(2)}
        getAssetUrl={getAssetUrl}
        {...props}
      />
    );

  it("renders correctly", () => {
    const featuredEvents = generateEvents(5);
    const output = render({ featuredEvents });
    expect(output).toMatchSnapshot();
    expect(getAssetUrl).toHaveBeenCalledTimes(4);
    expect(getAssetUrl).toHaveBeenCalledWith({
      "en-GB": { sys: { id: "asset1" } }
    });
  });

  it("renders max 6 events", () => {
    const featuredEvents = generateEvents(10);
    const output = render({ featuredEvents });
    expect(output).toMatchSnapshot();
    expect(getAssetUrl).toHaveBeenCalledTimes(6);
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
      featuredEventsTitle: "Title",
      featuredEvents: generateEvents(3),
      loading: false
    };

    it("stops updates if loading state, title and events are the same", () => {
      const output = render(props);
      const nextProps = {
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
        featuredEventsTitle: "Title",
        featuredEvents: generateEvents(3),
        loading: true
      };

      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });
  });
});

afterEach(() => {
  getAssetUrl.mockClear();
  navigation.navigate.mockClear();
});
