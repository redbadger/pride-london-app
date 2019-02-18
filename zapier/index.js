const boolean = value => value === "true";

const parseMultiple = value => (value === "" ? [] : value.split(", \n"));

const parse = input => {
  const hasTickets = boolean(input.hasTickets);
  const isEventPriceFree = boolean(input.isEventPriceFree);
  const eventPrice = Number(input.eventPrice);
  const eventPriceLow = Number(input.eventPriceLow);
  const eventPriceHigh = Number(input.eventPriceHigh);

  return {
    fields: {
      name: {
        "en-GB": input.name
      },
      addressLine1: {
        "en-GB": ""
      },
      addressLine2: {
        "en-GB": ""
      },
      city: {
        "en-GB": ""
      },
      postcode: {
        "en-GB": ""
      },
      locationName: {
        "en-GB": input.locationName
      },
      startTime: {
        "en-GB": "2018-01-01T00:00+00:00"
      },
      endTime: {
        "en-GB": "2018-01-01T00:00+00:00"
      },
      eventPriceLow: {
        "en-GB":
          (hasTickets || 0) &&
          (!isEventPriceFree || 0) &&
          (eventPrice || eventPriceLow)
      },
      eventPriceHigh: {
        "en-GB":
          (hasTickets || 0) &&
          (!isEventPriceFree || 0) &&
          (eventPrice || eventPriceHigh)
      },
      eventDescription: {
        "en-GB": input.eventDescription
      },
      ticketingUrl: {
        "en-GB": input.ticketingUrl
      },
      accessibilityOptions: {
        "en-GB": parseMultiple(input.accessibilityOptions)
      },
      eventCategories: {
        "en-GB": parseMultiple(input.eventCategories)
      },
      audience: {
        "en-GB": parseMultiple(input.audience)
      },
      accessibilityDetails: {
        "en-GB": input.accessibilityDetails
      },
      email: {
        "en-GB": input.email
      },
      phone: {
        "en-GB": input.phone
      },
      venueDetails: {
        "en-GB": []
      }
    }
  };
};

/* eslint-disable */
if (exports) {
  var exports = (module.exports = parse);
} else {
  output = {
    data: JSON.stringify(parse(inputData))
  };
}
/* eslint-enable */
