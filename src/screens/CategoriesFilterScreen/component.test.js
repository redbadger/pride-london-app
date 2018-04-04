// @flow
import React from "react";
import type { NavigationScreenProp } from "react-navigation";
import { shallow } from "enzyme";
import type { Event } from "../../data/event";
import Component from "./component";

const navigation: NavigationScreenProp<*> = ({}: any);

const render = props =>
  shallow(<Component navigation={navigation} {...props} />);

describe("CategoriesFilterScreen Component", () => {
  it("renders correctly", () => {
    const events: Event[] = ([
      {
        fields: {
          name: { "en-GB": "Event name" },
          eventCategories: { "en-GB": ["Music"] }
        }
      }
    ]: any);

    const stagedCategories: Set<string> = new Set(["Music"]);

    const component = render({ events, stagedCategories });

    expect(component).toMatchSnapshot();
  });
});
