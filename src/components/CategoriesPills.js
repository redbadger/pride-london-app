// @flow
import React from "react";
import { View, StyleSheet, ScrollView, PixelRatio } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "./Text";
import text from "../constants/text";
import eventCategories from "../constants/event-categories";
import locale from "../data/locale";

import {
  blackColor,
  whiteColor,
  darkBlueGreyTwoColor,
  eucalyptusGreenColor
} from "../constants/colors";

const categoryStyleColor = (category: string) => {
  const categoryData = eventCategories[locale][category];
  return { color: categoryData.contrast ? blackColor : whiteColor };
};

const categoryStyleBackgroundColor = (category: string) => {
  const categoryData = eventCategories[locale][category];
  return { backgroundColor: categoryData.color };
};

type Props = {
  selectedCategories: Set<string>,
  style?: StyleObj
};

const CategoryPill = ({ name }: { name: string }) => (
  <View style={[styles.categoryPill, categoryStyleBackgroundColor(name)]}>
    <Text type="h3" style={[styles.categoryPillText, categoryStyleColor(name)]}>
      {name}
    </Text>
  </View>
);

class CategoriesPills extends React.PureComponent<Props> {
  static defaultProps = {
    style: {}
  };

  scrollView: ?Object;

  scrollToLastPill = () => {
    if (!this.scrollView) {
      return;
    }

    this.scrollView.scrollToEnd({ animated: false });
  };

  render() {
    const { style, selectedCategories } = this.props;

    return (
      <View style={[styles.selectedCategoriesPills, style]}>
        {selectedCategories.size === 0 ? (
          <Text type="h3" style={styles.zeroSelected}>
            {text.zeroSelected}
          </Text>
        ) : (
          <View style={styles.scrollView}>
            <LinearGradient
              style={[styles.scrollShadow, styles.scrollShadowLeft]}
              end={{ x: 0, y: 0.5 }}
              start={{ x: 1.0, y: 0.5 }}
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.3)"]}
            />
            <ScrollView
              ref={(ref: ?Object) => {
                this.scrollView = ref;
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              onContentSizeChange={this.scrollToLastPill}
            >
              {Array.from(selectedCategories).map(name => (
                <CategoryPill key={name} name={name} />
              ))}
            </ScrollView>
            <LinearGradient
              style={[styles.scrollShadow, styles.scrollShadowRight]}
              end={{ x: 1.0, y: 0.5 }}
              start={{ x: 0, y: 0.5 }}
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.3)"]}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedCategoriesPills: {
    backgroundColor: darkBlueGreyTwoColor,
    flex: 1,
    alignItems: "center",
    height: 44 * PixelRatio.getFontScale(),
    borderRadius: 4,
    flexDirection: "row"
  },
  zeroSelected: {
    color: eucalyptusGreenColor,
    paddingLeft: 8
  },
  categoryPill: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 6,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 2
  },
  categoryPillText: {
    color: whiteColor
  },
  scrollView: {
    width: "100%"
  },
  scrollShadow: {
    position: "absolute",
    top: 0,
    width: 15,
    height: 44 * PixelRatio.getFontScale(),
    zIndex: 10,
    borderRadius: 4
  },
  scrollShadowLeft: {
    left: 0
  },
  scrollShadowRight: {
    right: 0
  }
});

export default CategoriesPills;
