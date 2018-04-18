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
  featuredEventListTitle: "Featured events",
  filterByInterest: "All events",
  filters: "Filters",
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
  eventDetailsBuyButton: "Buy tickets",
  eventDetailsGenderNeutralToilets: "Gender neutral toilets",
  anyDay: "Any day",
  anyTime: "Any time",
  time: {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening"
  },
  cancel: "Cancel",
  zeroSelected: "0 selected",
  showEvents,
  clearAll: "Clear all"
};
