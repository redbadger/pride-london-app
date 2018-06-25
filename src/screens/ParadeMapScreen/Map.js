// @flow
import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import type { Event, SavedEvents } from "../../data/event";
import paradeCoordinates from "../../constants/parade-coordinates";
import {
  warmPinkColor,
  lightNavyBlueColor,
  transparent
} from "../../constants/colors";
import Text from "../../components/Text";
import EventCard from "../../components/EventCard";
import ContentPadding from "../../components/ContentPadding";
import stageIconActive from "../../../assets/images/stageIconActive.png";
import stageIconInactive from "../../../assets/images/stageIconInactive.png";

type Props = {
  stages: Array<Event>,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  onPress: (id: string) => void
};

type State = {
  activeMarker: ?string,
  tileDetails: ?Event
};

class Map extends Component<Props, State> {
  state = {
    activeMarker: null,
    tileDetails: null
  };

  handleMarkerPress(stage: Event) {
    this.setState({ tileDetails: stage, activeMarker: stage.id });
  }

  handleMapPress = () => {
    this.setState({ tileDetails: null, activeMarker: null });
  };

  renderStageMarker = (stage: Event) => (
    <Marker
      coordinate={{
        longitude: stage.fields.location.lon,
        latitude: stage.fields.location.lat
      }}
      key={stage.id}
      onPress={() => this.handleMarkerPress(stage)}
      stopPropagation={true}
    >
      <Image
        source={
          this.state.activeMarker === stage.id
            ? stageIconActive
            : stageIconInactive
        }
      />
    </Marker>
  );

  render() {
    const {
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      onPress
    } = this.props;
    return (
      <View style={styles.mapWrapper}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: 51.5085,
            longitude: -0.134192,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}
          showsPointsOfInterest={false}
          showsScale={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          onPress={this.handleMapPress}
        >
          <Polyline
            coordinates={paradeCoordinates}
            strokeWidth={5}
            strokeColor={warmPinkColor}
            lineJoin="bevel"
          />
          <Marker
            coordinate={{ longitude: -0.14223, latitude: 51.51616 }}
            centerOffset={{ x: 0, y: -15 }}
            anchor={{ x: 1, y: 1 }}
            stopPropagation={true}
          >
            <View style={styles.markerView}>
              <View style={styles.markerTextWrapper}>
                <Text type="h4" color="whiteColor">
                  Start
                </Text>
              </View>
              <View style={styles.triangle} />
            </View>
          </Marker>
          <Marker
            coordinate={{ longitude: -0.1265, latitude: 51.50499 }}
            centerOffset={{ x: 0, y: -15 }}
            anchor={{ x: 1, y: 1 }}
            stopPropagation={true}
          >
            <View style={styles.markerView}>
              <View style={styles.markerTextWrapper}>
                <Text type="h4" color="whiteColor">
                  Finish
                </Text>
              </View>
              <View style={styles.triangle} />
            </View>
          </Marker>
          {this.props.stages.length > 0 &&
            this.props.stages.map(stage => this.renderStageMarker(stage))}
        </MapView>
        {this.state.tileDetails && (
          <View style={styles.tileContainer}>
            <ContentPadding
              padding={{
                small: { horizontal: 8, vertical: 8 },
                medium: { horizontal: 16, vertical: 16 },
                large: { horizontal: 20, vertical: 20 }
              }}
            >
              <EventCard
                id={this.state.tileDetails.id}
                name={this.state.tileDetails.fields.name}
                locationName={this.state.tileDetails.fields.locationName}
                eventPriceLow={this.state.tileDetails.fields.eventPriceLow}
                eventPriceHigh={this.state.tileDetails.fields.eventPriceHigh}
                startTime={this.state.tileDetails.fields.startTime}
                endTime={this.state.tileDetails.fields.endTime}
                imageReference={this.state.tileDetails.fields.eventsListPicture}
                isSaved={savedEvents.has(this.state.tileDetails.id)}
                addSavedEvent={addSavedEvent}
                removeSavedEvent={removeSavedEvent}
                onPress={onPress}
              />
            </ContentPadding>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  markerView: {
    alignItems: "center"
  },
  markerTextWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: lightNavyBlueColor
  },
  tileContainer: {
    width: "100%"
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: transparent,
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: transparent,
    borderRightColor: transparent,
    borderBottomColor: lightNavyBlueColor,
    transform: [{ rotate: "180deg" }]
  }
});

export default Map;
