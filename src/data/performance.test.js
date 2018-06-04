// @flow
import { generateCMSPerformance, sampleOne } from "./__test-data";
import decodePerformance from "./performance";

describe("Performance", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS performance", () => {
      const data: mixed = sampleOne(generateCMSPerformance);

      const decoded = decodePerformance("en-GB")(data);
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
              id: "performance"
            }
          }
        }
      };

      const decoded = decodePerformance("en-GB")(data);
      expect(decoded.ok).toEqual(false);
    });
  });
});
