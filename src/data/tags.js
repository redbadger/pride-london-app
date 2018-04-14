// @flow
import type { Area } from "./event-filters";

type Tags = {
  area: Area[]
};

const tags: Tags = {
  area: ["Central", "East", "North", "South", "West"],
  price: ["free"],
  audience: ["Families", "Youth", "16+", "18+"],
  timeOfDay: ["morning", "afternoon", "evening"],
  venueDetails: ["Gender neutral toilets", "Outdoors", "Indoors"],
  accessibilityOptions: [
    "Step free access",
    "Wheelchair accessibile",
    "Accessible Toilets",
    "BSL Interpreter",
    "Hearing loop installed",
    "Complimentary ticket for personal assistant",
    "Service animals welcome",
    "Accessible parking spaces at venue"
  ]
};

export default tags;
