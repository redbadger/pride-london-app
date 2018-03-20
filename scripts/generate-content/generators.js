const dateFns = require("date-fns");
const loremIpsum = require("lorem-ipsum");

const festivalStartDate = "2018-06-09T09:00:00";
const festivalLengthDays = 28;
const eventHourRange = 12;

const minLatitude = 51.509179;
const maxLatitude = 51.523622;
const minLongitude = -0.149135;
const maxLongitude = -0.108933;

const getRandomIntInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomFloat = (min, max, decimals) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const generateEvent = (categories, assets) => {
  const randomAsset =
    assets.items[Math.floor(Math.random() * assets.items.length)];
  const filteredCategories = categories.filter(() => Math.random() >= 0.8);
  const selectedCategories =
    filteredCategories.length === 0
      ? filteredCategories[Math.floor(Math.random() * assets.items.length)]
      : filteredCategories;

  const eventStartDate = `${dateFns
    .addHours(
      dateFns.addDays(
        festivalStartDate,
        getRandomIntInclusive(0, festivalLengthDays)
      ),
      getRandomIntInclusive(0, eventHourRange)
    )
    .toISOString()
    .slice(0, -8)}+00:00`;
  const eventEndDate = `${dateFns
    .addHours(
      dateFns.addDays(eventStartDate, getRandomIntInclusive(0, 4)),
      getRandomIntInclusive(0, 2)
    )
    .toISOString()
    .slice(0, -8)}+00:00`;

  const latitude = generateRandomFloat(minLatitude, maxLatitude, 6);
  const longitude = generateRandomFloat(minLongitude, maxLongitude, 6);

  const isFree = Math.random() >= 0.5;
  const eventPriceLow = isFree ? 0 : 5;
  const eventPriceHigh = isFree ? 0 : 20;
  const ticketingUrl =
    Math.random() >= 0.5 ? "https://prideinlondon.org/" : undefined;

  return {
    fields: {
      name: {
        "en-GB": `Generated: ${loremIpsum({ count: 4, units: "words" })}`
      },
      location: {
        "en-GB": {
          lat: latitude,
          lon: longitude
        }
      },
      locationName: {
        "en-GB": loremIpsum({ count: 4, units: "words" })
      },
      startTime: { "en-GB": eventStartDate },
      endTime: { "en-GB": eventEndDate },
      isFree: { "en-GB": isFree },
      eventPriceLow: { "en-GB": eventPriceLow },
      eventPriceHigh: { "en-GB": eventPriceHigh },
      eventDescription: {
        "en-GB": loremIpsum({ count: 2, units: "paragraphs" })
      },
      ticketingUrl: { "en-GB": ticketingUrl },
      eventCategories: { "en-GB": selectedCategories },
      individualEventPicture: {
        "en-GB": {
          sys: {
            id: randomAsset.sys.id,
            linkType: "Asset",
            type: "Link"
          }
        }
      },
      eventsListPicture: {
        "en-GB": {
          sys: {
            id: randomAsset.sys.id,
            linkType: "Asset",
            type: "Link"
          }
        }
      }
    }
  };
};

module.exports = {
  generateEvent
};
