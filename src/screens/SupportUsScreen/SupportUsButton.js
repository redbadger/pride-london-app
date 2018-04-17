// @flow
import React from "react";
import { Image, Linking, PixelRatio, StyleSheet, View } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import chevronRightCircleWhite from "../../../assets/images/chevronRightCircleWhite.png";
import externalLinkBlue from "../../../assets/images/externalLinkBlue.png";
import externalLinkWhite from "../../../assets/images/externalLinkWhite.png";
import ContentPadding from "../../components/ContentPadding";
import Text from "../../components/Text";
import Touchable from "../../components/Touchable";
import {
  lightNavyBlueColor,
  whiteColor,
  supportUsButtonShadow
} from "../../constants/colors";
import type { ImageRef } from "../../data/image-ref";

type Props = {
  color: string,
  title: string,
  description: string,
  bgLeft?: ImageRef,
  bgRight?: ImageRef,
  navigation: NavigationScreenProp<NavigationState>,
  url: string,
  isExternalLink?: boolean,
  contrast?: boolean,
  style?: StyleObj
};

const pickLinkIcon = (isExternalLink: boolean, contrast: boolean) => {
  if (isExternalLink) {
    return contrast ? externalLinkBlue : externalLinkWhite;
  }

  return chevronRightCircleWhite;
};

class SupportUsButton extends React.PureComponent<Props> {
  onPress = () => {
    if (this.props.isExternalLink) {
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
      bgLeft,
      bgRight,
      isExternalLink,
      contrast,
      style
    } = this.props;

    return (
      <Touchable
        onPress={this.onPress}
        style={[styles.button, { backgroundColor: color }, style]}
      >
        {bgLeft && <Image source={bgLeft} style={styles.bgLeft} />}
        {bgRight && <Image source={bgRight} style={styles.bgRight} />}
        <ContentPadding
          padding={{
            small: { horizontal: 18, vertical: 0 },
            medium: { horizontal: 20, vertical: 0 },
            large: { horizontal: 29, vertical: 0 }
          }}
        >
          <View style={styles.titleContainer}>
            <Text
              type="h1"
              style={contrast ? styles.textContrast : styles.text}
            >
              {title}
            </Text>
            <Image
              source={pickLinkIcon(!!isExternalLink, !!contrast)}
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
    justifyContent: "center",
    height: 100 * PixelRatio.getFontScale(),
    borderRadius: 5,

    // The below properties are required for iOS shadow
    shadowColor: supportUsButtonShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,

    // The below properties are required for Android shadow
    borderWidth: 0,
    elevation: 3
  },
  bgLeft: {
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    left: 0
  },
  bgRight: {
    borderRadius: 5,
    position: "absolute",
    top: 0,
    right: 0
  },
  titleContainer: {
    flexDirection: "row"
  },
  titleIcon: {
    marginLeft: 8,
    alignSelf: "center",
    transform: [{ translateY: -4 * PixelRatio.getFontScale() }]
  },
  text: {
    color: whiteColor
  },
  textContrast: {
    color: lightNavyBlueColor
  }
});

export default SupportUsButton;
