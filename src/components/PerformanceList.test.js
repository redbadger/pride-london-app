// @flow
import React from "react";
import { shallow } from "enzyme";
import PerformanceList from "./PerformanceList";

import type { PerformancePeriods } from "../data/event-deprecated";

it("renders correctly", () => {
  const performances: PerformancePeriods = [
    [
      {
        sys: {
          id: "1",
          type: "performance",
          contentType: { sys: { id: "performance" } },
          revision: 1
        },
        fields: {
          startTime: { "en-GB": "2018-08-01T13:00:00" },
          title: { "en-GB": "Jackie Potato" }
        }
      }
    ],
    [
      {
        sys: {
          id: "2",
          type: "performance",
          contentType: { sys: { id: "performance" } },
          revision: 1
        },
        fields: {
          startTime: { "en-GB": "2018-08-01T18:00:00" },
          title: { "en-GB": "Krystal Pools" }
        }
      }
    ]
  ];
  const output = shallow(
    <PerformanceList performances={performances} locale="en-GB" />
  );
  expect(output).toMatchSnapshot();
});
