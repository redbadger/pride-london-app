// @flow
import type { LocalizedFieldRef } from "./localized-field-ref";

export type Event = {
  fields: {
    name: { [string]: string },
    eventCategories: { [string]: string[] },
    audience: { [string]: string[] },
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
    isFree: { [string]: boolean },
    accessibilityOptions: { [string]: string[] },
    eventDescription: { [string]: string },
    accessibilityDetails: { [string]: string },
    email?: { [string]: string },
    phone?: { [string]: string },
    ticketingUrl: { [string]: string },
    venueDetails: { [string]: string[] },
    individualEventPicture: LocalizedFieldRef,
    eventsListPicture: LocalizedFieldRef,
    performances: { [string]: Performance[] }
  },
  sys: {
    id: string,
    type: string,
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
    type: string,
    contentType: {
      sys: {
        id: "performance"
      }
    },
    revision: number
  }
};

export type FeaturedEvents = {
  fields: {
    title: { [string]: string },
    events: { [string]: Event[] }
  },
  sys: {
    id: string,
    type: string,
    contentType: {
      sys: {
        id: "featuredEvents"
      }
    },
    revision: number
  }
};

export type EventDays = Event[][];

export type EventCategory = {
  label: EventCategoryName,
  color: string,
  contrast: boolean
};

export type EventCategoryName =
  | "Cabaret and Variety"
  | "Community"
  | "Talks and Debates"
  | "Film and Screenings"
  | "Plays and Theatre"
  | "Social and Networking"
  | "Nightlife"
  | "Exhibition and Tours"
  | "Sports and Activities"
  | "Health"
  | "Music";

export type EventCategoryMap = {
  [string]: { [EventCategoryName]: EventCategory }
};

export type PerformancePeriods = Performance[][];

export type SavedEvents = Set<string>;
