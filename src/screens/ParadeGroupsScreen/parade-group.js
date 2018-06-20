// @flow
import type { Maybe } from "../../lib/maybe";

export type ParadeGroup = {
  // important to keep this at the top level so type refinement works
  contentType: "paradeGroup",
  id: string,
  locale: string,
  revision: number,
  fields: {
    name: string,
    section: string,
    facebookUrl: Maybe<string>,
    twitterUrl: Maybe<string>,
    websiteUrl: Maybe<string>
  }
};
