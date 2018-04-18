// @flow
const showEvents = (numberOfEvents: number) => {
  if (numberOfEvents <= 0) {
    return "No events";
  }

  if (numberOfEvents === 1) {
    return "Show 1 event";
  }

  return `Show ${numberOfEvents} events`;
};

export default {
  tabHome: "Home",
  tabEvents: "Events",
  tabParade: "Parade",
  tabSaved: "Saved",
  tabSupportUs: "Support us",
  filterByInterest: "All events",
  addFilters: "Add filters",
  filterPickerApply: showEvents,
  filterDayPickerTitle: "Select dates",
  filterTimePickerTitle: "Select time",
  filterTitle: "Show me",
  eventDetailsPrice: "From: £",
  isFreePrice: "Free",
  eventFromPrice: "From",
  eventDetailsAccessibility: "Accessibility",
  eventDetailsAccessibilityDetails: "Accessibility Details",
  eventDetailsContact: "Contact",
  eventDetailsBuyButton: "Buy Tickets",
  eventDetailsGenderNeutralToilets: "Gender neutral toilets",
  selectDates: "Select dates",
  time: {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening"
  },
  tags: {
    audience: "Age group",
    price: "Price",
    free: "Show only free events",
    timeOfDay: "Time of day",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    venueDetails: "Venue options",
    accessibilityOptions: "Accessibility",
    "Gender neutral toilets": "Gender-neutral toilets",
    Indoors: "Indoor",
    Outdoors: "Outdoor",
    "Accessible Toilets": "Accessible toilets",
    "Wheelchair accessibile": "Wheelchair access",
    area: "Area of London"
  },
  cancel: "Cancel",
  zeroSelected: "0 selected",
  showEvents,
  clearAll: "Clear all",
  filterEvents: "Filter Events"
};
