// @flow
import decodeFieldRef from "./field-ref";

describe("FieldRef", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS fielf reference", () => {
      const data: mixed = {
        sys: {
          id: "test"
        }
      };

      const decoded = decodeFieldRef(data);
      expect(decoded.ok).toEqual(true);
      if (decoded.ok) {
        expect(decoded.value).toMatchSnapshot();
      }
    });

    it("fails if a property is missing", () => {
      const data: mixed = {};

      const decoded = decodeFieldRef(data);
      expect(decoded.ok).toEqual(false);
    });
  });
});
