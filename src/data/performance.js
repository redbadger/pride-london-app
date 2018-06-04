// @flow
import * as decode from "../lib/decode";
import type { Decoder } from "../lib/decode";

export type Performances = {
  [id: string]: Performance
};

export type Performance = {
  // important to keep this at the top level so type refinement works
  contentType: "performance",
  id: string,
  locale: string,
  revision: number,
  fields: {
    title: string,
    startTime: string
  }
};

const decodePerformance = (locale: string): Decoder<Performance> =>
  decode.shape({
    contentType: decode.at(
      ["sys", "contentType", "sys", "id"],
      decode.value("performance")
    ),
    id: decode.at(["sys", "id"], decode.string),
    locale: decode.succeed(locale),
    revision: decode.at(["sys", "revision"], decode.number),
    fields: decode.field(
      "fields",
      decode.shape({
        title: decode.at(["title", locale], decode.string),
        startTime: decode.at(["startTime", locale], decode.string)
      })
    )
  });

export default decodePerformance;
