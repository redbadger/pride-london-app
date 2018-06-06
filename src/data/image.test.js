// @flow
import type { ImageDetails } from "./image";
import {
  generateImageDetails,
  generateCMSImage,
  sampleOne
} from "./__test-data";
import { decodeImageDetails, getImageDetails } from "./image";

describe("image", () => {
  describe("getImageDetails", () => {
    it("returns the correct imageDetails", () => {
      const imageDetails: ImageDetails = sampleOne(generateImageDetails);
      const getter = getImageDetails({
        [imageDetails.id]: imageDetails
      });

      expect(getter(imageDetails.id)).toEqual(imageDetails);
    });
  });

  describe("decodeImageDetails", () => {
    it("correctly decodes valid CMS image", () => {
      const data: mixed = sampleOne(generateCMSImage);

      const decoded = decodeImageDetails("en-GB")(data);
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

      const decoded = decodeImageDetails("en-GB")(data);
      expect(decoded.ok).toEqual(false);
    });
  });
});
