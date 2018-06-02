// @flow
import * as decode from "../lib/decode";
import type { Decoder } from "../lib/decode";
import type { FieldRef } from "./field-ref";
import decodeFieldRef from "./field-ref";

export type HeaderBanner = {
  // important to keep this at the top level so type refinement works
  contentType: "headerBanner",
  id: string,
  locale: string,
  revision: number,
  fields: {
    heading: string,
    headingLine2: string,
    subHeading: string,
    heroImage: FieldRef,
    backgroundColour: string
  }
};

const decodeHeaderBanner = (locale: string): Decoder<HeaderBanner> =>
  decode.shape({
    contentType: decode.at(
      ["sys", "contentType", "sys", "id"],
      decode.value("headerBanner")
    ),
    id: decode.at(["sys", "id"], decode.string),
    locale: decode.succeed(locale),
    revision: decode.at(["sys", "revision"], decode.number),
    fields: decode.field(
      "fields",
      decode.shape({
        heading: decode.at(["heading", locale], decode.string),
        headingLine2: decode.at(["headingLine2", locale], decode.string),
        subHeading: decode.at(["subHeading", locale], decode.string),
        heroImage: decode.at(["heroImage", locale], decodeFieldRef),
        backgroundColour: decode.at(["backgroundColour", locale], decode.string)
      })
    )
  });

export default decodeHeaderBanner;
