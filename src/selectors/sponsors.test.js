import { selectSponsors } from "./sponsors";

describe("selectSponsors", () => {
  it("selects property", () => {
    const state = {
      data: {
        sponsors: []
      }
    };

    const selected = selectSponsors(state);

    expect(selected).toEqual(state.data.sponsors);
  });
});
