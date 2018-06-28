// @flow
import React, { Component } from "react";
import { StyleSheet, SectionList } from "react-native";
import type { SectionBase } from "react-native/Libraries/Lists/SectionList";
import type { ParadeGroup } from "../../data/parade-group";
import ParadeGroupDetails from "./ParadeGroupDetails";
import ContentPadding from "../../components/ContentPadding";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import Text from "../../components/Text";
import { whiteColor } from "../../constants/colors";
import text from "../../constants/text";

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

const isOnlyAlpha = RegExp("[A-Z]");

export const sectionTitle = (paradeGroup: ParadeGroup): string => {
  const leadingCharacter = paradeGroup.fields.name.charAt(0).toUpperCase();
  if (isOnlyAlpha.test(leadingCharacter)) {
    return leadingCharacter;
  }
  return "#";
};

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

  itemSeparator = () => (
    <ContentPadding>
      <SectionDivider />
    </ContentPadding>
  );

  keyExtractor = getId;

  renderItem = ({ item }: RenderItemInfo) => (
    <ContentPadding>
      <ParadeGroupDetails paradeGroup={item} />
    </ContentPadding>
  );

  renderSectionHeader = ({ section }: RenderSectionInfo) => (
    <SectionHeader title={sectionTitle(section.data[0])} />
  );

  renderHeader = () => (
    <ContentPadding style={styles.descriptionContainer}>
      <Text type="h1">{text.paradeGroups.title}</Text>
      <Text style={styles.h2} type="h2" color="lightNavyBlueColor">
        {text.paradeGroups.subTitle}
      </Text>
      <Text style={styles.paragraph}>{text.paradeGroups.paragraph1}</Text>
      <Text style={styles.paragraph}>{text.paradeGroups.paragraph2}</Text>
    </ContentPadding>
  );

  render() {
    const { paradeGroups, testID } = this.props;

    return (
      <SectionList
        stickySectionHeadersEnabled
        sections={sections(paradeGroups)}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={this.itemSeparator}
        ListHeaderComponent={this.renderHeader}
        testID={testID}
        windowSize={10}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: whiteColor
  },
  descriptionContainer: {
    marginTop: 24,
    marginBottom: 16
  },
  h2: {
    marginBottom: 4
  },
  paragraph: {
    marginBottom: 8
  }
});

export default ParadeGroupList;
