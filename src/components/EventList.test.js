import React from "react";
import { shallow } from "enzyme";
import EventList, { renderItem } from "./EventList";
import EventCard from "./EventCard";

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
        },
        endTime: {
          "en-GB": "2018-08-11T00:00"
        },
        locationName: {
          "en-GB": "Somewhere"
        },
        eventPriceLow: {
          "en-GB": "0"
        },
        eventPriceHigh: {
          "en-GB": "0"
        },
        imageUrl: {
          "en-GB": "http://placekitten.com/200/300"
        },
        isFree: {
          "en-GB": true
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
        },
        endTime: {
          "en-GB": "2018-08-11T00:00"
        },
        locationName: {
          "en-GB": "Somewhere"
        },
        eventPriceLow: {
          "en-GB": "0"
        },
        eventPriceHigh: {
          "en-GB": "0"
        },
        imageUrl: {
          "en-GB": "http://placekitten.com/200/300"
        },
        isFree: {
          "en-GB": true
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
        },
        endTime: {
          "en-GB": "2018-08-11T00:00"
        },
        locationName: {
          "en-GB": "Somewhere"
        },
        eventPriceLow: {
          "en-GB": "0"
        },
        eventPriceHigh: {
          "en-GB": "0"
        },
        imageUrl: {
          "en-GB": "http://placekitten.com/200/300"
        },
        isFree: {
          "en-GB": true
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
        getAssetUrl={() => {}}
        savedEvents={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        {...props}
      />
    );

  it("renders correctly", () => {
    const output = render();
    expect(output).toMatchSnapshot();
  });

  it("renders section headers correctly", () => {
    const renderSectionHeader = render().prop("renderSectionHeader");
    const output = shallow(
      renderSectionHeader({ section: { title: "Hello" } })
    );

    expect(output).toMatchSnapshot();
  });

  describe("#renderItem", () => {
    it("renders items correctly", () => {
      const Item = renderItem({
        isSavedEvent: () => false,
        addSavedEvent: () => {},
        removeSavedEvent: () => {},
        locale: "en-GB",
        onPress: () => {},
        getAssetUrl: () => {}
      });
      const output = shallow(<Item item={events[0][0]} />);

      expect(output).toMatchSnapshot();
    });

    it("calls addSavedEvent when toggleSaved is called with true", () => {
      const event = events[0][0];
      const spy = jest.fn();
      const Item = renderItem({
        isSavedEvent: () => false,
        addSavedEvent: spy,
        removeSavedEvent: () => {},
        locale: "en-GB",
        onPress: () => {},
        getAssetUrl: () => {}
      });
      const output = shallow(<Item item={event} />);
      const toggleSaved = output.find(EventCard).prop("toggleSaved");
      toggleSaved(true);
      expect(spy).toBeCalledWith(event.sys.id);
    });

    it("calls removeSavedEvent when toggleSaved is called with false", () => {
      const event = events[0][0];
      const spy = jest.fn();
      const Item = renderItem({
        isSavedEvent: () => false,
        addSavedEvent: () => {},
        removeSavedEvent: spy,
        locale: "en-GB",
        onPress: () => {},
        getAssetUrl: () => {}
      });
      const output = shallow(<Item item={event} />);
      const toggleSaved = output.find(EventCard).prop("toggleSaved");
      toggleSaved(false);
      expect(spy).toBeCalledWith(event.sys.id);
    });
  });

  describe("#shouldComponentUpdate", () => {
    const props = {
      locale: "en-GB",
      refreshing: false,
      events,
      savedEvents: new Set()
    };

    it("stops update if locale, refresing and events stay the same", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: false,
        events: events.slice(0, 2), // force different instance
        savedEvents: props.savedEvents
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(false);
    });

    it("allows update when locale changes", () => {
      const nextProps = {
        locale: "en-US",
        refreshing: false,
        events,
        savedEvents: props.savedEvents
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("allows update when refreshing", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: true,
        events,
        savedEvents: props.savedEvents
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("allows update when events changue", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: false,
        events: events.slice(0, 1),
        savedEvents: props.savedEvents
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("allows savedEvents change", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: false,
        events,
        savedEvents: new Set(["test"])
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });
  });
});
