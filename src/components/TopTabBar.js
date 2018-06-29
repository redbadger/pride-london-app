// @flow
import React, { PureComponent } from "react";
import { Animated, StyleSheet, View } from "react-native";
import type { TabScene, _TabBarBottomProps } from "react-navigation";
import Text from "./Text";
import Touchable from "./Touchable";
import {
  filterButtonTextColor,
  filterButtonsBgColor,
  whiteColor,
  topTabBarDividerColor
} from "../constants/colors";

class TopTabBar extends PureComponent<_TabBarBottomProps> {
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

  handleTabPress = (key: string) => {
    this.props.jumpTo(key);
  };

  tabBarLayout: any;
  tabBarWidth: Animated.Value;
  tabLayouts: { [number]: any };
  activeTabX: Animated.Value;
  activeTabWidth: Animated.Value;

  // TODO function duplicated in NavigationTabBar
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
    const color = focused ? filterButtonTextColor : whiteColor;
    const label = this.props.getLabelText(scene);

    return (
      <Text
        numberOfLines={1}
        style={[{ color }, styles.buttonText]}
        type="small"
      >
        {label}
      </Text>
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
      <View
        onLayout={event => {
          this.tabBarLayout = event.nativeEvent.layout;
          this.updateActiveTabLine();
        }}
        style={styles.tabBar}
        testID="top-tab-bar"
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
              style={[index !== 0 && styles.dividerLine, styles.tab]}
            >
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
    );
  }
}

const styles = StyleSheet.create({
  activeTabLine: {
    backgroundColor: filterButtonTextColor,
    height: 3,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%"
  },
  tabBar: {
    flexDirection: "row",
    height: 48,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    backgroundColor: filterButtonsBgColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: filterButtonsBgColor,
    alignItems: "center"
  },
  tab: {
    alignItems: "center",
    flexDirection: "row",
    minWidth: 48,
    flexGrow: 1,
    flexBasis: 1,
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 2
  },
  buttonText: {
    fontFamily: "Roboto-Medium",
    textAlign: "center"
  },
  dividerLine: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: topTabBarDividerColor,
    height: 48
  }
});

export default TopTabBar;
