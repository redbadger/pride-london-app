// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import { gen, sampleOne as sample } from "@rgbboy/testcheck";
import type { ValueGenerator } from "@rgbboy/testcheck";
import { DateTime } from "luxon";
import { FORMAT_CONTENTFUL_ISO } from "../lib/date";
import type { Event } from "./event-deprecated";
import type { FieldRef } from "./field-ref";
import type { HeaderBanner } from "./header-banner";
import type { Performance } from "./performance";
import type { Sponsor } from "./sponsor";

export const sampleOne = <A>(generator: ValueGenerator<A>): A =>
  sample(generator, 30, 1);

export const sampleArrayOf = <A>(
  generator: ValueGenerator<A>
): (number => Array<A>) => (size: number) =>
  sample(gen.array(generator, { size }), 30, 1);

export const generateFieldRef: ValueGenerator<FieldRef> = gen({
  sys: gen({
    id: gen.alphaNumString
  })
});

const baseTime = 1530964800000; // July 7, 2018 12:00:00 PM GMT+00:00
const fiveMinutes = 300000;

export const generateDateString: ValueGenerator<string> = gen.int.then(int =>
  DateTime.fromMillis(baseTime + int * int * int * fiveMinutes, {
    zone: "UTC"
  }).toFormat(FORMAT_CONTENTFUL_ISO)
);

// will change this when we refactor FieldRef
export const generateCMSFieldRef: ValueGenerator<mixed> = generateFieldRef;

export const generateHeaderBanner: ValueGenerator<HeaderBanner> = gen({
  contentType: "headerBanner",
  id: gen.alphaNumString,
  locale: "en-GB",
  revision: 1,
  fields: gen({
    heading: "heading",
    headingLine2: "headingLine2",
    subHeading: "subHeading",
    heroImage: generateFieldRef,
    backgroundColour: "#ff0000"
  })
});

export const generateCMSHeaderBanner: ValueGenerator<mixed> = gen({
  sys: {
    id: gen.alphaNumString,
    contentType: {
      sys: {
        id: "headerBanner"
      }
    },
    revision: 1
  },
  fields: {
    heading: {
      "en-GB": "heading"
    },
    headingLine2: {
      "en-GB": "headingLine2"
    },
    subHeading: {
      "en-GB": "subHeading"
    },
    heroImage: {
      "en-GB": generateFieldRef
    },
    backgroundColour: {
      "en-GB": "#ff0000"
    }
  }
});

export const generateEvent: ValueGenerator<Event> = gen({
  sys: gen({
    id: gen.alphaNumString,
    contentType: {
      sys: {
        id: "event"
      }
    },
    revision: 1
  }),
  fields: gen({
    name: { "en-GB": "name" },
    eventCategories: {
      "en-GB": ["Cabaret and Variety", "Music"]
    },
    audience: { "en-GB": ["???"] },
    startTime: { "en-GB": "2018-07-07T00:00+00:00" },
    endTime: { "en-GB": "2018-07-07T03:00+00:00" },
    location: { "en-GB": { lat: 0, lon: 0 } },
    addressLine1: { "en-GB": "addressLine1" },
    addressLine2: { "en-GB": "addressLine2" },
    city: { "en-GB": "city" },
    postcode: { "en-GB": "postcode" },
    locationName: { "en-GB": "locationName" },
    eventPriceLow: { "en-GB": 0 },
    eventPriceHigh: { "en-GB": 10 },
    accessibilityOptions: {
      "en-GB": ["accessibilityOptionsA", "accessibilityOptionsB"]
    },
    eventDescription: { "en-GB": "eventDescription" },
    accessibilityDetails: { "en-GB": "accessibilityDetails" },
    email: { "en-GB": "email" },
    phone: { "en-GB": "phone" },
    ticketingUrl: { "en-GB": "ticketingUrl" },
    venueDetails: {
      "en-GB": ["venueDetailsA", "venueDetailsB"]
    },
    individualEventPicture: gen({ "en-GB": generateFieldRef }),
    eventsListPicture: gen({ "en-GB": generateFieldRef }),
    performances: { "en-GB": [] },
    recurrenceDates: { "en-GB": [] }
  })
});

export const generatePerformance: ValueGenerator<Performance> = gen({
  contentType: "performance",
  id: gen.alphaNumString,
  locale: "en-GB",
  revision: 1,
  fields: gen({
    title: "title",
    startTime: generateDateString
  })
});

export const generateCMSPerformance: ValueGenerator<mixed> = gen({
  sys: {
    id: gen.alphaNumString,
    contentType: {
      sys: {
        id: "performance"
      }
    },
    revision: 1
  },
  fields: gen({
    title: {
      "en-GB": "title"
    },
    startTime: gen({
      "en-GB": generateDateString
    })
  })
});

export const generateSponsor: ValueGenerator<Sponsor> = gen({
  contentType: "sponsor",
  id: gen.alphaNumString,
  locale: "en-GB",
  revision: 1,
  fields: gen({
    sponsorName: "sponsorName",
    sponsorLogo: generateFieldRef,
    sponsorUrl: "sponsorUrl",
    sponsorLevel: "Headline"
  })
});

export const generateCMSSponsor: ValueGenerator<mixed> = gen({
  sys: {
    id: gen.alphaNumString,
    contentType: {
      sys: {
        id: "sponsor"
      }
    },
    revision: 1
  },
  fields: {
    sponsorName: { "en-GB": "sponsorName" },
    sponsorLogo: { "en-GB": generateFieldRef },
    sponsorUrl: { "en-GB": "sponsorUrl" },
    sponsorLevel: { "en-GB": "Headline" }
  }
});
