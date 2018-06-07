// @flow
import React from "react";
import { Image, Linking, StyleSheet, View } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import chevronRightCircleWhite from "../../assets/images/chevronRightCircleWhite.png";
import externalLinkBlue from "../../assets/images/externalLinkBlue.png";
import externalLinkWhite from "../../assets/images/externalLinkWhite.png";
import ContentPadding from "./ContentPadding";
import Text, { scaleWithFont } from "./Text";
import Touchable from "./Touchable";
import {
  lightNavyBlueColor,
  whiteColor,
  supportUsButtonShadow
} from "../constants/colors";
import type { ImageRef } from "../data/image-ref";

type Props = {|
  color: string,
  title: string,
  description: string,
  centerText?: boolean,
  bgBottomLeft?: ImageRef,
  bgTopRight?: ImageRef,
  bgBottomRight?: ImageRef,
  navigation: NavigationScreenProp<NavigationState>,
  url: string,
  contrast?: boolean,
  style?: ViewStyleProp,
  testID?: string
|};

const isExternalLink = (url: string) =>
  url.startsWith("http://") || url.startsWith("https://");

const pickLinkIcon = (url: string, contrast: boolean) => {
  if (isExternalLink(url)) {
    return contrast ? externalLinkBlue : externalLinkWhite;
  }

  return chevronRightCircleWhite;
};

class SupportUsButton extends React.PureComponent<Props> {
  static defaultProps = {
    centerText: false,
    bgBottomLeft: undefined,
    bgTopRight: undefined,
    bgBottomRight: undefined,
    contrast: false,
    style: {},
    testID: undefined
  };

  onPress = () => {
    if (isExternalLink(this.props.url)) {
      Linking.openURL(this.props.url);
    } else {
      this.props.navigation.navigate(this.props.url);
    }
  };

  render() {
    const {
      color,
      title,
      description,
      centerText,
      bgBottomLeft,
      bgTopRight,
      bgBottomRight,
      url,
      contrast,
      style,
      testID
    } = this.props;

    return (
      <Touchable
        accessibilityTraits={[isExternalLink ? "link" : "button"]}
        onPress={this.onPress}
        style={[styles.button, { backgroundColor: color }, style]}
        testID={testID}
      >
        {bgBottomLeft && (
          <Image source={bgBottomLeft} style={styles.bgBottomLeft} />
        )}
        {bgTopRight && <Image source={bgTopRight} style={styles.bgTopRight} />}
        {bgBottomRight && (
          <Image source={bgBottomRight} style={styles.bgBottomRight} />
        )}
        <ContentPadding
          padding={{
            small: { horizontal: 18, vertical: 0 },
            medium: { horizontal: 20, vertical: 0 },
            large: { horizontal: 29, vertical: 0 }
          }}
          style={centerText && styles.centerText}
        >
          <View style={styles.titleContainer}>
            <Text
              type="h1"
              style={contrast ? styles.textContrast : styles.text}
            >
              {title}
            </Text>
            <Image
              source={pickLinkIcon(url, !!contrast)}
              style={styles.titleIcon}
            />
          </View>
          <Text type="h3" style={contrast ? styles.textContrast : styles.text}>
            {description}
          </Text>
        </ContentPadding>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // Can't use `minHeight` because it has a weird behaviour. The
    // button will have the correct size but the sibling elements
    // will layout according to the buttons (smaller) `height`.
    height: Math.max(100, scaleWithFont("h3", 100)),
    justifyContent: "center",
    borderRadius: 5,
    overflow: "hidden",

    // The below properties are required for iOS shadow
    shadowColor: supportUsButtonShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,

    // The below properties are required for Android shadow
    borderWidth: 0,
    elevation: 3
  },
  bgBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0
  },
  bgTopRight: {
    position: "absolute",
    top: 0,
    right: 0
  },
  bgBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  centerText: {
    alignItems: "center"
  },
  titleContainer: {
    flexDirection: "row"
  },
  titleIcon: {
    marginLeft: 8,
    alignSelf: "center",
    transform: [{ translateY: scaleWithFont("h1", -4) }]
  },
  text: {
    color: whiteColor
  },
  textContrast: {
    color: lightNavyBlueColor
  }
});

export default SupportUsButton;
