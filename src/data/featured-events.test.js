// @flow
import { generateCMSFeaturedEvents, sampleOne } from "./__test-data";
import decodeFeaturedEvents from "./featured-events";

describe("FeaturedEvents", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMSFeaturedEvents", () => {
      const data: mixed = sampleOne(generateCMSFeaturedEvents);

      const decoded = decodeFeaturedEvents("en-GB")(data);
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
              id: "featuredEvents"
            }
          }
        }
      };

      const decoded = decodeFeaturedEvents("en-GB")(data);
      expect(decoded.ok).toEqual(false);
    });
  });
});
