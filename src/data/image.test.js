// @flow
import { generateCMSImage, sampleOne } from "./__test-data";
import decodeImage from "./image";

describe("Image", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS image", () => {
      const data: mixed = sampleOne(generateCMSImage);

      const decoded = decodeImage("en-GB")(data);
      expect(decoded.ok).toEqual(true);
      if (decoded.ok) {
        expect(decoded.value).toMatchSnapshot();
      }
    });

    it("fails if a property is missing", () => {
      const data: mixed = {
        fields: {},
        sys: {
          id: "3O3SZPgYl2MUEWu2MoK2oi"
        }
      };

      const decoded = decodeImage("en-GB")(data);
      expect(decoded.ok).toEqual(false);
    });
  });
});
