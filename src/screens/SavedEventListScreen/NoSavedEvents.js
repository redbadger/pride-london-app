// @flow
import React, { PureComponent } from "react";
import { Image, StyleSheet, ScrollView } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import Text from "../../components/Text";
import ButtonPrimary from "../../components/ButtonPrimary";
import LayoutColumn from "../../components/LayoutColumn";
import iconSave from "../../../assets/images/save.png";
import noSavedEvents from "../../../assets/images/howToSaveEvents.png";
import text from "../../constants/text";
import { lightNavyBlueColor } from "../../constants/colors";
import { EVENT_LIST } from "../../constants/routes";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

class NoSavedEvents extends PureComponent<Props> {
  eventList = () => {
    this.props.navigation.navigate(EVENT_LIST);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <LayoutColumn spacing={12}>
          <Image style={styles.image} source={noSavedEvents} />
          <Text type="h1" style={styles.title}>
            {text.noSavedEventsTitle}
          </Text>
          <Text
            style={styles.infoText}
            accessibilityLabel={`${text.noSavedEventsPart1} ${
              text.noSavedEventsSaveButtonAlt
            } ${text.noSavedEventsPart2}`}
          >
            {text.noSavedEventsPart1}&nbsp;
            <Image source={iconSave} />
            &nbsp;{text.noSavedEventsPart2}
          </Text>
          <ButtonPrimary onPress={this.eventList}>
            {text.noSavedEventsButton}
          </ButtonPrimary>
        </LayoutColumn>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginHorizontal: 12
  },
  image: {
    alignSelf: "center"
  },
  title: {
    color: lightNavyBlueColor,
    textAlign: "center"
  },
  infoText: {
    textAlign: "center",
    paddingBottom: 12 // 24px between button and content
  }
});

export default NoSavedEvents;
