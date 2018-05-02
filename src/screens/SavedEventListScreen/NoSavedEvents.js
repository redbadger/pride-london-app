// @flow
import React, { PureComponent } from "react";
import { Image, StyleSheet, View } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import Text from "../../components/Text";
import ButtonPrimary from "../../components/ButtonPrimary";
import iconSave from "../../../assets/images/save.png";
import noSavedEvents from "../../../assets/images/howToSaveEvents.png";
import text from "../../constants/text";
import { cardBgColor, titleTextColor } from "../../constants/colors";
import { EVENT_LIST } from "../../constants/routes";
import strings from "../../constants/strings";

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

class NoSavedEvents extends PureComponent<Props> {
  eventList = () => {
    this.props.navigation.navigate(EVENT_LIST, {
      title: strings.featuredEventsTitle
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={noSavedEvents} />
        <View style={styles.contentOverlay}>
          <Text type="h1" style={styles.title}>
            {text.noSavedEventsTitle}
          </Text>
          <Text style={styles.infoText}>
            {text.noSavedEventsPart1}&nbsp;
            <Image
              accessibilityLabel={`'${text.saveEvent}' button`}
              source={iconSave}
            />
            &nbsp;{text.noSavedEventsPart2}
          </Text>
          <ButtonPrimary onPress={this.eventList}>
            {text.noSavedEventsButton}
          </ButtonPrimary>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",
    flexWrap: "wrap",
    marginHorizontal: 12
  },
  image: {
    alignSelf: "center"
  },
  title: {
    color: titleTextColor,
    textAlign: "center",
    paddingBottom: 12
  },
  contentOverlay: {
    flex: 1,
    backgroundColor: cardBgColor,
    width: "100%",
    alignSelf: "flex-end",
    paddingTop: 12
  },
  infoText: {
    textAlign: "center",
    paddingBottom: 24
  }
});

export default NoSavedEvents;
