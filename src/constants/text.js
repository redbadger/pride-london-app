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

export const calendarTitleLabel = (dateRange: string, incomplete: boolean) =>
  `Selected: ${dateRange}${
    incomplete ? ", pick another day to select range" : ""
  }`;

export default {
  backButtonAccessibilityLabel: "Back",
  tabHome: "Home",
  tabEvents: "Events",
  tabParade: "Parade",
  tabSaved: "Saved",
  tabSupportUs: "Support us",
  tabParadeMap: "Map",
  tabParadeGroups: "Parade groups",
  featuredEventListTitle: "Featured events",
  filterByInterest: "All event types",
  categoryFilterButton: "Filter by event type",
  categoryFilterContents: "Filtering event type by",
  categoryFilterEmpty: "0 event types selected",
  addFilters: "Filter by area, price...",
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
  eventDetailsSchedule: "Schedule",
  eventDetailsReadMore: "Read more",
  eventDetailsReadLess: "Read less",
  eventDetailsContactEmailSubject: "Pride In London event enquiry",
  eventDetailsContactEmailBody: "Dear event organiser,",
  collapsibleShowMore: "Show more",
  collapsibleShowLess: "Show less",
  savedEventsTitle: "Saved Events",
  supportUsTitle: "Support us",
  supportUsAsIndividual: "As an individual",
  supportUsAsBusiness: "As a business",
  supportUsDonate: "Donate",
  supportUsDonateDescription: "Every donation keeps us marching",
  supportUsShop: "Buy merchandise",
  supportUsShopDescription: "Visit our online shop on TheGayShop",
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
  donateHeader: ["\"It's the first time I feel", 'accepted in a big group."'],
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
  allEvents: "All events",
  showEvents,
  showAllEvents: "Show all events",
  clearAll: "Clear all",
  reset: "Reset",
  filterEvents: "Filter Events",
  runsFrom: "Runs from:",
  noEventsTitle: "No events to show",
  noEventsDetails:
    "Try changing your filters to be less specific or check back later.",
  noSavedEventsTitle: "Where's the love?",
  noSavedEventsPart1: "No favourites yet? Tap the",
  noSavedEventsSaveButtonAlt: "'save this event' button",
  noSavedEventsPart2: "on any event you like to save them here.",
  noSavedEventsButton: "Find Events",
  saveEventButtonUnSaveEvent: "remove event from saved list",
  saveEventButtonSaveEvent: "save this event",
  homeViewAll: "View all",
  homeSupportUs: "Support us",
  homeSupportUsDescription: "Be part of the movement",
  parade: {
    headerTitle: "Parade - 7 July from 12pm"
  },
  paradeGroups: {
    title: "London Parade",
    subTitle: "Saturday 7 July from 12pm",
    paragraph1:
      "The Pride in London Parade is a platform for every part of London’s LGBT+ community. These groups, nearly 500 in total, represent our most diverse Pride in London yet. From LGBT+ parent groups and student services to sports clubs and national charities, we are proud to give a platform to our community representatives, supporters and allies.",
    paragraph2:
      "Find out who you can expect to see on the day from the list below.",
    linkLabelFacebook: "Facebook Page",
    linkLabelTwitter: "Twitter Profile",
    linkLabelWebsite: "Website",
    expandAccessibilityLabel: "Show more",
    collapseAccessibilityLabel: "Show less"
  },
  paradeInformationScreen: {
    pageHeading: "London Parade",
    pageSubheading: "Saturday 7 July",
    pageDescription:
      "The Pride in London Parade provides a platform for every part of London’s LGBT+ community to raise awareness of LGBT+ issues and campaign for the freedoms that will allow us to live our lives on a genuinely equal footing. It gives us a chance to be visible and speak loudly to the rest of the world about what we have achieved, how far we have come and what is still needed.",
    stages: [
      {
        stageHeading: "Trafalgar Square",
        stageSubheading: "",
        stageDescription:
          "One of the most popular and iconic areas on the day and close to where the Parade finishes. As usual there will be a mixture of famous faces and community acts from across the LGBT+ spectrum sprinkled with celebrities together with the Pride's Got Talent Finalists all under the watchful eye of Nelson's Column.",
        stageImage: "trafalgar"
      },
      {
        stageHeading: "Cabaret Stage",
        stageSubheading: "Dean Street",
        stageDescription:
          "Located in the Heart of Soho - Dean Street - no one should miss the Cabaret Stage, packed with diverse, colourful and entertaining acts from the LGBT+ Cabaret Community. This stage will also showcase the Pride's Got Talent Cabaret Finalists.",
        stageImage: "cabaret"
      },
      {
        stageHeading: "Women's / Diva Stage",
        stageSubheading: "Leicester Square",
        stageDescription:
          "Nestled in the iconic Leicester Square - this collaboration with Diva brings the best acts offered by and for the women's community. Expect high energy, fabulous talent and our female led Pride's Got Talent Acts.",
        stageImage: "diva"
      },
      {
        stageHeading: "Family Stage",
        stageSubheading: "Golden Square",
        stageDescription:
          "An intimate and fun stage, the best destination for fun and family entertainment.",
        stageImage: "family"
      },
      {
        stageHeading: "Community Village",
        stageSubheading: "Soho Square",
        stageDescription:
          "Pride in London is proud to provide a platform for charity and not for profit groups in Soho Square. Pop along to find out more about some amazing charities and not for profit groups.",
        stageImage: "community"
      }
    ]
  },
  partnershipWithSally: "Made in partnership with Red Badger",
  resetAllFilters: "Reset all filters",
  badConnection: {
    title: "It's not you, it's wifi!",
    message:
      "We can't find a good connection - please try again when you connection is restored",
    button: "Try again"
  }
};
