// @flow
import React from "react";
import { shallow } from "enzyme";
import SplashScreen from "./component";

it("renders correctly when showing", () => {
  const output = shallow(
    <SplashScreen state="showing" onAnimationComplete={() => {}}>
      hello
    </SplashScreen>
  );

  expect(output).toMatchSnapshot();
});

it("renders correctly when hidden", () => {
  const output = shallow(
    <SplashScreen state="hidden" onAnimationComplete={() => {}}>
      hello
    </SplashScreen>
  );

  expect(output).toMatchSnapshot();
});
