// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import { gen, sampleOne as sample } from "@rgbboy/testcheck";
import type { ValueGenerator } from "@rgbboy/testcheck";
import { DateTime } from "luxon";
import { FORMAT_CONTENTFUL_ISO, FORMAT_EUROPEAN_DATE } from "../lib/date";
import type { Event as EventDeprecated } from "./event-deprecated";
import type { Event, EventCategoryName } from "./event";
import type { FieldRef } from "./field-ref";
import type { HeaderBanner } from "./header-banner";
import type { ImageDetails } from "./image";
import type { Performance } from "./performance";
import type { Sponsor } from "./sponsor";
import { eventCategoryNames } from "./event";

type Options = {
  seed?: number
};

const defaultOptions: Options = {
  seed: 1
};

export const sampleOne = <A>(
  generator: ValueGenerator<A>,
  options: Options = defaultOptions
): A => {
  const seed = options.seed || defaultOptions.seed;
  return sample(generator, 30, seed);
};

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

export const generateDate: ValueGenerator<string> = gen.int.then(int =>
  DateTime.fromMillis(baseTime + int * int * int * fiveMinutes, {
    zone: "UTC"
  }).toFormat(FORMAT_EUROPEAN_DATE)
);

export const generateDateString: ValueGenerator<string> = gen.int.then(int =>
  DateTime.fromMillis(baseTime + int * int * int * fiveMinutes, {
    zone: "UTC"
  }).toFormat(FORMAT_CONTENTFUL_ISO)
);

export const generateImageURI: ValueGenerator<string> = gen.alphaNumString.then(
  name => `//red-badger.com/${name}.jpg`
);

// will change this when we refactor FieldRef
export const generateCMSFieldRef: ValueGenerator<mixed> = generateFieldRef;

export const generateImageDetails: ValueGenerator<ImageDetails> = gen({
  id: gen.alphaNumString,
  revision: 1,
  uri: generateImageURI.then(value => `https:${value}`),
  width: gen.intWithin(100, 1000),
  height: gen.intWithin(100, 1000)
});

export const generateCMSImage: ValueGenerator<mixed> = gen({
  sys: {
    id: gen.alphaNumString,
    type: "Asset",
    revision: 1
  },
  fields: {
    file: {
      "en-GB": {
        url: generateImageURI,
        details: {
          image: {
            height: gen.intWithin(100, 1000),
            width: gen.intWithin(100, 1000)
          }
        }
      }
    }
  }
});

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

export const generateEventCategory: ValueGenerator<
  EventCategoryName
> = gen.oneOf(eventCategoryNames);

export const generateEvent: ValueGenerator<Event> = gen({
  id: gen.alphaNumString,
  contentType: "event",
  locale: "en-GB",
  revision: 1,
  fields: gen({
    name: "name",
    eventCategories: gen.uniqueArray(generateEventCategory, {
      minSize: 1,
      maxSize: 5
    }),
    audience: gen.array(gen.alphaNumString, { minSize: 1, maxSize: 5 }),
    startTime: "2018-07-07T00:00+00:00",
    endTime: "2018-07-07T03:00+00:00",
    location: { lat: 0, lon: 10 },
    addressLine1: "addressLine1",
    addressLine2: "addressLine2",
    city: "city",
    postcode: "postcode",
    locationName: "locationName",
    eventPriceLow: 0,
    eventPriceHigh: 10,
    accessibilityOptions: gen.array(gen.alphaNumString, {
      minSize: 1,
      maxSize: 5
    }),
    eventDescription: "eventDescription",
    accessibilityDetails: "accessibilityDetails",
    email: "email",
    phone: "phone",
    ticketingUrl: "ticketingUrl",
    venueDetails: gen.array(gen.alphaNumString, { minSize: 1, maxSize: 5 }),
    individualEventPicture: generateFieldRef,
    eventsListPicture: generateFieldRef,
    performances: gen.array(generateFieldRef, { minSize: 1, maxSize: 5 }),
    recurrenceDates: gen.array(generateDate, { minSize: 1, maxSize: 5 })
  })
});

export const generateCMSEvent: ValueGenerator<EventDeprecated> = gen({
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
      "en-GB": gen.uniqueArray(generateEventCategory, {
        minSize: 1,
        maxSize: 5
      })
    },
    audience: {
      "en-GB": gen.array(gen.alphaNumString, { minSize: 1, maxSize: 5 })
    },
    startTime: { "en-GB": "2018-07-07T00:00+00:00" },
    endTime: { "en-GB": "2018-07-07T03:00+00:00" },
    location: { "en-GB": { lat: 0, lon: 10 } },
    addressLine1: { "en-GB": "addressLine1" },
    addressLine2: { "en-GB": "addressLine2" },
    city: { "en-GB": "city" },
    postcode: { "en-GB": "postcode" },
    locationName: { "en-GB": "locationName" },
    eventPriceLow: { "en-GB": 0 },
    eventPriceHigh: { "en-GB": 10 },
    accessibilityOptions: {
      "en-GB": gen.array(gen.alphaNumString, { minSize: 1, maxSize: 5 })
    },
    eventDescription: { "en-GB": "eventDescription" },
    accessibilityDetails: { "en-GB": "accessibilityDetails" },
    email: { "en-GB": "email" },
    phone: { "en-GB": "phone" },
    ticketingUrl: { "en-GB": "ticketingUrl" },
    venueDetails: {
      "en-GB": gen.array(gen.alphaNumString, { minSize: 1, maxSize: 5 })
    },
    individualEventPicture: gen({ "en-GB": generateFieldRef }),
    eventsListPicture: gen({ "en-GB": generateFieldRef }),
    performances: {
      "en-GB": gen.array(generateFieldRef, { minSize: 1, maxSize: 5 })
    },
    recurrenceDates: {
      "en-GB": gen.array(generateDate, { minSize: 1, maxSize: 5 })
    }
  })
});

export const generateEventMinimum: ValueGenerator<Event> = gen({
  id: gen.alphaNumString,
  contentType: "event",
  locale: "en-GB",
  revision: 1,
  fields: gen({
    name: "name",
    eventCategories: gen.uniqueArray(generateEventCategory, {
      minSize: 1,
      maxSize: 5
    }),
    audience: [],
    startTime: "2018-07-07T00:00+00:00",
    endTime: "2018-07-07T03:00+00:00",
    location: { lat: 0, lon: 10 },
    addressLine1: gen.null,
    addressLine2: gen.null,
    city: gen.null,
    postcode: gen.null,
    locationName: "locationName",
    eventPriceLow: 0,
    eventPriceHigh: 10,
    accessibilityOptions: [],
    eventDescription: "eventDescription",
    accessibilityDetails: gen.null,
    email: gen.null,
    phone: gen.null,
    ticketingUrl: gen.null,
    venueDetails: [],
    individualEventPicture: generateFieldRef,
    eventsListPicture: generateFieldRef,
    performances: [],
    recurrenceDates: []
  })
});

export const generateCMSEventMinimum: ValueGenerator<mixed> = gen({
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
    startTime: { "en-GB": "2018-07-07T00:00+00:00" },
    endTime: { "en-GB": "2018-07-07T03:00+00:00" },
    location: { "en-GB": { lat: 0, lon: 10 } },
    locationName: { "en-GB": "locationName" },
    eventPriceLow: { "en-GB": 0 },
    eventPriceHigh: { "en-GB": 10 },
    eventDescription: { "en-GB": "eventDescription" },
    individualEventPicture: gen({ "en-GB": generateFieldRef }),
    eventsListPicture: gen({ "en-GB": generateFieldRef })
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
