// @flow
import React from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "./Text";
import text from "../constants/text";
import eventCategories from "../constants/event-categories";
import {
  blackColor,
  whiteColor,
  coralColor,
  darkBlueGreyTwoColor,
  eucalyptusGreenColor
} from "../constants/colors";

const locale = "en-GB";

const categoryStyleColors = (category: string) => {
  const categoryData = eventCategories[locale][category];

  return {
    backgroundColor: categoryData.color,
    color: categoryData.contrast ? blackColor : whiteColor
  };
};

type Props = {
  selectedCategories: Set<string>,
  style?: StyleObj
};

const CategoryPill = ({ name }: { name: string }) => (
  <Text type="h3" style={[styles.categoryPill, categoryStyleColors(name)]}>
    {name}
  </Text>
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

    const gradientColors = Platform.select({
      ios: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.3)"],
      android: ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0)"]
    });

    return (
      <View style={[styles.selectedCategoriesPills, style]}>
        {selectedCategories.size === 0 ? (
          <Text type="h3" style={styles.zeroSelected}>
            {text.zeroSelected}
          </Text>
        ) : (
          <View style={styles.scrollView}>
            <LinearGradient
              style={styles.scrollShadowLeft}
              end={{ x: 0, y: 0.5 }}
              start={{ x: 1.0, y: 0.5 }}
              colors={gradientColors}
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
              style={styles.scrollShadowRight}
              end={{ x: 1.0, y: 0.5 }}
              start={{ x: 0, y: 0.5 }}
              colors={gradientColors}
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
    height: 40,
    borderRadius: 4,
    flexDirection: "row"
  },
  zeroSelected: {
    color: eucalyptusGreenColor,
    paddingTop: 11,
    paddingLeft: 8
  },
  categoryPill: {
    color: whiteColor,
    backgroundColor: coralColor,
    paddingTop: 3,
    marginLeft: 8,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 2
  },
  scrollView: {
    width: "100%",
    height: 40,
    paddingTop: 8,
    paddingBottom: 8
  },
  scrollShadowLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 15,
    height: 40,
    zIndex: 10,
    borderRadius: 4
  },
  scrollShadowRight: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 15,
    height: 40,
    zIndex: 10,
    borderRadius: 4
  }
});

export default CategoriesPills;
