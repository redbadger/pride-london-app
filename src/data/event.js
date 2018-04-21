// @flow
import type { LocalizedFieldRef } from "./localized-field-ref";

export type Event = {
  fields: {
    name: { [string]: string },
    eventCategories: { [string]: string[] },
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
    email: { [string]: string },
    phone: { [string]: string },
    ticketingUrl: { [string]: string },
    venueDetails: { [string]: string[] },
    individualEventPicture: LocalizedFieldRef,
    eventsListPicture: LocalizedFieldRef
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
  label: string,
  color: string,
  contrast: boolean
};

export type EventCategoryMap = { [string]: { [string]: EventCategory } };
