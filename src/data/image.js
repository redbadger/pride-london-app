// @flow
import * as decode from "../lib/decode";
import type { Decoder } from "../lib/decode";

export type Images = {
  [id: string]: ImageDetails
};

export type ImageDetails = {
  id: string,
  revision: number,
  uri: string,
  width: number,
  height: number
};

export const getImageDetails = (images: Images) => (
  id: string,
  dimensions: ?{ width: number, height: number }
): ?ImageDetails => {
  const imageDetails = images[id];

  // Image details might be undefined in case of unpublished image
  if (!dimensions || !imageDetails) {
    return imageDetails;
  }

  const imageUriWithResizingBehaviourParameters = `${imageDetails.uri}?w=${
    dimensions.width
  }&h=${dimensions.height}&fit=fill`;
  return Object.assign({}, imageDetails, {
    uri: imageUriWithResizingBehaviourParameters
  });
};

export const decodeImageDetails = (locale: string): Decoder<ImageDetails> =>
  decode.shape({
    id: decode.at(["sys", "id"], decode.string),
    revision: decode.at(["sys", "revision"], decode.number),
    uri: decode.map(
      value => `https:${value}`,
      decode.at(["fields", "file", locale, "url"], decode.string)
    ),
    height: decode.at(
      ["fields", "file", locale, "details", "image", "height"],
      decode.number
    ),
    width: decode.at(
      ["fields", "file", locale, "details", "image", "width"],
      decode.number
    )
  });
