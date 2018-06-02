// @flow
import { generateCMSHeaderBanner, sampleOne } from "./__test-data";
import decodeHeaderBanner from "./header-banner";

describe("HeaderBanner", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS headerbanner", () => {
      const data: mixed = sampleOne(generateCMSHeaderBanner);

      const decoded = decodeHeaderBanner("en-GB")(data);
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
              id: "headerBanner"
            }
          }
        }
      };

      const decoded = decodeHeaderBanner("en-GB")(data);
      expect(decoded.ok).toEqual(false);
    });
  });
});
