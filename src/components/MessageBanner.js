// @flow
import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback
} from "react-native";
import Text, { scaleWithFont } from "./Text";
import {
  eucalyptusGreenColor,
  categoriesFilterButtonBgColor
} from "../constants/colors";
import ContentPadding from "../components/ContentPadding";

type Props = {
  title: string,
  message: string
};

class MessageBanner extends PureComponent<Props> {
  constructor() {
    super();
    this.isAnimating = false;
    this.bannerTop = new Animated.Value(0);
  }

  bannerTop: Animated.Value;
  isAnimating: boolean;

  slideAnimation = (value: number, delay: number) =>
    Animated.timing(this.bannerTop, {
      toValue: value,
      duration: 1000,
      useNativeDriver: true,
      delay
    });

  showBanner = () => {
    if (!this.isAnimating) {
      this.isAnimating = true;

      Animated.sequence([
        this.slideAnimation(Math.max(scaleWithFont("h3", 90), 90), 0),
        this.slideAnimation(0, 7000)
      ]).start(({ finished }) => {
        if (finished) this.isAnimating = false;
      });
    }
  };

  hideBanner = () => {
    this.slideAnimation(0, 0).start(({ finished }) => {
      if (finished) this.isAnimating = false;
    });
  };

  render() {
    const { title, message } = this.props;

    return (
      <Animated.View
        style={[
          styles.wrapperView,
          { transform: [{ translateY: this.bannerTop }] }
        ]}
      >
        <TouchableWithoutFeedback onPress={this.hideBanner}>
          <View style={styles.messageContainer}>
            <ContentPadding
              padding={{
                small: { horizontal: 8, vertical: 8 },
                medium: { horizontal: 16, vertical: 16 },
                large: { horizontal: 20, vertical: 20 }
              }}
            >
              <Text type="h3" style={styles.messageText}>
                {title}
              </Text>
              <Text type="small" style={styles.messageText}>
                {message}
              </Text>
            </ContentPadding>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1
  },
  messageText: {
    color: categoriesFilterButtonBgColor
  },
  wrapperView: {
    position: "absolute",
    left: 0,
    top: Math.max(scaleWithFont("h3", 90), 90) * -1,
    backgroundColor: eucalyptusGreenColor,
    width: "100%",
    height: Math.max(scaleWithFont("h3", 90), 90),
    elevation: 1,
    zIndex: 1,
    justifyContent: "flex-start"
  }
});

export default MessageBanner;
