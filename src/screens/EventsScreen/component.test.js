// @flow
import React from "react";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { shallow } from "enzyme";
import { EventsScreen as Component } from "./component";
import FilterHeader from "./FilterHeaderConnected";
import EventList from "../../components/EventList";
import {
  EVENT_CATEGORIES_FILTER,
  FILTER_MODAL,
  EVENT_DETAILS,
  EVENT_LIST
} from "../../constants/routes";

import type { Event } from "../../data/event";

const navigation: NavigationScreenProp<NavigationState> = ({
  navigate: () => {}
}: any);

const event = ({
  sys: {
    id: "",
    contentType: {
      sys: {
        id: "event"
      }
    },
    revision: 1,
    type: ""
  },
  fields: {
    name: { "en-GB": "Pride in the Park" },
    location: { "en-GB": { lon: -0.12092150000000856, lat: 51.4875152 } },
    locationName: { "en-GB": "Vauxhall Pleasure Gardens" },
    startTime: { "en-GB": "2017-07-09T11:00+01:00" },
    endTime: { "en-GB": "2018-07-15T18:00+01:00" },
    eventPriceLow: { "en-GB": 19.95 },
    eventPriceHigh: { "en-GB": 30 },
    eventDescription: {
      "en-GB":
        "Lenard Pink’s singles walking tour in partnership with Pink Lobster Matchmaking, The Wild & Wonderful Women of Westminster will dissect, poke and prod those women who have battled, campaigned, fought and slept their way into the history books.\n\nPink for Pink tours will be putting the movers, shakers and shimmiers under a large microscopic lens, examining the likes of Emmeline Pankhurst, the lady who challenged the British Establishment and got the vote for women, to Nell Gwynn who became one of the most famous mistresses of Charles II and probably one of Britain’s biggest whores."
    },
    individualEventPicture: {
      "en-GB": {
        sys: {
          space: {
            sys: { type: "Link", linkType: "Space", id: "n2o4hgsv6wcx" }
          },
          id: "HNLFqItbkAmW8ssqQECIy",
          type: "Asset",
          createdAt: "2018-03-04T10:13:53.398Z",
          updatedAt: "2018-03-04T10:13:53.398Z",
          revision: 1
        }
      }
    },
    eventsListPicture: {
      "en-GB": {
        sys: {
          space: {
            sys: { type: "Link", linkType: "Space", id: "n2o4hgsv6wcx" }
          },
          id: "HNLFqItbkAmW8ssqQECIy",
          type: "Asset",
          createdAt: "2018-03-04T10:13:53.398Z",
          updatedAt: "2018-03-04T10:13:53.398Z",
          revision: 1
        }
      }
    },
    ticketingUrl: { "en-GB": "https://prideinlondon.org/pride-in-the-park/" },
    accessibilityOptions: {
      "en-GB": ["Accessible Toilets", "Hearing loop installed"]
    },
    eventCategories: {
      "en-GB": [
        "Community",
        "Social and Networking",
        "Sports and Activities",
        "Music"
      ]
    },
    recurrenceDates: { "en-GB": ["13/1/18", "15/1/18"] },
    accessibilityDetails: {
      "en-GB":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet, odio vel imperdiet ultricies, libero nibh convallis ante, a imperdiet sapien risus non nisi. "
    },
    email: { "en-GB": "john.smith@eventname.com" },
    phone: { "en-GB": "07891234567" },
    venueDetails: { "en-GB": ["Gender neutral toilets"] }
  }
}: Event);

describe("EventsScreen Component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[[event]]}
        loading={false}
        refreshing={false}
        updateData={() => Promise.resolve()}
        getAssetSource={() => ({ uri: "", width: 1, height: 1 })}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
        isFocused
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders correctly when loading", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[[event]]}
        loading
        refreshing={false}
        updateData={() => Promise.resolve()}
        getAssetSource={() => ({ uri: "", width: 1, height: 1 })}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
        isFocused
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("renders correctly with no events", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
        loading={false}
        refreshing={false}
        updateData={() => Promise.resolve()}
        getAssetSource={() => ({ uri: "", width: 1, height: 1 })}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
        isFocused
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("updates events on refresh", () => {
    const updateData = jest.fn();
    const output = shallow(
      <Component
        navigation={navigation}
        events={[[event]]}
        loading={false}
        refreshing={false}
        updateData={updateData}
        getAssetSource={() => ({ uri: "", width: 1, height: 1 })}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
        isFocused
      />
    );

    output
      .find(EventList)
      .props()
      .onRefresh();

    expect(updateData).toHaveBeenCalled();
  });

  describe("navigation", () => {
    const navigationSpy = jest.fn();
    const nav: NavigationScreenProp<NavigationState> = ({
      navigate: navigationSpy
    }: any);

    const output = shallow(
      <Component
        navigation={nav}
        events={[[event]]}
        loading={false}
        refreshing={false}
        updateData={() => Promise.resolve()}
        getAssetSource={() => ({ uri: "", width: 1, height: 1 })}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
        isFocused
      />
    );

    beforeEach(() => {
      navigationSpy.mockClear();
    });

    it("opens the categories filter", () => {
      output
        .find(FilterHeader)
        .props()
        .onFilterCategoriesPress();
      expect(navigationSpy).toBeCalledWith(EVENT_CATEGORIES_FILTER);
    });

    it("opens the categories filter", () => {
      output
        .find(FilterHeader)
        .props()
        .onFilterButtonPress();
      expect(navigationSpy).toBeCalledWith(FILTER_MODAL);
    });

    it("opens an event", () => {
      output
        .find(EventList)
        .props()
        .onPress(1);
      expect(navigationSpy).toBeCalledWith(EVENT_DETAILS, { eventId: 1 });
    });
  });

  describe("#shouldComponentUpdate", () => {
    it("does not update when not focused", () => {
      const output = shallow(
        <Component
          navigation={navigation}
          events={[]}
          loading={false}
          refreshing={false}
          updateData={() => Promise.resolve()}
          getAssetSource={() => ({ uri: "", width: 1, height: 1 })}
          selectedCategories={new Set()}
          addSavedEvent={() => {}}
          removeSavedEvent={() => {}}
          savedEvents={new Set()}
          route={EVENT_LIST}
          isFocused
        />
      );
      const nextProps = {
        isFocused: false
      };

      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(false);
    });
  });
});
