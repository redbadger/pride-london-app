// @flow
import {
  succeed,
  string,
  number,
  value,
  field,
  at,
  shape,
  oneOf,
  map,
  filterMap
} from "./decode";

describe("succeed", () => {
  it("creates a decoder that always succeeds", () => {
    const input: mixed = "test";

    const result = succeed(1)(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual(1);
    }
  });
});

describe("string", () => {
  it("succeeds when decoding string types", () => {
    const input: mixed = "test";

    const result = string(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual("test");
    }
  });

  it("fails when decoding non string types", () => {
    const input: mixed = 1;

    const result = string(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not a string");
    }
  });
});

describe("number", () => {
  it("succeeds at decoding number types", () => {
    const input: mixed = 1;

    const result = number(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual(1);
    }
  });

  it("fails when decoding non number types", () => {
    const input: mixed = "test";

    const result = number(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not a number");
    }
  });
});

describe("value", () => {
  it("succeeds at decoding exact value", () => {
    const input: mixed = 1;

    const result = value(1)(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual(1);
    }
  });

  it("fails when decoding a different value", () => {
    const input: mixed = "test";

    const result = value(1)(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not equal");
    }
  });
});

describe("field", () => {
  it("succeeds at decoding a specific object field", () => {
    const input: mixed = {
      a: "test"
    };

    const result = field("a", string)(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual("test");
    }
  });

  it("fails when input is not an object", () => {
    const input: mixed = "test";

    const result = field("a", string)(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not an object");
    }
  });

  it("fails when object field is missing", () => {
    const input: mixed = {};

    const result = field("a", string)(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is missing field 'a'");
    }
  });

  it("fails when object field is incorrect type", () => {
    const input: mixed = {
      a: 1
    };

    const result = field("a", string)(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not a string");
    }
  });
});

describe("at", () => {
  it("succeeds at decoding a deeply nested object field", () => {
    const input: mixed = {
      a: {
        b: {
          c: "test"
        }
      }
    };

    const result = at(["a", "b", "c"], string)(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual("test");
    }
  });

  it("fails when deeply nested object field is missing", () => {
    const input: mixed = {
      a: {}
    };

    const result = at(["a", "b", "c"], string)(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is missing field 'b'");
    }
  });

  it("fails when deeply nested object field is incorrect type", () => {
    const input: mixed = {
      a: {
        b: {
          c: 1
        }
      }
    };

    const result = at(["a", "b", "c"], string)(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not a string");
    }
  });
});

describe("shape", () => {
  it("returns an ok result when it succeeds", () => {
    const decoder = shape({
      a: field("a", string),
      b: at(["b", "c"], number)
    });

    const result = decoder({
      a: "A",
      b: {
        c: 2
      }
    });

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual({
        a: "A",
        b: 2
      });
    }
  });

  it("fails when input is not an object", () => {
    const decoder = shape({
      a: field("a", string),
      b: at(["b", "c"], number)
    });

    const result = decoder("test");

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not an object");
    }
  });

  it("fails if object is missing a key", () => {
    const decoder = shape({
      a: field("a", string),
      b: at(["b", "c"], number)
    });

    const result = decoder({
      a: "A"
    });

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is missing field 'b'");
    }
  });

  it("fails if a passed decoder fails", () => {
    const decoder = shape({
      a: field("a", string),
      b: at(["b", "c"], number)
    });

    const result = decoder({
      a: 1,
      b: {
        c: 2
      }
    });

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not a string");
    }
  });
});

describe("oneOf", () => {
  it("succeeds on the first successful decoder", () => {
    const input: mixed = "value";

    const result = oneOf([value("a"), value("b"), value("value")])(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual("value");
    }
  });

  it("fails if no decoders succeed", () => {
    const input: mixed = "value";

    const result = oneOf([value("a"), value("a"), value("c")])(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("no decoders matched");
    }
  });
});

describe("map", () => {
  it("maps a successful decoder", () => {
    const input: mixed = 1;

    const result = map(v => v.toString(), number)(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual("1");
    }
  });

  it("does not map a failed decoder", () => {
    const input: mixed = "1";

    const result = map(v => {
      v.toString();
    }, number)(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not a number");
    }
  });
});

describe("filterMap", () => {
  it("succeeds for an array", () => {
    const input: mixed = ["a", 1, "b", 2];

    const result = filterMap(string)(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual(["a", "b"]);
    }
  });

  it("succeeds with empty array if no valid valies in array", () => {
    const input: mixed = [1, 2, 3];

    const result = filterMap(string)(input);

    expect(result.ok).toEqual(true);
    if (result.ok) {
      expect(result.value).toEqual([]);
    }
  });

  it("fails if not passed an array", () => {
    const input: mixed = "value";

    const result = filterMap(string)(input);

    expect(result.ok).toEqual(false);
    if (!result.ok) {
      expect(result.error).toEqual("value is not an array");
    }
  });
});
