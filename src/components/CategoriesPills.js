// @flow
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "./Text";
import text from "../constants/text";
import { getCategoryColor } from "../constants/event-categories";
import {
  whiteColor,
  coralColor,
  darkBlueGreyTwoColor,
  eucalyptusGreenColor
} from "../constants/colors";

const locale = "en-GB";

type Props = {
  selectedCategories: Set<string>
};

const CategoryPill = ({ name }: { name: string }) => (
  <Text
    type="h3"
    style={[
      styles.categoryPill,
      { backgroundColor: getCategoryColor(name, locale) }
    ]}
  >
    {name}
  </Text>
);

const CategoriesPills = ({ selectedCategories }: Props) => (
  <View style={styles.selectedCategoriesPills}>
    {selectedCategories.size === 0 ? (
      <Text type="h3" style={styles.zeroSelected}>
        {text.zeroSelected}
      </Text>
    ) : (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.from(selectedCategories).map(name => (
          <CategoryPill key={name} name={name} />
        ))}
      </ScrollView>
    )}
  </View>
);

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
