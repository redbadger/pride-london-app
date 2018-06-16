// @flow
import React from "react";
import { LayoutAnimation } from "react-native";
import { shallow } from "enzyme";
import { generateEvent, sampleOne } from "../data/__test-data";
import EventList from "./EventList";

const eventA = sampleOne(generateEvent, { seed: 1234 });
const eventB = sampleOne(generateEvent, { seed: 6426 });
const eventC = sampleOne(generateEvent, { seed: 2344 });

const events = [[eventA, eventB], [eventC]];

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
    const output = renderItem({
      item: events[0][0],
      index: 0,
      section: {
        index: 0
      }
    });

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

    expect(key).toBe(events[0][0].id);
  });

  describe("#shouldComponentUpdate", () => {
    const props = {
      refreshing: false,
      events,
      savedEvents: new Set()
    };

    it("stops update if refresing and events stay the same", () => {
      const nextProps = {
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

    it("allows update when refreshing", () => {
      const nextProps = {
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
