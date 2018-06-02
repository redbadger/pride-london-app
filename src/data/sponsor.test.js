// @flow
import { generateCMSSponsor, sampleOne } from "./__test-data";
import decodeSponsor from "./sponsor";

describe("Sponsor", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS sponsor", () => {
      const data: mixed = sampleOne(generateCMSSponsor);

      const decoded = decodeSponsor("en-GB")(data);
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
              id: "sponsor"
            }
          }
        }
      };

      const decoded = decodeSponsor("en-GB")(data);
      expect(decoded.ok).toEqual(false);
    });
  });
});
