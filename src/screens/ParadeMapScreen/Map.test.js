// @flow
import React from "react";
import { shallow } from "enzyme";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { generateEvent, sampleOne } from "../../data/__test-data";
import Map from "./Map";

const navigation: NavigationScreenProp<NavigationState> = ({
  navigate: () => {}
}: any);

const stages = sampleOne(generateEvent, { seed: 5728 });

it("renders correctly", () => {
  const output = shallow(
    <Map
      stages={[stages]}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
      savedEvents={new Set()}
    />
  );
  expect(output).toMatchSnapshot();
});
