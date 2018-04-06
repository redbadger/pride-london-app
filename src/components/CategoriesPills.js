// @flow
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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

    return (
      <View style={[styles.selectedCategoriesPills, style]}>
        {selectedCategories.size === 0 ? (
          <Text type="h3" style={styles.zeroSelected}>
            {text.zeroSelected}
          </Text>
        ) : (
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
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedCategoriesPills: {
    backgroundColor: darkBlueGreyTwoColor,
    height: 40,
    padding: 8,
    paddingLeft: 16,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row"
  },
  zeroSelected: {
    color: eucalyptusGreenColor,
    paddingTop: 2
  },
  categoryPill: {
    color: whiteColor,
    backgroundColor: coralColor,
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 11
  }
});

export default CategoriesPills;
