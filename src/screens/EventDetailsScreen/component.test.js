// @flow
import React from "react";
import type { NavigationScreenProp } from "react-navigation";
import { shallow } from "enzyme";
import Component, {
  EventAccessibility,
  EventCategories,
  EventHeader,
  EventTickets
} from "./component";
import type { Event } from "../../data/event-deprecated";

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
    email: { "en-GB": "john.smith@eventname.com" },
    phone: { "en-GB": "07891234567" },
    venueDetails: { "en-GB": ["Gender neutral toilets"] }
  }
}: any);

const navigation: NavigationScreenProp<{ params: { eventId: string } }> = ({
  goBack: () => {}
}: any);

it("renders correctly", () => {
  const output = shallow(
    <Component
      event={event}
      isSaved
      navigation={navigation}
      toggleSaved={() => {}}
      setCategoryFilter={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly with missing details", () => {
  const output = shallow(
    <Component
      event={{
        ...event,
        fields: {
          ...event.fields,
          ticketingUrl: undefined,
          accessibilityDetails: undefined
        }
      }}
      navigation={navigation}
      toggleSaved={() => {}}
      setCategoryFilter={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

describe("EventHeader", () => {
  it("renders correctly", () => {
    const output = shallow(
      <EventHeader isSaved navigation={navigation} toggleSaved={() => {}} />
    );
    expect(output).toMatchSnapshot();
  });
});

describe("EventCategories", () => {
  it("renders correctly", () => {
    const output = shallow(
      <EventCategories
        event={event}
        navigation={navigation}
        setCategoryFilter={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });
});

describe("EventAccessibility", () => {
  it("renders correctly", () => {
    const output = shallow(<EventAccessibility>Test</EventAccessibility>);
    expect(output).toMatchSnapshot();
  });
});

describe("EventTickets", () => {
  it("renders correctly", () => {
    const output = shallow(<EventTickets url="https://prideinlondon.org/" />);
    expect(output).toMatchSnapshot();
  });
});
