import { selectSponsors } from "./sponsors";

describe("selectSponsors", () => {
  it("selects property", () => {
    const state = {
      data: {
        entries: [
          { sys: { contentType: { sys: { id: "event" } } } },
          { sys: { contentType: { sys: { id: "sponsor" } } } }
        ]
      }
    };

    const selected = selectSponsors(state);

    expect(selected.length).toBe(1);
    expect(selected[0]).toBe(state.data.entries[1]);
  });
});
