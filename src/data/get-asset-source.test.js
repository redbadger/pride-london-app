// @flow
import getAssetSource from "./get-asset-source";

describe("getAssetSource", () => {
  it("returns source object as consumbed by react-native/Image", () => {
    const getAssetById = jest.fn().mockReturnValue({
      fields: {
        title: { "en-GB": "My Asset" },
        file: {
          "en-GB": {
            contentType: "image/png",
            fileName: "my-asset.png",
            url: "//example.com/images/my-asset.png",
            details: {
              size: 256,
              image: {
                height: 100,
                width: 100
              }
            }
          }
        }
      },
      sys: {
        id: "my-asset",
        type: "Asset",
        revision: 1
      }
    });

    const source = getAssetSource(getAssetById)({
      sys: {
        id: "my-asset"
      }
    });

    expect(getAssetById).toHaveBeenCalledWith("my-asset");
    expect(source).toEqual({
      uri: "https://example.com/images/my-asset.png",
      height: 100,
      width: 100
    });
  });
});
