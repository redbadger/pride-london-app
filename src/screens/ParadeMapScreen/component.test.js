// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeMapScreen from "./component";
import {
  region as paradeRegion,
  route,
  terminals
} from "../../constants/parade-coordinates";

describe("Parade Map Screen component", () => {
  it("renders correctly", () => {
    const props = {
      route,
      paradeRegion,
      terminals,
      navigation: { addListener: jest.fn() }
    };
    const output = shallow(<ParadeMapScreen {...props} />);
    expect(output).toMatchSnapshot();
  });

  it("removes navigation listener on unmount", () => {
    const listener = {
      remove: jest.fn()
    };
    const props = {
      route,
      paradeRegion,
      terminals,
      navigation: {
        addListener: jest.fn().mockReturnValue(listener)
      }
    };

    const output = shallow(<ParadeMapScreen {...props} />);
    expect(props.navigation.addListener).toHaveBeenCalled();

    output.unmount();
    expect(listener.remove).toHaveBeenCalled();
  });

  it("returns focus to parade route on blur", () => {
    const props = {
      route,
      paradeRegion,
      terminals,
      navigation: {
        addListener: jest.fn()
      }
    };

    const output = shallow(<ParadeMapScreen {...props} />);
    const focus = jest.fn();
    output.instance().mapRef.current = { focus };

    expect(props.navigation.addListener).toHaveBeenCalledWith(
      "didBlur",
      expect.any(Function)
    );

    const blurListener = props.navigation.addListener.mock.calls[0][1];
    blurListener();

    expect(focus).toHaveBeenCalled();
  });
});
