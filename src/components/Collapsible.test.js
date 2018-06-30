// @flow
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import Collapsible from "./Collapsible";

it("renders correctly", () => {
  const output = shallow(
    <Collapsible>
      <Text>Hello</Text>
    </Collapsible>
  );

  expect(output).toMatchSnapshot();
});

describe("collapsing behaviour", () => {
  const render = contentHeight => {
    const output = shallow(
      <Collapsible maxHeight={200} showMoreLabel="more" showLessLabel="less">
        <Text>Hello</Text>
      </Collapsible>
    );

    const layoutEvent = output.find({ testID: "children" }).prop("onLayout");
    layoutEvent({ nativeEvent: { layout: { height: contentHeight } } });

    return output.update();
  };

  const renderAndExpand = contentHeight => {
    const collapsed = render(contentHeight);

    collapsed
      .find({ testID: "showmore" })
      .parent()
      .simulate("press");

    return collapsed.update();
  };

  describe("when content does not exceed limit", () => {
    const output = render(100);

    it("renders correctly", () => {
      expect(output).toMatchSnapshot();
    });
  });

  describe("when content exceeds limit", () => {
    const output = render(500);

    it("renders correctly", () => {
      expect(output).toMatchSnapshot();
    });

    it("shows the show more link", () => {
      expect(output.find({ testID: "showmore" }).exists()).toBe(true);
      expect(
        output
          .find({ testID: "showmore" })
          .children()
          .text()
      ).toBe("more");
    });
  });

  describe("when expanded", () => {
    const output = renderAndExpand(500);

    it("renders correctly", () => {
      expect(output.state("collapsed")).toBe(false);
      expect(output).toMatchSnapshot();
    });

    it("shows the show less link", () => {
      expect(output.find({ testID: "showmore" }).exists()).toBe(true);
      expect(
        output
          .find({ testID: "showmore" })
          .children()
          .text()
      ).toBe("less");
    });
  });
});
