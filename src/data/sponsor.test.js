// @flow
import decodeSponsor from "./sponsor";

describe("sponsor", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS sponsor", () => {
      const data: mixed = {
        fields: {
          sponsorName: { "en-GB": "sponsorName" },
          sponsorLogo: { "en-GB": { sys: { id: "2o2SZPgYl2ABCWu2MoK333" } } },
          sponsorUrl: { "en-GB": "sponsorUrl" },
          sponsorLevel: { "en-GB": "Headline" }
        },
        sys: {
          id: "3O3SZPgYl2MUEWu2MoK2oi",
          contentType: {
            sys: {
              id: "sponsor"
            }
          },
          revision: 1
        }
      };

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
