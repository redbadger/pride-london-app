// @flow
import type { State } from "../reducers";
import { selectSponsors } from "./sponsors";

describe("selectSponsors", () => {
  it("selects property", () => {
    // Will fix this along with the other fix me's once we have refactored
    // @$FlowFixMe
    const state: State = {
      data: {
        sponsors: []
      }
    };

    const selected = selectSponsors(state);

    expect(selected).toEqual(state.data.sponsors);
  });
});
