// @flow
import { some, none, withDefault } from "./maybe";

describe("some", () => {
  it("wraps a value as a maybe type", () => {
    expect(some("value")).toEqual("value");
  });
});

describe("none", () => {
  it("is just null", () => {
    expect(none()).toEqual(null);
  });
});

describe("withDefault", () => {
  it("returns the default value if passed none", () => {
    const result = withDefault("test")(none());

    expect(result).toEqual(some("test"));
  });

  it("returns the value if passed some", () => {
    const result = withDefault("test")(some("value"));

    expect(result).toEqual(some("value"));
  });
});
