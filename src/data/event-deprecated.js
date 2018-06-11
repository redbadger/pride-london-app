// @flow
import type { EventCategoryName } from "./event";
import type { FieldRef } from "./field-ref";

export type Event = {
  fields: {
    name: { [string]: string },
    eventCategories: { [string]: EventCategoryName[] },
    audience?: { [string]: string[] },
    startTime: { [string]: string },
    endTime: { [string]: string },
    location: { [string]: { lat: number, lon: number } },
    addressLine1?: { [string]: string },
    addressLine2?: { [string]: string },
    city?: { [string]: string },
    postcode?: { [string]: string },
    locationName: { [string]: string },
    eventPriceLow: { [string]: number },
    eventPriceHigh: { [string]: number },
    accessibilityOptions?: { [string]: string[] },
    eventDescription: { [string]: string },
    accessibilityDetails?: { [string]: string },
    email?: { [string]: string },
    phone?: { [string]: string },
    ticketingUrl?: { [string]: string },
    venueDetails?: { [string]: string[] },
    individualEventPicture: { [string]: FieldRef },
    eventsListPicture: { [string]: FieldRef },
    performances?: { [string]: Performance[] },
    recurrenceDates?: { [string]: string[] }
  },
  sys: {
    id: string,
    contentType: {
      sys: {
        id: "event"
      }
    },
    revision: number
  }
};

export type Performance = {
  fields: {
    title: { [string]: string },
    startTime: { [string]: string }
  },
  sys: {
    id: string,
    contentType: {
      sys: {
        id: "performance"
      }
    },
    revision: number
  }
};

export type Reference = {
  sys: {
    id: string
  }
};

export type FeaturedEvents = {
  fields: {
    title: { [string]: string },
    events: { [string]: Reference[] }
  },
  sys: {
    id: string,
    contentType: {
      sys: {
        id: "featuredEvents"
      }
    },
    revision: number
  }
};

export type EventDays = Event[][];

export type PerformancePeriods = Performance[][];

export type SavedEvents = Set<string>;
