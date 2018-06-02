// @flow
import { ok, error, map, withDefault } from "./result";

describe("ok", () => {
  it("creates an ok result", () => {
    const result = ok("test");
    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual("test");
    }
  });
});

describe("error", () => {
  it("creates an errored result", () => {
    const result = error("message");
    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("message");
    }
  });
});

describe("map", () => {
  it("maps ok results", () => {
    const result = map(value => value + 1, ok(1));
    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual(2);
    }
  });

  it("does not map errored results", () => {
    const result = map(value => value + 1, error("message"));
    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("message");
    }
  });
});

describe("withDefault", () => {
  it("unwraps an ok result", () => {
    const value = withDefault(2, ok(1));
    expect(value).toEqual(1);
  });

  it("unwraps an error result with default value", () => {
    const value = withDefault(2, error("message"));
    expect(value).toEqual(2);
  });
});
