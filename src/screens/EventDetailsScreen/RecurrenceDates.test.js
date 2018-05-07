// @flow
import React from "react";
import { shallow } from "enzyme";
import RecurrenceDates from "./RecurrenceDates";

it("renders correctly", () => {
  const props = {
    recurrenceDates: [
      "10/07/2018",
      "11/07/2018",
      "12/07/2018",
      "13/07/2018",
      "14/07/2018",
      "15/07/2018"
    ],
    startTime: "2018-07-09T11:00+01:00"
  };
  const output = shallow(<RecurrenceDates {...props} />);
  expect(output).toMatchSnapshot();
});

it("renders day range for given recurring dates", () => {
  const props = {
    recurrenceDates: [
      "10/07/2018",
      "11/07/2018",
      "12/07/2018",
      "13/07/2018",
      "14/07/2018",
      "15/07/2018"
    ],
    startTime: "2018-07-09T11:00+01:00"
  };
  const output = shallow(<RecurrenceDates {...props} />);

  expect(output.children().text()).toContain("9 Jul - 15 Jul");
});

it("renders day range for recurring dates that are out of order", () => {
  const props = {
    recurrenceDates: [
      "10/07/2018",
      "13/07/2018",
      "11/07/2018",
      "14/07/2018",
      "12/07/2018",
      "15/07/2018"
    ],
    startTime: "2018-07-09T11:00+01:00"
  };
  const output = shallow(<RecurrenceDates {...props} />);

  expect(output.children().text()).toContain("9 Jul - 15 Jul");
});

it("renders nothing if no dates provided", () => {
  const props = {
    recurrenceDates: [],
    startTime: "2018-07-09T11:00+01:00"
  };
  const output = shallow(<RecurrenceDates {...props} />);

  expect(output.children().length).toBe(0);
});
