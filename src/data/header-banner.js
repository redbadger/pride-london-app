// @flow
import type { FieldRef } from "./field-ref";

export type HeaderBanner = {
  fields: {
    heading: { [string]: string },
    headingLine2: { [string]: string },
    subHeading: { [string]: string },
    heroImage: { [string]: FieldRef },
    backgroundColour: { [string]: string }
  },
  sys: {
    id: string,
    type: string,
    contentType: {
      sys: {
        id: "headerBanner"
      }
    },
    revision: number
  }
};
