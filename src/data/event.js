// @flow
import type { Maybe } from "../lib/maybe";
import * as maybe from "../lib/maybe";
import type { Decoder } from "../lib/decode";
import * as decode from "../lib/decode";
import type { FieldRef } from "./field-ref";
import decodeFieldRef from "./field-ref";

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

const decodeEventCategoryName = decode.oneOf([
  decode.value("Cabaret and Variety"),
  decode.value("Community"),
  decode.value("Talks and Debates"),
  decode.value("Film and Screenings"),
  decode.value("Plays and Theatre"),
  decode.value("Social and Networking"),
  decode.value("Nightlife"),
  decode.value("Exhibition and Tours"),
  decode.value("Sports and Activities"),
  decode.value("Health"),
  decode.value("Music")
]);

export type Event = {
  // important to keep this at the top level so type refinement works
  contentType: "event",
  id: string,
  locale: string,
  revision: number,
  fields: {
    name: string,
    eventCategories: Array<EventCategoryName>,
    audience: Array<string>,
    startTime: string,
    endTime: string,
    location: { lat: number, lon: number },
    addressLine1: Maybe<string>,
    addressLine2: Maybe<string>,
    city: Maybe<string>,
    postcode: Maybe<string>,
    locationName: string,
    eventPriceLow: number,
    eventPriceHigh: number,
    accessibilityOptions: Array<string>,
    eventDescription: string,
    accessibilityDetails: Maybe<string>,
    email: Maybe<string>,
    phone: Maybe<string>,
    ticketingUrl: Maybe<string>,
    venueDetails: Array<string>,
    individualEventPicture: FieldRef,
    eventsListPicture: FieldRef,
    performances: Array<FieldRef>,
    recurrenceDates: Array<string>
  }
};

const maybeField = <A>(
  locale: string,
  field: string,
  decoder: Decoder<A>
): Decoder<Maybe<A>> =>
  decode.field(field, decode.maybe(decode.field(locale, decoder)));

const maybeFieldWithDefault = <A>(
  locale: string,
  field: string,
  decoder: Decoder<A>,
  defaultValue: A
): Decoder<A> =>
  decode.map(
    maybe.withDefault(defaultValue),
    maybeField(locale, field, decoder)
  );

const decodeEvent = (locale: string): Decoder<Event> =>
  decode.shape({
    contentType: decode.at(
      ["sys", "contentType", "sys", "id"],
      decode.value("event")
    ),
    id: decode.at(["sys", "id"], decode.string),
    locale: decode.succeed(locale),
    revision: decode.at(["sys", "revision"], decode.number),
    fields: decode.field(
      "fields",
      decode.shape({
        name: decode.at(["name", locale], decode.string),
        eventCategories: decode.at(
          ["eventCategories", locale],
          decode.array(decodeEventCategoryName)
        ),
        audience: maybeFieldWithDefault(
          locale,
          "audience",
          decode.array(decode.string),
          []
        ),
        // may want to combine startTime and endTime to fix the
        // date flipping issue in the decoder
        // may also want to convert it to a DateTime
        startTime: decode.at(["startTime", locale], decode.string),
        endTime: decode.at(["endTime", locale], decode.string),
        location: decode.at(
          ["location", locale],
          decode.shape({
            lat: decode.field("lat", decode.number),
            lon: decode.field("lon", decode.number)
          })
        ),
        addressLine1: maybeField(locale, "addressLine1", decode.string),
        addressLine2: maybeField(locale, "addressLine2", decode.string),
        city: maybeField(locale, "city", decode.string),
        postcode: maybeField(locale, "postcode", decode.string),
        locationName: decode.at(["locationName", locale], decode.string),
        eventPriceLow: decode.at(["eventPriceLow", locale], decode.number),
        eventPriceHigh: decode.at(["eventPriceHigh", locale], decode.number),
        accessibilityOptions: maybeFieldWithDefault(
          locale,
          "accessibilityOptions",
          decode.array(decode.string),
          []
        ),
        eventDescription: decode.at(
          ["eventDescription", locale],
          decode.string
        ),
        accessibilityDetails: maybeField(
          locale,
          "accessibilityDetails",
          decode.string
        ),
        email: maybeField(locale, "email", decode.string),
        phone: maybeField(locale, "phone", decode.string),
        ticketingUrl: maybeField(locale, "ticketingUrl", decode.string),
        venueDetails: maybeFieldWithDefault(
          locale,
          "venueDetails",
          decode.array(decode.string),
          []
        ),
        individualEventPicture: decode.at(
          ["individualEventPicture", locale],
          decodeFieldRef
        ),
        eventsListPicture: decode.at(
          ["eventsListPicture", locale],
          decodeFieldRef
        ),
        performances: maybeFieldWithDefault(
          locale,
          "performances",
          decode.array(decodeFieldRef),
          []
        ),
        recurrenceDates: maybeFieldWithDefault(
          locale,
          "recurrenceDates",
          decode.array(decode.string),
          []
        )
      })
    )
  });

export default decodeEvent;
