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

    it("returns the correct imageDetails when dimensions are provided", () => {
      const imageDetails: ImageDetails = sampleOne(generateImageDetails);
      const imageDimensions = { width: 500, height: 200 };
      const imageDetailsWithDimensions = {
        ...imageDetails,
        uri: `${imageDetails.uri}?w=${imageDimensions.width}&h=${
          imageDimensions.height
        }&fit=fill`
      };

      const getter = getImageDetails({
        [imageDetails.id]: imageDetails
      });

      expect(getter(imageDetails.id, imageDimensions)).toEqual(
        imageDetailsWithDimensions
      );
    });
  });

  it("returns correctly when dimensions are provided but there is no image details for image id", () => {
    const imageDimensions = { width: 500, height: 200 };
    const imageId = "image-id";

    const getter = getImageDetails({});

    expect(getter(imageId, imageDimensions)).toBeUndefined();
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
