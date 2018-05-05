// @flow
import React from "react";
import type { ComponentType } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { lightNavyBlueColor, transparent } from "../constants/colors";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

type StatusBarConfig = {
  hidden?: boolean,
  barStyle?: "default" | "light-content" | "dark-content",
  networkActivityIndicatorVisible?: boolean,
  backgroundColor?: string,
  translucent?: boolean
};

const defaultStatusBarConfig: StatusBarConfig = {
  hidden: false,
  barStyle: "light-content",
  networkActivityIndicatorVisible: false,
  backgroundColor: lightNavyBlueColor,
  translucent: false
};

function withStatusBar<ComponentProps>(
  Component: ComponentType<ComponentProps>,
  statusBarConfig: StatusBarConfig
): ComponentType<ComponentProps & Props> {
  const config = { ...defaultStatusBarConfig, ...statusBarConfig };

  return class extends React.PureComponent<ComponentProps & Props> {
    componentDidMount() {
      this.navListener = this.props.navigation.addListener("didFocus", () => {
        StatusBar.setHidden(config.hidden);
        StatusBar.setBarStyle(config.barStyle);

        if (Platform.OS === "ios") {
          StatusBar.setNetworkActivityIndicatorVisible(
            config.networkActivityIndicatorVisible
          );
        }
      });
    }

    componentWillUnmount() {
      this.navListener.remove();
    }

    navListener: () => void;

    render() {
      const componentProps: ComponentProps = this.props;
      return (
        <View style={styles.container}>
          <StatusBar animated translucent backgroundColor={transparent} />
          {Platform.OS === "android" &&
            !config.translucent && (
              <View
                style={[
                  styles.statusBarBuffer,
                  { backgroundColor: config.backgroundColor }
                ]}
              />
            )}
          <Component {...componentProps} />
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBarBuffer: {
    height: StatusBar.currentHeight
  }
});

export default withStatusBar;
