// @flow
export default {
  tabEvents: "Events",
  filterByInterest: "I'm interested in...",
  filters: "Filters",
  filterPickerApply: (numberOfEvents: number) =>
    numberOfEvents === 1
      ? `Show ${numberOfEvents} event`
      : `Show ${numberOfEvents} events`,
  filterDayPickerTitle: "Select dates",
  filterTimePickerTitle: "Select time",
  eventDetailsPrice: "From: £",
  eventDetailsAccessibility: "Accessibility",
  eventDetailsAccessibilityDetails: "Accessibility Details",
  eventDetailsContact: "Contact",
  eventDetailsBuyButton: "Buy Tickets",
  eventDetailsGenderNeutralToilets: "Gender neutral toilets",
  anyDay: "Any day",
  anyTime: "Any time",
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
    venueDetails: "Venue options"
  }
};
