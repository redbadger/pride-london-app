import React from "react";
import { shallow } from "enzyme";
import EventList from "./EventList";

const events = [
  [
    {
      sys: {
        id: "1",
        type: "",
        contentType: { sys: { id: "" } },
        revision: 1
      },
      fields: {
        name: {
          "en-GB": "some event"
        },
        startTime: {
          "en-GB": "2018-07-10T00:00"
        }
      }
    },
    {
      sys: {
        id: "2",
        type: "",
        contentType: { sys: { id: "" } },
        revision: 1
      },
      fields: {
        name: {
          "en-GB": "some other"
        },
        startTime: {
          "en-GB": "2018-07-10T00:00"
        }
      }
    }
  ],
  [
    {
      sys: {
        id: "2",
        type: "",
        contentType: { sys: { id: "" } },
        revision: 1
      },
      fields: {
        name: {
          "en-GB": "some other"
        },
        startTime: {
          "en-GB": "2018-07-11T00:00"
        }
      }
    }
  ]
];

it("renders correctly", () => {
  const output = shallow(
    <EventList
      events={events}
      locale="en-GB"
      refreshing={false}
      onRefresh={() => {}}
      onPress={() => {}}
      getAssetById={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
