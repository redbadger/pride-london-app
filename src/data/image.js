// @flow
import * as decode from "../lib/decode";
import type { Decoder } from "../lib/decode";

export type Images = {
  [id: string]: Image
};

export type Image = {
  id: string,
  revision: number,
  uri: string,
  width: number,
  height: number
};

const decodeImage = (locale: string): Decoder<Image> =>
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

export default decodeImage;
