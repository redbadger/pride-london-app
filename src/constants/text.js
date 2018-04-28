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
  filterByInterest: "All events",
  addFilters: "Add filters",
  filters: "Filters",
  filterPickerApply: showEvents,
  filterPickerApplyLabel: showEventsLabel,
  filterDayPickerTitle: "Select dates",
  filterTimePickerTitle: "Select time",
  filterTitle: "Show me",
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
  eventDetailsSchedule: "Schedule",
  eventDetailsReadMore: "Read more",
  eventDetailsReadLess: "Read less",
  eventDetailsContactEmailSubject: "Pride In London event enquiry",
  eventDetailsContactEmailBody: "Dear event organiser,",
  collapsibleShowMore: "Show more",
  collapsibleShowLess: "Show less",
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
  sponsorTitle: "Partner with us",
  sponsorLevelHeading: "partners",
  sponsorHeadingOurPartners: "Our main 2018 partners",
  sponsorTextOurPartners:
    "A huge thank you to our main partners for their continued support.",
  sponsorHeadingPartnerWithUs: "Partner with us",
  sponsorTextPartnerWithUs:
    "Build your brand, engage your internal network and be part of a global movement to support diversity. To find out more, please contact sponsor@prideinlondon.org.",
  sponsorTextPartnerWithUsList:
    "* Pride in London is one of the top three biggest events in London, attracting an estimated one million visitors across the footprint. \n* Be part of our award winning marketing and advertising campaign. \n* 80% of those surveyed in our 2016 research agreed that they are more likely to think better of a brand if it is supportive of LGBT+ issues.",
  sponsorContactEmailSubject: "Sponsorship enquiry",
  sponsorContactButtonText: "Email to partner with us",
  donateTitle: "Donate",
  donateHeaderText: '"It\'s the first time I feel accepted in a big group."',
  donateIntroductionHeading: "Be part of the movement that drives diversity",
  donateIntroduction:
    "The need for Pride is as strong as ever. A huge amount of progress has been made for LGBT+ people but challenges and stigma are still rife. Whether you take part to celebrate, party or protest. Pride in London is your platform to make change. Your donations keep us marching.",
  donateAmountSelectionLabel: "Make a single donation",
  donateOtherAmountLabel: "Other amount (£)",
  donateMinimumAmount: "The minimum donation amount is £2.",
  donateButtonText: "Donate",
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
