// @flow
import { generateCMSParadeGroup, sampleOne } from "./__test-data";
import decodeParadeGroup from "./parade-group";

describe("Parade Group", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS Parade Group", () => {
      const data: mixed = sampleOne(generateCMSParadeGroup);

      const decoded = decodeParadeGroup("en-GB")(data);
      expect(decoded.ok).toEqual(true);
      if (decoded.ok) {
        expect(decoded.value).toMatchSnapshot();
      }
    });

    it("correctly decodes valid CMS Parade Group with missing optional fields", () => {
      const data: mixed = {
        sys: {
          id: "jU1T9830fV3Bl3Z3fk7yktQp",
          contentType: {
            sys: {
              id: "paradeGroup"
            }
          },
          revision: 1
        },
        fields: {
          name: {
            "en-GB": "mm2T1WpGuu4k03kl04088fDh1B5V"
          }
        }
      };

      const decoded = decodeParadeGroup("en-GB")(data);
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
              id: "paradeGroup"
            }
          }
        }
      };

      const decoded = decodeParadeGroup("en-GB")(data);
      expect(decoded.ok).toEqual(false);
    });
  });
});
