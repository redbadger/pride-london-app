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

const showEventsLabel = (numberOfEvents: number) => {
  if (numberOfEvents <= 0) {
    return "Show events (none selected)";
  }

  if (numberOfEvents === 1) {
    return "Show 1 selected event";
  }

  return `Show ${numberOfEvents} selected events`;
};

export default {
  tabHome: "Home",
  tabEvents: "Events",
  tabParade: "Parade",
  tabSaved: "Saved",
  tabSupportUs: "Support us",
  featuredEventListTitle: "Featured events",
  filterByInterest: "All event types",
  addFilters: "Add filters",
  filters: "Filters",
  filterPickerApply: showEvents,
  filterPickerApplyLabel: showEventsLabel,
  filterDayPickerTitle: "Select dates",
  filterTimePickerTitle: "Select time",
  filterTitle: "Showing",
  eventDetailsPrice: "From: £",
  isFreePrice: "Free",
  eventFromPrice: "From",
  eventDetailsAccessibility: "Accessibility",
  eventDetailsAccessibilityDetails: "Accessibility Details",
  eventDetailsContact: "Contact",
  eventDetailsBuyButton: "Get tickets",
  eventDetailsGenderNeutralToilets: "Gender neutral toilets",
  selectDates: "Select dates",
  eventDetailsAbout: "About",
  eventDetailsReadMore: "Read more",
  eventDetailsReadLess: "Read less",
  eventDetailsContactEmailSubject: "Pride In London event enquiry",
  eventDetailsContactEmailBody: "Dear event organiser,",
  supportUsTitle: "Support us",
  supportUsAsIndividual: "As an individual",
  supportUsAsBusiness: "As a business",
  supportUsDonate: "Donate",
  supportUsDonateDescription: "Every donation keeps us marching",
  supportUsShop: "Buy merchandise",
  supportUsShopDescription: "Visit our online shop on The Gay UK",
  supportUsSponsor: "Partner with us",
  supportUsSponsorDescription: "Support the community",
  supportUsVolunteer: "Volunteer",
  supportUsVolunteerDescription: "Passionate about equality? Join us.",
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
