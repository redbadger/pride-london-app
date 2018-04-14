// @flow
import React from "react";
import { shallow } from "enzyme";
import EventOverview from "./EventOverview";
import type { Event } from "../../data/event";

it("renders correctly", () => {
  const event: Event = ({
    fields: {
      name: { "en-GB": "Pride in the Park" },
      location: { "en-GB": { lon: -0.12092150000000856, lat: 51.4875152 } },
      locationName: { "en-GB": "Vauxhall Pleasure Gardens" },
      startTime: { "en-GB": "2017-07-09T11:00+01:00" },
      endTime: { "en-GB": "2018-07-15T18:00+01:00" },
      isFree: { "en-GB": false },
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
      timeOfDay: { "en-GB": ["Afternoon"] },
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

  const output = shallow(<EventOverview event={event} />);
  expect(output).toMatchSnapshot();
});
