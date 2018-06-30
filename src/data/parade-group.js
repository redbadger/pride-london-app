// @flow
import * as decode from "../lib/decode";
import type { Decoder } from "../lib/decode";
import type { Maybe } from "../lib/maybe";

export type ParadeGroup = {
  // important to keep this at the top level so type refinement works
  contentType: "paradeGroup",
  id: string,
  locale: string,
  revision: number,
  fields: {
    name: string,
    facebookUrl: Maybe<string>,
    twitterUrl: Maybe<string>,
    websiteUrl: Maybe<string>
  }
};

const maybeField = <A>(
  locale: string,
  field: string,
  decoder: Decoder<A>
): Decoder<Maybe<A>> =>
  decode.field(field, decode.maybe(decode.field(locale, decoder)));

const decodeParadeGroup = (locale: string): Decoder<ParadeGroup> =>
  decode.shape({
    contentType: decode.at(
      ["sys", "contentType", "sys", "id"],
      decode.value("paradeGroup")
    ),
    id: decode.at(["sys", "id"], decode.string),
    locale: decode.succeed(locale),
    revision: decode.at(["sys", "revision"], decode.number),
    fields: decode.field(
      "fields",
      decode.shape({
        name: decode.at(["name", locale], decode.string),
        facebookUrl: maybeField(locale, "facebookUrl", decode.string),
        twitterUrl: maybeField(locale, "twitterUrl", decode.string),
        websiteUrl: maybeField(locale, "websiteUrl", decode.string)
      })
    )
  });

export default decodeParadeGroup;
