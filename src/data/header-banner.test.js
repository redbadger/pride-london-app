// @flow
import decodeHeaderBanner from "./header-banner";

describe("HeaderBanner", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS headerbanner", () => {
      const data: mixed = {
        fields: {
          heading: { "en-GB": "heading" },
          headingLine2: { "en-GB": "headingLine2" },
          subHeading: { "en-GB": "subHeading" },
          heroImage: { "en-GB": { sys: { id: "2o2SZPgYl2ABCWu2MoK333" } } },
          backgroundColour: { "en-GB": "#333333" }
        },
        sys: {
          id: "3O3SZPgYl2MUEWu2MoK2oi",
          contentType: {
            sys: {
              id: "headerBanner"
            }
          },
          revision: 1
        }
      };

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
