// @flow
import React from "react";
import {
  SafeAreaView,
  NetInfo,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import { badConnectionBackgroundColor, whiteColor } from "../constants/colors";
import text from "../constants/text";
import Text from "./Text";
import StatusBarAlert from "react-native-statusbar-alert";

type State = {
  hasInternetConnection: boolean
};

class BadConnection extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasInternetConnection: true
    };
  }
  componentDidMount(): void {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.updateConnectionState
    );
    Animated.sequence([
      Animated.timing(this.translateY, {
        duration: 600,
        toValue: 0,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      })
    ]).start();
  }

  componentWillUnmount(): void {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.updateConnectionState
    );
  }

  translateY: Animated.Value = new Animated.Value(-100);

  updateConnectionState = (): void => {
    console.log("BOOM!!!!!");
  };

  render() {
    return (
      <StatusBarAlert
        visible
        style={{
          padding: 5
        }}
      >
        <Text type="h3" style={styles.text}>
          {text.badConnection}
        </Text>
      </StatusBarAlert>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: badConnectionBackgroundColor,
    position: "absolute",
    width: "100%",
    alignItems: "center",
    top: 0
  },
  text: {
    color: whiteColor,
    paddingBottom: 20,
    paddingTop: 10
  }
});

export default BadConnection;
