// @flow
export type LocalizedFieldRef = { [string]: { sys: { id: string } } };

export type Event = {
  fields: {
    name: { [string]: string },
    eventCategories: { [string]: string[] },
    startTime: { [string]: string },
    endTime: { [string]: string },
    location: { [string]: { lat: number, lon: number } },
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

export type Asset = {
  fields: {
    title: { [string]: string },
    file: {
      [string]: {
        contentType: string,
        fileName: string,
        url: string,
        details: {
          size: number,
          image: {
            height: number,
            width: number
          }
        }
      }
    }
  },
  sys: {
    id: string,
    type: "Asset",
    revision: number
  }
};

export type EventDays = Event[][];
