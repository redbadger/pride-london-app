// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import text from "../../constants/text";
import type { Event } from "../../data/event";

import Collapsible from "../../components/Collapsible";
import Text from "../../components/Text";

type Props = { event: Event };

class EventDescription extends PureComponent<Props> {
  render() {
    const { event } = this.props;

    return (
      <View>
        <Text type="h2" color="lightNavyBlueColor" style={styles.title}>
          {text.eventDetailsAbout}
        </Text>
        <Collapsible
          showMoreLabel={text.eventDetailsReadMore}
          showLessLabel={text.eventDetailsReadLess}
        >
          <Text markdown>{event.fields.eventDescription}</Text>
        </Collapsible>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 4
  }
});

export default EventDescription;
