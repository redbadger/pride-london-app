// @flow
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Text from "../../components/Text";
import text from "../../constants/text";
import eventCategories from "../../constants/event-categories";
import {
  whiteColor,
  coralColor,
  darkBlueGreyTwoColor,
  eucalyptusGreenColor
} from "../../constants/colors";

export const locale = "en-GB";

type Props = {
  selectedCategories: Set<string>
};

const categoryLabels = (selectedCategories: Set<string>) =>
  Array.from(selectedCategories);

const CategoriesPills = ({ selectedCategories }: Props) => (
  <View style={styles.selectedCategoriesPills}>
    {selectedCategories.size === 0 ? (
      <Text type="h3" style={styles.zeroSelected}>
        {text.zeroSelected}
      </Text>
    ) : (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryLabels(selectedCategories).map(name => (
          <Text
            key={name}
            type="h3"
            style={[
              styles.categoryPill,
              { backgroundColor: eventCategories[locale][name].color }
            ]}
          >
            {name}
          </Text>
        ))}
      </ScrollView>
    )}
  </View>
);

const styles = StyleSheet.create({
  selectedCategoriesPills: {
    backgroundColor: darkBlueGreyTwoColor,
    padding: 10,
    paddingLeft: 16,
    borderRadius: 4,
    marginBottom: 16,
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
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 11
  }
});

export default CategoriesPills;
