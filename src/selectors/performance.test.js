// @flow
import { sampleOne, generatePerformance } from "../data/__test-data";
import type { State } from "../reducers";
import type { Performances } from "../data/performance";
import { selectPerformances, selectPerformanceById } from "./performance";

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
