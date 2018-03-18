// @flow
export type Event = {
  sys: {
    id: string,
    type: string,
    contentType: {
      sys: {
        id: "event"
      }
    },
    revision: number
  },
  fields: {
    name: { [string]: string },
    eventCategories: { [string]: string[] },
    startTime: { [string]: string },
    endTime: { [string]: string },
    location: { [string]: { lat: number, lon: number } },
    locationName: { [string]: string },
    eventPriceLow: { [string]: number },
    eventPriceHigh: { [string]: number },
    accessibilityOptions: { [string]: string[] },
    eventDescription: { [string]: string },
    accessibilityDetails: { [string]: string },
    email: { [string]: string },
    phone: { [string]: string },
    ticketingUrl: { [string]: string },
    venueDetails: { [string]: string[] },
    individualEventPicture: { [string]: { sys: { id: string } } }
  }
};

export type EventDays = Event[][];
