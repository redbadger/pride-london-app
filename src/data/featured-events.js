// @flow
import * as decode from "../lib/decode";
import type { Decoder } from "../lib/decode";
import type { FieldRef } from "./field-ref";
import decodeFieldRef from "./field-ref";

export type FeaturedEvents = {
  // important to keep this at the top level so type refinement works
  contentType: "featuredEvents",
  id: string,
  locale: string,
  revision: number,
  fields: {
    title: string,
    events: Array<FieldRef>
  }
};

const decodeFeaturedEvents = (locale: string): Decoder<FeaturedEvents> =>
  decode.shape({
    contentType: decode.at(
      ["sys", "contentType", "sys", "id"],
      decode.value("featuredEvents")
    ),
    id: decode.at(["sys", "id"], decode.string),
    locale: decode.succeed(locale),
    revision: decode.at(["sys", "revision"], decode.number),
    fields: decode.field(
      "fields",
      decode.shape({
        title: decode.at(["title", locale], decode.string),
        events: decode.at(["events", locale], decode.array(decodeFieldRef))
      })
    )
  });

export default decodeFeaturedEvents;
