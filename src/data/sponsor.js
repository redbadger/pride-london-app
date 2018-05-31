// @flow
import * as decode from "../lib/decode";
import type { Decoder } from "../lib/decode";

// We will move this out as we move other content types to this pattern
export type Reference = {
  id: string
};

const referenceDecoder: Decoder<Reference> = decode.map(
  id => ({ id }),
  decode.at(["sys", "id"], decode.string)
);

export type SponsorLevel = "Headline" | "Gold" | "Silver" | "Bronze";

const sponsorLevelDecoder: Decoder<SponsorLevel> = decode.oneOf([
  decode.value("Headline"),
  decode.value("Gold"),
  decode.value("Silver"),
  decode.value("Bronze")
]);

export type Sponsor = {
  // important to keep this at the top level so type refinement works
  contentType: "sponsor",
  id: string,
  locale: string,
  revision: number,
  fields: {
    sponsorName: string,
    sponsorLogo: Reference,
    sponsorUrl: string,
    sponsorLevel: SponsorLevel
  }
};

const decodeSponsor = (locale: string): Decoder<Sponsor> =>
  decode.shape({
    contentType: decode.at(
      ["sys", "contentType", "sys", "id"],
      decode.value("sponsor")
    ),
    id: decode.at(["sys", "id"], decode.string),
    locale: decode.succeed(locale),
    revision: decode.at(["sys", "revision"], decode.number),
    fields: decode.field(
      "fields",
      decode.shape({
        sponsorName: decode.at(["sponsorName", locale], decode.string),
        sponsorLogo: decode.at(["sponsorLogo", locale], referenceDecoder),
        sponsorUrl: decode.at(["sponsorUrl", locale], decode.string),
        sponsorLevel: decode.at(["sponsorLevel", locale], sponsorLevelDecoder)
      })
    )
  });

export default decodeSponsor;
