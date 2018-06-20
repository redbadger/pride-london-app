import { hyphenate } from "./string";

describe("hyphenate", () => {
  it("formats a string into lowercase with hyphens in between words", () => {
    expect(hyphenate("Hello Jolly World")).toMatchSnapshot();
  });
});
