// @flow
import * as decode from "../lib/decode";
import type { Decoder } from "../lib/decode";

type AmenityType = "Toilet" | "First Aid";

const amenityTypeDecoder: Decoder<AmenityType> = decode.oneOf([
  decode.value("Toilet"),
  decode.value("First Aid")
]);

export type Amenity = {
  // important to keep this at the top level so type refinement works
  contentType: "amenity",
  id: string,
  locale: string,
  revision: number,
  fields: {
    type: AmenityType,
    location: { lat: number, lon: number }
  }
};

const decodeAmenity = (locale: string): Decoder<Amenity> =>
  decode.shape({
    contentType: decode.at(
      ["sys", "contentType", "sys", "id"],
      decode.value("amenity")
    ),
    id: decode.at(["sys", "id"], decode.string),
    locale: decode.succeed(locale),
    revision: decode.at(["sys", "revision"], decode.number),
    fields: decode.field(
      "fields",
      decode.shape({
        type: decode.at(["type", locale], amenityTypeDecoder),
        location: decode.at(
          ["location", locale],
          decode.shape({
            lat: decode.field("lat", decode.number),
            lon: decode.field("lon", decode.number)
          })
        )
      })
    )
  });

export default decodeAmenity;
