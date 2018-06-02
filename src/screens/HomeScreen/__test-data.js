// @flow
import type { Event } from "../../data/event";
import type { HeaderBanner } from "../../data/header-banner";

export const generateHeaderBanners = (count: number): HeaderBanner[] =>
  Array.from(Array(count)).map(
    (_, i) =>
      ({
        contentType: "headerBanner",
        id: String(i + 1),
        locale: "en-GB",
        revision: 1,
        fields: {
          heading: "Pride",
          headingLine2: "Festival",
          subHeading: "from - to",
          heroImage: {
            sys: {
              id: `asset${i + 1}`
            }
          },
          backgroundColour: "#ff0000"
        }
      }: HeaderBanner)
  );

export const generateEvents = (count: number): Event[] =>
  Array.from(Array(count)).map(
    (_, i) =>
      ({
        sys: {
          id: String(i + 1)
        },
        fields: {
          name: {
            "en-GB": "some other"
          },
          eventsListPicture: {
            "en-GB": {
              sys: {
                id: `asset${i + 1}`
              }
            }
          },
          startTime: {
            "en-GB": "2018-07-10T00:00"
          },
          eventCategories: {
            "en-GB": ["Cabaret & Variety", "Music"]
          }
        }
      }: any)
  );
