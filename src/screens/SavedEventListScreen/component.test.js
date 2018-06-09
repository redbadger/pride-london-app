// @flow
import React from "react";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { shallow } from "enzyme";
import Component from "./component";
import EventList from "../../components/EventList";
import Loading from "../../components/Loading";
import NoSavedEvents from "./NoSavedEvents";

const navigation: NavigationScreenProp<NavigationState> = ({
  navigate: () => {}
}: any);

describe("SavedEventListScreen Component", () => {
  const event: Event = ({
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
      email: { "en-GB": "marsha.p.johnson@eventname.com" },
      phone: { "en-GB": "07891234567" },
      venueDetails: { "en-GB": ["Gender neutral toilets"] }
    }
  }: any);

  const events = ({
    entries: [event]
  }: any);

  it("renders correctly", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={events}
        loading={false}
        refreshing={false}
        updateData={() => Promise.resolve()}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders loading indicator when loading", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={events}
        loading
        refreshing={false}
        updateData={() => Promise.resolve()}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
      />
    );

    const loadingText = output.find(Loading);

    expect(loadingText.length).toEqual(1);
  });

  it("renders no saved events screen when there are no events", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
        loading={false}
        refreshing={false}
        updateData={() => Promise.resolve()}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
      />
    );

    expect(output).toMatchSnapshot();
    expect(output.find(NoSavedEvents).length).toEqual(1);
  });

  it("updates events on refresh", () => {
    const updateData = jest.fn();
    const output = shallow(
      <Component
        navigation={navigation}
        events={events}
        loading={false}
        refreshing={false}
        updateData={updateData}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
      />
    );

    output
      .find(EventList)
      .props()
      .onRefresh();

    expect(updateData).toHaveBeenCalled();
  });
});
