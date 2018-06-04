// @flow
import type { State } from "../reducers";
import { selectHeaderBanners } from "./header-banner";

describe("selectHeaderBanners", () => {
  it("selects property", () => {
    // Will fix this along with the other fix me's once we have refactored
    // @$FlowFixMe
    const state: State = {
      data: {
        headerBanners: []
      }
    };

    const selected = selectHeaderBanners(state);

    expect(selected).toEqual(state.data.headerBanners);
  });
});
