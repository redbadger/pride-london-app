// @flow
import {
  generateCMSEvent,
  generateCMSEventMinimum,
  sampleOne
} from "./__test-data";
import decodeEvent from "./event";

describe("Event", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS event with all fields", () => {
      const data: mixed = sampleOne(generateCMSEvent);

      const decoded = decodeEvent("en-GB")(data);
      expect(decoded.ok).toEqual(true);
      if (decoded.ok) {
        expect(decoded.value).toMatchSnapshot();
      }
    });

    it.only("correctly decodes valid CMS event with minimum fields", () => {
      const data: mixed = sampleOne(generateCMSEventMinimum);

      const decoded = decodeEvent("en-GB")(data);
      expect(decoded.ok).toEqual(true);
      if (decoded.ok) {
        expect(decoded.value).toMatchSnapshot();
      }
    });

    it("fails if a property is missing", () => {
      const data: mixed = {
        fields: {},
        sys: {
          id: "3O3SZPgYl2MUEWu2MoK2oi",
          contentType: {
            sys: {
              id: "event"
            }
          }
        }
      };

      const decoded = decodeEvent("en-GB")(data);
      expect(decoded.ok).toEqual(false);
    });
  });
});
