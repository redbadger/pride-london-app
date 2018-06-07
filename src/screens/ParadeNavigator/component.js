// @flow
import { createMaterialTopTabNavigator } from "react-navigation";

import { PARADE_INFORMATION, PARADE_MAP } from "../../constants/routes";
import ParadeInformationScreen from "../ParadeInformationScreen";
import ParadeMapScreen from "../ParadeMapScreen";
import TopTabBar from "../../components/TopTabBar";
import { lightTealColor, darkBlueGreyColor } from "../../constants/colors";
import text from "../../constants/text";

export const getTabTestId = (routeName: string) => {
  switch (routeName) {
    case PARADE_INFORMATION:
      return "parade-information-button";
    case PARADE_MAP:
      return "parade-map-button";
    default:
      return "";
  }
};

const ParadeTabNav = createMaterialTopTabNavigator(
  {
    [PARADE_MAP]: {
      screen: ParadeMapScreen,
      navigationOptions: {
        tabBarLabel: text.tabParadeMap
      }
    },
    [PARADE_INFORMATION]: {
      screen: ParadeInformationScreen,
      navigationOptions: {
        tabBarLabel: text.tabParadeStages
      }
    }
  },
  {
    tabBarComponent: TopTabBar,
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: PARADE_MAP,
    tabBarOptions: {
      indicatorStyle: {
        top: 0,
        backgroundColor: lightTealColor
      },
      style: {
        backgroundColor: darkBlueGreyColor
      },
      upperCaseLabel: false,
      getTabTestID: getTabTestId
    }
  }
);

export default ParadeTabNav;
