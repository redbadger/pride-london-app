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
  | "price"
  | "tabBarItem";

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

const fontScaleCaps: { [TextType]: number } = {
  uber: 1,
  h1: 1,
  h2: 22 / 18,
  h3: 20 / 16,
  h4: 20 / 16,
  text: 20 / 16,
  small: 18 / 14,
  xSmall: 14 / 12,
  price: 18 / 14,
  tabBarItem: 13 / 12
};

/**
 * React Native scales font (fontSize and lineHeight) automatically based on
 * the user selected scale (retrievable by PixelRatio.getFontScale()).
 *
 * This function ensures, that the font can not scale beyond the specified
 * maximum scale. This is achieved by returning a proportial recuded font size
 * when the scale is above the specified cap.
 */
export const scaleFont = (type: TextType, base: number) => {
  const fontScale = PixelRatio.getFontScale();
  const fontScaleCap = fontScaleCaps[type];
  if (fontScale > fontScaleCap) {
    const max = base * fontScaleCap;
    return max / fontScale;
  }

  return base;
};

/**
 * All other style props (except fontSize and lineHeight) are not affected by
 * the user selected font scale. However, sometimes it is helpful to scale a
 * view based on the text size of its children.
 *
 * This function returns a size scaled with the user selected font scale but
 * capped by the maximum scale of the specified text type.
 */
export const scaleWithFont = (type: TextType, base: number) => {
  const fontScale = PixelRatio.getFontScale();
  const fontScaleCap = fontScaleCaps[type];
  return base * Math.min(fontScale, fontScaleCap);
};

const textStyles = {
  uber: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: scaleFont("uber", 32),
    lineHeight: scaleFont("uber", 36),
    includeFontPadding: false
  },
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: scaleFont("h1", 24),
    lineHeight: scaleFont("h1", 28),
    includeFontPadding: false
  },
  h2: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scaleFont("h2", 18),
    lineHeight: scaleFont("h2", 24),
    includeFontPadding: false
  },
  h3: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scaleFont("h3", 16),
    lineHeight: scaleFont("h3", 20),
    includeFontPadding: false
  },
  h4: {
    fontFamily: "Roboto-Medium",
    fontSize: scaleFont("h4", 16),
    lineHeight: scaleFont("h4", 24)
  },
  text: {
    fontFamily: "Roboto",
    fontSize: scaleFont("text", 16),
    lineHeight: scaleFont("text", 24)
  },
  small: {
    fontFamily: "Roboto",
    fontSize: scaleFont("small", 14),
    lineHeight: scaleFont("small", 20)
  },
  xSmall: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scaleFont("xSmall", 12),
    lineHeight: scaleFont("xSmall", 16),
    includeFontPadding: false
  },
  price: {
    fontFamily: "Roboto-Bold",
    fontSize: scaleFont("price", 14),
    lineHeight: scaleFont("price", 20)
  },
  tabBarItem: {
    fontFamily: "Poppins-Bold",
    fontSize: scaleFont("tabBarItem", 12),
    lineHeight: scaleFont("tabBarItem", 16),
    includeFontPadding: false
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
    marginTop: scaleWithFont("small", 10),
    marginRight: 10
  },
  text: {
    color: blackColor
  }
};

const styles = StyleSheet.create(textStyles);

export default Text;
