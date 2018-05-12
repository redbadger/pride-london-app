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
import { cap } from "./Text";
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

  handleTabPress = (index: number) => {
    this.props.jumpToIndex(index);
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
    const { position, navigation } = this.props;
    const { index } = scene;
    const { routes } = navigation.state;

    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const color = position.interpolate({
      inputRange,
      outputRange: inputRange.map(
        inputIndex =>
          inputIndex === index ? tabBarActiveLabelColor : tabBarLabelColor
      )
    });
    const tintColor = scene.focused ? tabBarActiveLabelColor : tabBarLabelColor;
    const label = this.props.getLabel({ ...scene, tintColor });

    return (
      <Animated.Text numberOfLines={1} style={[styles.label, { color }]}>
        {label}
      </Animated.Text>
    );
  };

  renderIcon = (scene: TabScene) => {
    const { position, navigation } = this.props;
    const { route, index } = scene;
    const { routes } = navigation.state;

    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const activeOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 1 : 0))
    });
    const inactiveOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 0 : 1))
    });

    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them.
    return (
      <View style={styles.iconContainer}>
        <Animated.View style={[styles.icon, { opacity: activeOpacity }]}>
          {this.props.renderIcon({
            route,
            index,
            focused: true
          })}
        </Animated.View>
        <Animated.View style={[styles.icon, { opacity: inactiveOpacity }]}>
          {this.props.renderIcon({
            route,
            index,
            focused: false
          })}
        </Animated.View>
      </View>
    );
  };

  render() {
    const { navigation, getTestIDProps } = this.props;
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
            const { testID, accessibilityLabel } =
              (getTestIDProps && getTestIDProps(scene)) || {};

            return (
              <Touchable
                key={route.key}
                testID={testID}
                accessibilityLabel={accessibilityLabel}
                onLayout={event => {
                  this.tabLayouts[index] = event.nativeEvent.layout;
                  this.updateActiveTabLine();
                }}
                onPress={() => this.handleTabPress(index)}
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
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: cap(12, 13),
    lineHeight: cap(16, 17),
    includeFontPadding: false
  }
});

export default NavigationTabBar;
