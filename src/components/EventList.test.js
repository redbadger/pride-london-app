import React from "react";
import { LayoutAnimation } from "react-native";
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
        eventsListPicture: {
          "en-GB": "http://placekitten.com/200/300"
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
        eventsListPicture: {
          "en-GB": "http://placekitten.com/200/300"
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
        eventsListPicture: {
          "en-GB": "http://placekitten.com/200/300"
        }
      }
    }
  ]
];

let configureNextSpy;
beforeEach(() => {
  configureNextSpy = jest
    .spyOn(LayoutAnimation, "configureNext")
    .mockImplementation(() => {});
});

describe("EventList", () => {
  const render = props =>
    shallow(
      <EventList
        events={events}
        locale="en-GB"
        refreshing={false}
        onRefresh={() => {}}
        onPress={() => {}}
        getAssetSource={() => {}}
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

  it("animates layout changes when events were added on render", () => {
    const output = render();
    output.setState({
      eventsAdded: 1,
      eventsRemoved: 0,
      eventsReordered: false
    });
    expect(configureNextSpy).toHaveBeenCalledTimes(1);
  });

  it("animates layout changes when events were removed on render", () => {
    const output = render();
    output.setState({
      eventsAdded: 0,
      eventsRemoved: 1,
      eventsReordered: false
    });
    expect(configureNextSpy).toHaveBeenCalledTimes(1);
  });

  it("does not animate layout changes when events have been reordered", () => {
    const output = render();
    output.setState({
      eventsAdded: 1,
      eventsRemoved: 0,
      eventsReordered: true
    });
    expect(configureNextSpy).not.toHaveBeenCalled();
  });

  it("renders section headers correctly", () => {
    const renderSectionHeader = render().prop("renderSectionHeader");
    const output = renderSectionHeader({ section: { data: events[0] } });

    expect(output).toMatchSnapshot();
  });

  it("renders section footers correctly", () => {
    const renderSectionFooter = render().prop("renderSectionFooter");
    const output = renderSectionFooter({ section: { data: events[0] } });

    expect(output).toMatchSnapshot();
  });

  it("renders items correctly", () => {
    const renderItem = render().prop("renderItem");
    const output = renderItem({ item: events[0][0], index: 0, section: 0 });

    expect(output).toMatchSnapshot();
  });

  it("renders item separators correctly", () => {
    const ItemSeparatorComponent = render().prop("ItemSeparatorComponent");
    const output = shallow(<ItemSeparatorComponent />);

    expect(output).toMatchSnapshot();
  });

  it("renders section separators correctly", () => {
    const SectionSeparatorComponent = render().prop(
      "SectionSeparatorComponent"
    );
    const output = shallow(<SectionSeparatorComponent />);

    expect(output).toMatchSnapshot();
  });

  it("extracts keys correctly", () => {
    const keyExtractor = render().prop("keyExtractor");
    const key = keyExtractor(events[0][0]);

    expect(key).toBe("1");
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
        savedEvents: props.savedEvents
      };
      const nextState = {
        eventsChanged: false
      };

      const output = render(props);
      const shouldUpdate = output
        .instance()
        .shouldComponentUpdate(nextProps, nextState);

      expect(shouldUpdate).toBe(false);
    });

    it("allows update when locale changes", () => {
      const nextProps = {
        locale: "en-US",
        refreshing: false,
        savedEvents: props.savedEvents
      };
      const nextState = {
        eventsChanged: false
      };

      const output = render(props);
      const shouldUpdate = output
        .instance()
        .shouldComponentUpdate(nextProps, nextState);

      expect(shouldUpdate).toBe(true);
    });

    it("allows update when refreshing", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: true,
        savedEvents: props.savedEvents
      };
      const nextState = {
        eventsChanged: false
      };

      const output = render(props);
      const shouldUpdate = output
        .instance()
        .shouldComponentUpdate(nextProps, nextState);

      expect(shouldUpdate).toBe(true);
    });

    it("allows update when events change", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: false,
        savedEvents: props.savedEvents
      };
      const nextState = {
        eventsAdded: 0,
        eventsRemoved: 0,
        eventsReordered: true
      };

      const output = render(props);
      const shouldUpdate = output
        .instance()
        .shouldComponentUpdate(nextProps, nextState);

      expect(shouldUpdate).toBe(true);
    });

    it("allows savedEvents change", () => {
      const nextProps = {
        locale: "en-GB",
        refreshing: false,
        savedEvents: new Set(["test"])
      };
      const nextState = {
        eventsChanged: false
      };

      const output = render(props);
      const shouldUpdate = output
        .instance()
        .shouldComponentUpdate(nextProps, nextState);

      expect(shouldUpdate).toBe(true);
    });
  });
});

afterEach(() => {
  configureNextSpy.mockRestore();
});
