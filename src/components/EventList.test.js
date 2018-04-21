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

describe("EventList", () => {
  const render = props =>
    shallow(
      <EventList
        events={events}
        locale="en-GB"
        refreshing={false}
        onRefresh={() => {}}
        onPress={() => {}}
        getAssetById={() => {}}
        {...props}
      />
    );

  it("renders correctly", () => {
    const output = render();
    expect(output).toMatchSnapshot();
  });

  describe("#shouldComponentUpdate", () => {
    const props = {
      locale: "en-GB",
      refreshing: false,
      events
    };

    it("stops update if locale, refresing and events stay the same", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: false,
        events: events.slice(0, 2) // force different instance
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(false);
    });

    it("allows update when locale changes", () => {
      const nextProps = {
        locale: "en-US",
        refreshing: false,
        events
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("allows update when refreshing", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: true,
        events
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("allows update when events changue", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: false,
        events: events.slice(0, 1)
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });
  });
});
