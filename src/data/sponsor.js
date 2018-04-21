// @flow
import type { LocalizedFieldRef } from "./localized-field-ref";

export type SponsorLevel = "Headline" | "Gold" | "Silver" | "Bronze";

export type Sponsor = {
  fields: {
    sponsorName: { [string]: string },
    sponsorLogo: LocalizedFieldRef,
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
