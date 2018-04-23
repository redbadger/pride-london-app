// @flow
import React from "react";
import { Text as RnText, StyleSheet } from "react-native";
import type { TextProps } from "react-native/Libraries/Text/TextProps";
import Markdown from "react-native-easy-markdown";
import { mergeDeepRight } from "ramda";
import { blackColor, lightNavyBlueColor } from "../constants/colors";

export type TextType = "h1" | "h2" | "h3" | "h4" | "text" | "small" | "price";
export type TextColor = "lightNavyBlueColor" | "blackColor";

type Props = {
  type: TextType,
  color: TextColor,
  markdown: boolean,
  ...TextProps
};

class Text extends React.PureComponent<Props> {
  static defaultProps = {
    type: "text",
    markdown: false,
    color: "blackColor"
  };

  render() {
    const { color, type, markdown, style, ...otherProps } = this.props;
    return markdown ? (
      <Markdown
        style={style}
        markdownStyles={mergeDeepRight(textStyles, markdownStyles)}
        {...otherProps}
      />
    ) : (
      <RnText
        style={[styles[type], color && styles[color], style]}
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
  }
};

const markdownStyles = {
  // "u" - underline is listed in react-native-easy-markdown
  // but doesn't exist in the markdown spec so should be rendered bold
  u: {
    fontWeight: "bold"
  },
  text: {
    color: blackColor
  }
};

const styles = StyleSheet.create(textStyles);

export default Text;
