// @flow
import { sampleOne, generatePerformance } from "../data/__test-data";
import type { State } from "../reducers";
import type { Performance, Performances } from "../data/performance";
import {
  getTimePeriod,
  groupPerformancesByPeriod,
  selectPerformances,
  selectPerformanceById
} from "./performance";

const createPerformance = (startTime: string, seed): Performance => {
  const performance = sampleOne(generatePerformance, { seed });
  performance.fields.startTime = startTime;
  return performance;
};

describe("selectPerformances", () => {
  it("selects performances from state", () => {
    // Will fix this along with the other fix me's once we have refactored
    // @$FlowFixMe
    const state: State = {
      data: {
        performances: {}
      }
    };

    const selected = selectPerformances(state);

    expect(selected).toEqual(state.data.performances);
  });
});

describe("selectPerformanceById", () => {
  it("selects performance", () => {
    const performance = sampleOne(generatePerformance);
    const performances: Performances = {
      [performance.id]: performance
    };

    const selected = selectPerformanceById(performances, performance.id);

    expect(selected).toEqual(performance);
  });
});

describe("groupPerformancesByPeriod", () => {
  it("returns empty array when no performances exist", () => {
    const expected = [];
    const actual = groupPerformancesByPeriod([]);

    expect(actual).toEqual(expected);
  });

  it("separates two individual performances by period and sorts", () => {
    const performances = [
      createPerformance("2018-08-01T18:01:00", 74),
      createPerformance("2018-08-01T13:00:00", 925)
    ];

    const expected = [[performances[1]], [performances[0]]];
    const actual = groupPerformancesByPeriod(performances);

    expect(actual).toEqual(expected);
  });

  it("leaves two performances in the same period together", () => {
    const performances = [
      createPerformance("2018-08-01T09:00:00", 1463),
      createPerformance("2018-08-01T10:00:00", 3554)
    ];

    const expected = [[performances[0], performances[1]]];
    const actual = groupPerformancesByPeriod(performances);

    expect(actual).toEqual(expected);
  });

  it("makes two groups", () => {
    const performances = [
      createPerformance("2018-08-01T07:00:00", 537),
      createPerformance("2018-08-01T11:00:00", 753),
      createPerformance("2018-08-01T10:00:00", 682),
      createPerformance("2018-08-01T19:00:00", 139),
      createPerformance("2018-08-01T18:00:00", 426)
    ];

    const expected = [
      [performances[0], performances[2], performances[1]],
      [performances[4], performances[3]]
    ];
    const actual = groupPerformancesByPeriod(performances);

    expect(actual).toEqual(expected);
  });

  it("makes multiple groups", () => {
    const performances = [
      createPerformance("2018-08-01T18:00:00", 724),
      createPerformance("2018-08-01T11:00:00", 264),
      createPerformance("2018-08-02T02:00:00", 715),
      createPerformance("2018-08-01T11:30:00", 375),
      createPerformance("2018-08-01T19:00:00", 245),
      createPerformance("2018-08-01T13:00:00", 249),
      createPerformance("2018-08-02T00:00:00", 925)
    ];

    const expected = [
      [performances[1], performances[3]],
      [performances[5]],
      [performances[0], performances[4], performances[6], performances[2]]
    ];
    const actual = groupPerformancesByPeriod(performances);

    expect(actual).toEqual(expected);
  });
});

// Should probably move this to date selectors.
describe("getTimePeriod", () => {
  it("5:59am is Evening (late)", () => {
    const expected = "Evening";
    const actual = getTimePeriod("2018-01-01T05:59");

    expect(actual).toEqual(expected);
  });
  it("6:00am is Morning", () => {
    const expected = "Morning";
    const actual = getTimePeriod("2018-01-01T06:00");

    expect(actual).toEqual(expected);
  });
  it("11:59am is Morning", () => {
    const expected = "Morning";
    const actual = getTimePeriod("2018-01-01T11:59");

    expect(actual).toEqual(expected);
  });
  it("12:00am is Afternoon", () => {
    const expected = "Afternoon";
    const actual = getTimePeriod("2018-01-01T12:00");

    expect(actual).toEqual(expected);
  });
  it("5:59pm is Afternoon", () => {
    const expected = "Afternoon";
    const actual = getTimePeriod("2018-01-01T17:59");

    expect(actual).toEqual(expected);
  });
  it("6:00pm is Evening", () => {
    const expected = "Evening";
    const actual = getTimePeriod("2018-01-01T18:00");

    expect(actual).toEqual(expected);
  });
});
