// @flow
import type { FieldRef } from "./field-ref";

export type SponsorLevel = "Headline" | "Gold" | "Silver" | "Bronze";

export type Sponsor = {
  fields: {
    sponsorName: { [string]: string },
    sponsorLogo: { [string]: FieldRef },
    sponsorUrl: { [string]: string },
    sponsorLevel: { [string]: SponsorLevel }
  },
  sys: {
    id: string,
    type: string,
    contentType: {
      sys: {
        id: "sponsor"
      }
    },
    revision: number
  }
};
