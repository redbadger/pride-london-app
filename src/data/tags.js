// @flow
import type {
  Area,
  Price,
  Audience,
  VenueDetail,
  AccessibilityOption
} from "./event-filters";

type Tags = {
  area: Area[],
  price: Price[],
  audience: Audience[],
  venueDetails: VenueDetail[],
  accessibilityOptions: AccessibilityOption[]
};

const tags: Tags = {
  area: ["Central", "East", "North", "South", "West"],
  price: ["free"],
  audience: ["Families", "Youth", "16+", "18+"],
  timeOfDay: ["morning", "afternoon", "evening"],
  venueDetails: ["Gender neutral toilets", "Indoors", "Outdoors"],
  accessibilityOptions: [
    "Accessible parking spaces at venue",
    "Accessible Toilets",
    "BSL Interpreter",
    "Complimentary ticket for personal assistant",
    "Hearing loop installed",
    "Service animals welcome",
    "Step free access",
    "Wheelchair accessibile"
  ]
};

export default tags;
