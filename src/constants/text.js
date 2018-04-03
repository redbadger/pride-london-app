// @flow
import { StyleSheet } from "react-native";
import * as colors from "./colors";

const showEvents = (numberOfEvents: number) => `Show ${numberOfEvents} events`;

export default {
  tabEvents: "Events",
  filterByInterest: "All events",
  filters: "Filters",
  filterPickerApply: showEvents,
  filterDayPickerTitle: "Select dates",
  filterTimePickerTitle: "Select time",
  filterTitle: "Show me",
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
  cancel: "Cancel",
  zeroSelected: "0 selected",
  showEvents,
  clearAll: "Clear all"
};

export const textStyles = StyleSheet.create({
  uberPoppinsLeftdarkPurple: {
    fontFamily: "Poppins",
    fontSize: 32,
    fontWeight: "800",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  uberPoppinsLeftWhite: {
    fontFamily: "Poppins",
    fontSize: 32,
    fontWeight: "800",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  uberPoppinsLeftcobaltBlue: {
    fontFamily: "Poppins",
    fontSize: 32,
    fontWeight: "800",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  uberPoppinsLeftBlack: {
    fontFamily: "Poppins",
    fontSize: 32,
    fontWeight: "800",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  uberPoppinsLefteucalyptusGreen: {
    fontFamily: "Poppins",
    fontSize: 32,
    fontWeight: "800",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  homeBundleHeaderBlack: {
    fontFamily: "Poppins",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  homeBundleHeaderWhite: {
    fontFamily: "Poppins",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h1PoppinsLeftWhite: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h1PoppinsLeftBlack: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h1PoppinsCenterBlack: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h1PoppinsLefteucalyptusGreen: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h1PoppinsLeftdarkPurple: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  h1PoppinsCentercobaltBlue: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  h1PoppinsLeftcobaltBlue: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  h1PoppinsCentereucalyptusGreen: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h1PoppinsCenterdarkPurple: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  h1PoppinsCenterWhite: {
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h2PoppinsLefteucalyptusGreen: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h2PoppinsCentereucalyptusGreen: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h2PoppinsCenterdarkPurple: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  h2PoppinsCentercobaltBlue: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  h2PoppinsCenterBlack: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h2PoppinsCenterWhite: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h2PoppinsLeftBlack: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h2PoppinsLeftWhite: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h2PoppinsLeftcobaltBlue: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  h2PoppinsLeftdarkPurple: {
    fontFamily: "Poppins",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  h3PoppinsRighteucalyptusGreen: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h3PoppinsRightWhite: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h3PoppinsLeftWhite: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h3PoppinsMiddleAlignBlack: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h3PoppinsCenterdarkPurple: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  h3PoppinsRightBlack: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h3PoppinsCenterBlack: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h3PoppinsLefteucalyptusGreen: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h3PoppinsCentereucalyptusGreen: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h3PoppinsRightdarkPurple: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  h3PoppinsLeftcobaltBlue: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  h3PoppinsRightcobaltBlue: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  h3PoppinsLeftdarkPurple: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  h3PoppinsCentercobaltBlue: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  h3PoppinsCenterWhite: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h3PoppinsLeftBlack: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h4RobotoCenterdarkPurple: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  h4RobotoRighteucalyptusGreen: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h4RobotoCenterBlack: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h4RobotoCentercobaltBlue: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  h4RobotoCentereucalyptusGreen: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h4RobotoLefteucalyptusGreen: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  h4RobotoLeftBlack: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  h4RobotoLeftWhite: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h4RobotoLeftcobaltBlue: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  h4RobotoCenterWhite: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  h4RobotoLeftdarkPurple: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  paraRobotoLeftBlack: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  paraRobotoLeftWhite: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  paraRobotoCenterdarkPurple: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  paraRobotoLeftcobaltBlue: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  paraRobotoLefteucalyptusGreen: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  paraRobotoLeftdarkPurple: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  paraRobotoCentercobaltBlue: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  paraRobotoCenterWhite: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  paraRobotoCentereucalyptusGreen: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  priceRobotoLeftWhite: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  priceRobotoCenterWhite: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  smallRobotoLeftdarkPurple: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  smallRobotoLeftBlack: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  smallRobotoLeftWhite: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  smallRobotoMiddleAlignBlack: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  smallRobotoCentercobaltBlue: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  smallRobotoLeftcobaltBlue: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  smallRobotoCenterBlack: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.blackColor
  },
  smallRobotoLefteucalyptusGreen: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  smallRobotoCenterdarkPurple: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.velvetColor
  },
  smallRobotoCentereucalyptusGreen: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.eucalyptusGreenColor
  },
  smallRobotoCenterWhite: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.whiteColor
  },
  tabPoppinsCentercobaltBlue: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.lightNavyBlueColor
  },
  tabPoppinsCentergraniteGrey: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.greyishBrownColor
  }
});
