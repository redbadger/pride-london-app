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
  | "uber"
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
        allowFontScaling={false}
        style={[styles[typedType], styles[typedColor], style]}
        {...otherProps}
      />
    );
  }
}

const cap = (def, max) => Math.min(max, def * PixelRatio.getFontScale());

const textStyles = {
  uber: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 32,
    lineHeight: 36,
    includeFontPadding: false
  },
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 28,
    includeFontPadding: false
  },
  h2: {
    fontFamily: "Poppins-SemiBold",
    fontSize: cap(18, 22),
    lineHeight: cap(24, 29),
    includeFontPadding: false
  },
  h3: {
    fontFamily: "Poppins-SemiBold",
    fontSize: cap(16, 20),
    lineHeight: cap(20, 25),
    includeFontPadding: false
  },
  h4: {
    fontFamily: "Roboto-Medium",
    fontSize: cap(16, 20),
    lineHeight: cap(24, 30)
  },
  text: {
    fontFamily: "Roboto",
    fontSize: cap(16, 20),
    lineHeight: cap(24, 30)
  },
  small: {
    fontFamily: "Roboto",
    fontSize: cap(14, 18),
    lineHeight: cap(20, 26)
  },
  xSmall: {
    fontFamily: "Poppins-SemiBold",
    fontSize: cap(12, 14),
    lineHeight: cap(16, 18),
    includeFontPadding: false
  },
  price: {
    fontFamily: "Roboto-Bold",
    fontSize: cap(14, 18),
    lineHeight: cap(20, 26)
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
