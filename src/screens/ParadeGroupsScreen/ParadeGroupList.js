// @flow
import React, { Component } from "react";
import { StyleSheet, SectionList, View } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
import type { ParadeGroup } from "./parade-group";
import ContentPadding from "../../components/ContentPadding";
import SectionHeader from "../../components/SectionHeader";
import Text from "../../components/Text";
import { whiteColor } from "../../constants/colors";

type Props = {
  paradeGroups: ParadeGroup[][],
  testID?: string
};

type Section = SectionBase<ParadeGroup> & { index: number };

type RenderItemInfo = {
  item: ParadeGroup, // eslint-disable-line react/no-unused-prop-types
  index: number,
  section: Section
};

type RenderSectionInfo = {
  section: Section // eslint-disable-line react/no-unused-prop-types
};

const sectionTitle = (paradeGroup: ParadeGroup): string =>
  paradeGroup.fields.name.charAt(0).toUpperCase();

const sections = (sectionedParadeGroups: ParadeGroup[][]): Section[] =>
  sectionedParadeGroups.map((paradeGroups, index) => ({
    data: paradeGroups,
    key: sectionTitle(paradeGroups[0]),
    index
  }));

const getId = (item: { id: string }): string => item.id;

class ParadeGroupList extends Component<Props> {
  static defaultProps = {
    testID: undefined
  };

  shouldComponentUpdate(nextProps: Props) {
    const { paradeGroups } = this.props;
    const { paradeGroups: nextParadeGroups } = nextProps;

    return paradeGroups !== nextParadeGroups;
  }

  itemSeparator = () => <View style={styles.itemSeparator} />;

  sectionSeparator = () => <View style={styles.sectionSeparator} />;

  keyExtractor = getId;

  renderItem = ({ item }: RenderItemInfo) => (
    <ContentPadding>
      <Text>Name: {item.fields.name}</Text>
    </ContentPadding>
  );

  renderSectionHeader = ({ section }: RenderSectionInfo) => (
    <SectionHeader title={sectionTitle(section.data[0])} />
  );

  renderSectionFooter = () => <View style={styles.sectionFooter} />;

  render() {
    const { paradeGroups, testID } = this.props;

    return (
      <SectionList
        stickySectionHeadersEnabled
        sections={sections(paradeGroups)}
        renderSectionHeader={this.renderSectionHeader}
        renderSectionFooter={this.renderSectionFooter}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={this.itemSeparator}
        SectionSeparatorComponent={this.sectionSeparator}
        testID={testID}
        windowSize={10}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemSeparator: {
    height: 12
  },
  sectionSeparator: {
    height: 6
  },
  container: {
    paddingTop: 0,
    backgroundColor: whiteColor
  },
  sectionFooter: {
    height: 6
  }
});

export default ParadeGroupList;
