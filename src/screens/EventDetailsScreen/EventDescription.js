// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet, Animated } from "react-native";
import type { LayoutEvent } from "react-native/Libraries/Types/CoreEventTypes";
import LinearGradient from "react-native-linear-gradient";
import {
  lightNavyBlueColor,
  eucalyptusGreenColor,
  whiteZeroColor,
  whiteColor
} from "../../constants/colors";
import text from "../../constants/text";
import type { Event } from "../../data/event";
import locale from "../../data/locale";
import Text from "../../components/Text";
import Touchable from "../../components/Touchable";
import EventMap from "./EventMap";

type Props = { event: Event };

const collapsedHeight = 100;

class EventDescription extends PureComponent<
  Props,
  { collapsed: boolean, textHeight: number }
> {
  state = {
    collapsed: true,
    textHeight: 0
  };

  componentWillMount() {
    this.textContainerHeight = new Animated.Value(Number(this.state.collapsed));
    this.gradientOpacity = new Animated.Value(Number(this.state.collapsed));
  }

  textContainerHeight: Object;
  gradientOpacity: Object;

  toggleCollapsed = () => {
    const newState = !this.state.collapsed;
    Animated.timing(this.textContainerHeight, {
      toValue: Number(newState),
      duration: this.state.textHeight * 0.8
    }).start(() => this.setState({ collapsed: newState }));
    Animated.timing(this.gradientOpacity, {
      toValue: Number(newState),
      duration: this.state.textHeight * 0.8,
      useNativeDriver: true
    }).start();
  };

  measureTextHeight = (event: LayoutEvent) =>
    this.setState({ textHeight: event.nativeEvent.layout.height });

  render() {
    const { event } = this.props;
    const { textHeight, collapsed } = this.state;

    const textContainerHeightStyle = {
      height: this.textContainerHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [textHeight, collapsedHeight]
      })
    };

    const gradientOpacityStyle = {
      opacity: this.gradientOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    return (
      <View style={styles.content}>
        <Text type="h2" style={styles.header}>
          {text.eventDetailsAbout}
        </Text>
        <View>
          <Animated.ScrollView
            style={[textContainerHeightStyle, {}]}
            scrollEnabled={false}
          >
            <Text
              markdown
              style={[styles.text]}
              onLayout={this.measureTextHeight}
            >
              {event.fields.eventDescription[locale]}
            </Text>
          </Animated.ScrollView>
          <Animated.View style={[styles.gradient, gradientOpacityStyle]}>
            <LinearGradient
              colors={[whiteZeroColor, whiteColor]}
              style={styles.gradient}
            />
          </Animated.View>
        </View>
        <Touchable
          onPress={this.toggleCollapsed}
          style={styles.toggleContainer}
        >
          <View style={styles.toggleBorder}>
            <Text type="h4" style={styles.toggleText}>
              {collapsed
                ? text.eventDetailsReadMore
                : text.eventDetailsReadLess}
            </Text>
          </View>
        </Touchable>
        <View style={styles.mapWrapper}>
          <EventMap
            lat={event.fields.location[locale].lat}
            lon={event.fields.location[locale].lon}
            locationName={event.fields.locationName[locale]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 8
  },
  header: {
    color: lightNavyBlueColor,
    marginBottom: 8
  },
  text: {},
  gradient: {
    width: "100%",
    height: 60,
    position: "absolute",
    bottom: 0
  },
  toggleContainer: {
    alignSelf: "flex-end"
  },
  toggleText: {
    color: lightNavyBlueColor
  },
  toggleBorder: {
    borderBottomColor: eucalyptusGreenColor,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    alignSelf: "flex-start",
    marginBottom: 2
  },
  mapWrapper: {
    marginTop: 8
  }
});

export default EventDescription;
