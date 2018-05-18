// @flow
import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import type { TabScene, _TabBarBottomProps } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import {
  tabBarBgColor,
  tabBarLabelColor,
  tabBarActiveLineColor,
  tabBarActiveLabelColor,
  tabBarBorderColor
} from "../constants/colors";
import Text from "./Text";
import Touchable from "./Touchable";

class NavigationTabBar extends React.PureComponent<_TabBarBottomProps> {
  constructor() {
    super();
    this.tabBarWidth = new Animated.Value(1);
    this.tabLayouts = {};
    this.activeTabX = new Animated.Value(0);
    this.activeTabWidth = new Animated.Value(0);
  }

  componentDidUpdate() {
    this.updateActiveTabLine();
  }

  tabBarLayout: any;
  tabBarWidth: Animated.Value;
  tabLayouts: { [number]: any };
  activeTabX: Animated.Value;
  activeTabWidth: Animated.Value;

  handleTabPress = (key: string) => {
    this.props.jumpTo(key);
  };

  updateActiveTabLine = () => {
    const { navigation } = this.props;
    const currentIndex = navigation.state.index;
    const layout = this.tabLayouts[currentIndex];
    if (!layout || !this.tabBarLayout) {
      return;
    }

    Animated.timing(this.tabBarWidth, {
      toValue: this.tabBarLayout.width,
      duration: 150,
      useNativeDriver: true
    }).start();
    Animated.timing(this.activeTabX, {
      toValue: layout.x,
      duration: 150,
      useNativeDriver: true
    }).start();
    Animated.timing(this.activeTabWidth, {
      toValue: layout.width,
      duration: 150,
      useNativeDriver: true
    }).start();
  };

  renderLabel = (scene: TabScene) => {
    const { focused } = scene;
    const color = focused ? tabBarActiveLabelColor : tabBarLabelColor;
    const label = this.props.getLabelText(scene);

    return (
      <Text type="tabBarItem" numberOfLines={1} style={{ color }}>
        {label}
      </Text>
    );
  };

  renderIcon = (scene: TabScene) => {
    const { route, index, focused } = scene;
    const opacity = focused ? 1 : 0;
    const opacitInv = focused ? 0 : 1;

    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them.
    return (
      <View style={styles.iconContainer}>
        <View style={[styles.icon, { opacity }]}>
          {this.props.renderIcon({
            route,
            index,
            focused: true
          })}
        </View>
        <View style={[styles.icon, { opacity: opacitInv }]}>
          {this.props.renderIcon({
            route,
            index,
            focused: false
          })}
        </View>
      </View>
    );
  };

  render() {
    const { navigation, getTabTestID } = this.props;
    const { routes } = navigation.state;

    const activeTabLineScale = Animated.divide(
      this.activeTabWidth,
      this.tabBarWidth
    );
    const activeTabLineTranslate = Animated.add(
      this.activeTabX,
      Animated.add(
        Animated.divide(this.tabBarWidth, -2),
        Animated.divide(this.activeTabWidth, 2)
      )
    );

    return (
      <SafeAreaView
        style={styles.tabBarWrapper}
        forceInset={{ bottom: "always", top: "never" }}
      >
        <View
          testID="tab-bar"
          onLayout={event => {
            this.tabBarLayout = event.nativeEvent.layout;
            this.updateActiveTabLine();
          }}
          style={styles.tabBar}
        >
          {routes.map((route, index) => {
            const focused = index === navigation.state.index;
            const scene = { route, index, focused };
            return (
              <Touchable
                key={route.key}
                testID={getTabTestID(route.routeName)}
                onLayout={event => {
                  this.tabLayouts[index] = event.nativeEvent.layout;
                  this.updateActiveTabLine();
                }}
                onPress={() => this.handleTabPress(route.key)}
                style={styles.tab}
              >
                {this.renderIcon(scene)}
                {this.renderLabel(scene)}
              </Touchable>
            );
          })}
          <Animated.View
            style={[
              styles.activeTabLine,
              {
                transform: [
                  { translateX: activeTabLineTranslate },
                  { scaleX: activeTabLineScale }
                ]
              }
            ]}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    backgroundColor: tabBarBgColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: tabBarBorderColor,
    paddingHorizontal: 8
  },
  activeTabLine: {
    backgroundColor: tabBarActiveLineColor,
    height: 3,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%"
  },
  tabBar: {
    flexDirection: "row",
    height: 52,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center"
  },
  tab: {
    alignItems: "center",
    flexDirection: "column",
    minWidth: 48,
    flexGrow: 1,
    marginHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 2
  },
  iconContainer: {
    flex: 1,
    width: "100%"
  },
  icon: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    top: 0
  }
});

export default NavigationTabBar;
