// @flow
import React from "react";
import { shallow } from "enzyme";
import EventList from "./EventList";
import type { Event } from "../integrations/cms";

const events: Event[] = [
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
      }
    }
  }
];

it("renders correctly", () => {
  const output = shallow(
    <EventList
      events={events}
      locale="en-GB"
      refreshing={false}
      onRefresh={() => {}}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
