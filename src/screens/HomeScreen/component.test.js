// @flow
import React from "react";
import { shallow } from "enzyme";
import Component from "./component";
import { EVENT_DETAILS } from "../../constants/routes";
import type { Event, Asset } from "../../data/event";

const events: Event[] = ([
  {
    sys: {
      id: "1"
    },
    fields: {
      name: {
        "en-GB": "some event"
      },
      eventsListPicture: {
        "en-GB": {
          sys: {
            id: "asset1"
          }
        }
      },
      startTime: {
        "en-GB": "2018-07-10T00:00"
      }
    }
  },
  {
    sys: {
      id: "2"
    },
    fields: {
      name: {
        "en-GB": "some other"
      },
      eventsListPicture: {
        "en-GB": {
          sys: {
            id: "asset2"
          }
        }
      },
      startTime: {
        "en-GB": "2018-07-10T00:00"
      }
    }
  }
]: any);

const asset: Asset = ({
  fields: {
    file: {
      "en-GB": {
        url: "http://example.com/image.png"
      }
    }
  }
}: any);

const getAssetById = jest.fn().mockReturnValue(asset);
const navigation: any = {
  navigate: jest.fn()
};

describe("HomeScreen Component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        loading={false}
        events={events}
        getAssetById={getAssetById}
      />
    );
    expect(output).toMatchSnapshot();
    expect(getAssetById).toHaveBeenCalledTimes(events.length);
    expect(getAssetById).toHaveBeenCalledWith("asset1");
  });

  it("renders loading indicator when loading", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        loading
        events={[]}
        getAssetById={getAssetById}
      />
    );

    const loadingText = output.find("Text").first();

    expect(loadingText.children().text()).toEqual("Loading...");
  });

  it("navigates to event when tapped", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        loading={false}
        events={events}
        getAssetById={getAssetById}
      />
    );

    const eventTile = output.find({ testID: "event-tile-1" });
    eventTile.simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith(EVENT_DETAILS, {
      eventId: "1"
    });
  });
});

afterEach(() => {
  getAssetById.mockClear();
  navigation.navigate.mockClear();
});
