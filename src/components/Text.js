// @flow
import React from "react";
import { Text as RnText, StyleSheet, PixelRatio } from "react-native";
import type { TextProps } from "react-native/Libraries/Text/TextProps";
import type { TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Markdown from "react-native-easy-markdown";
import { mergeDeepRight } from "ramda";
import {
  blackColor,
  lightNavyBlueColor,
  whiteColor
} from "../constants/colors";

export type TextType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "text"
  | "small"
  | "xSmall"
  | "price";

export type ColorType = "lightNavyBlueColor" | "blackColor" | "whiteColor";

type Props = {
  type: TextType,
  color: ColorType,
  markdown: boolean,
  markdownStyle: TextStyleProp,
  ...TextProps
};

class Text extends React.PureComponent<Props> {
  static defaultProps = {
    type: "text",
    markdown: false,
    color: "blackColor",
    markdownStyle: {}
  };

  render() {
    const {
      color,
      type,
      markdown,
      style,
      markdownStyle,
      ...otherProps
    } = this.props;
    const typedType: TextType = (type: any);
    const typedColor: ColorType = (color: any);
    return markdown ? (
      <Markdown
        style={style}
        markdownStyles={mergeDeepRight(
          mergeDeepRight(textStyles, markdownDefaultStyles),
          markdownStyle
        )}
        renderImage={() => null}
        {...otherProps}
      />
    ) : (
      <RnText
        style={[styles[typedType], styles[typedColor], style]}
        {...otherProps}
      />
    );
  }
}

const textStyles = {
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 28,
    includeFontPadding: false
  },
  h2: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    lineHeight: 24,
    includeFontPadding: false
  },
  h3: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 20,
    includeFontPadding: false
  },
  h4: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 24
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24
  },
  small: {
    fontFamily: "Roboto",
    fontSize: 14,
    lineHeight: 20
  },
  xSmall: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false
  },
  price: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    lineHeight: 20
  },
  blackColor: {
    color: blackColor
  },
  lightNavyBlueColor: {
    color: lightNavyBlueColor
  },
  whiteColor: {
    color: whiteColor
  }
};

const markdownDefaultStyles = {
  // "u" - underline is listed in react-native-easy-markdown
  // but doesn't exist in the markdown spec so should be rendered bold
  u: {
    fontWeight: "bold"
  },
  list: {
    marginBottom: 5,
    marginHorizontal: 16
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 5
  },
  listItemBullet: {
    alignSelf: "flex-start",
    width: 4,
    height: 4,
    backgroundColor: "black",
    borderRadius: 2,
    marginTop: 11 * PixelRatio.getFontScale(),
    marginRight: 10
  },
  text: {
    color: blackColor
  }
};

const styles = StyleSheet.create(textStyles);

export default Text;
