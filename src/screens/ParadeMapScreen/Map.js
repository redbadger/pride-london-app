// @flow
import React, { PureComponent } from "react";
import type { ElementRef } from "react";
import {
  Image,
  Platform,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
  Alert
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Permissions from "react-native-permissions";
import { uniqWith, eqBy } from "ramda";
import type { Event, SavedEvents } from "../../data/event";
import type { Amenity } from "../../data/amenity";
import AmenityMarkers from "./AmenityMarkers";
import Text from "../../components/Text";
import { warmPinkColor } from "../../constants/colors";
import { getCurrentPosition } from "../../lib/position";
import type {
  Coordinates,
  Region,
  Terminals
} from "../../constants/parade-coordinates";
import EventCard from "../../components/EventCard";
import ContentPadding from "../../components/ContentPadding";
import stageIconActive from "../../../assets/images/stageIconActive.png";
import stageIconInactive from "../../../assets/images/stageIconInactive.png";
import locationButtonInactive from "../../../assets/images/location-inactive.png";
import locationButtonActive from "../../../assets/images/location-active.png";

type PermissionStatus =
  | "authorized"
  | "denied"
  | "restricted"
  | "undetermined"
  | "checking"
  | "asking";

const shouldNeverAsk = (status: PermissionStatus) => status === "restricted";

type Props = {
  route: Array<Coordinates>,
  paradeRegion: Region,
  terminals: Array<Terminals>,
  stages: Array<Event>,
  amenities: Array<Amenity>,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  onEventCardPress: (id: string) => void
};

type State = {
  locationPermission: PermissionStatus,
  atUserLocation: boolean,
  activeMarker: ?string,
  tileDetails: ?Event
};

type setStateArguments = {
  locationPermission?: PermissionStatus,
  atUserLocation?: boolean
};

export const checkLocationPermission = (
  setState: setStateArguments => void
): Promise<PermissionStatus> => {
  setState({ locationPermission: "checking" });
  return Permissions.check("location").then(response => {
    setState({ locationPermission: response });
    return response;
  });
};

export const requestLocationPermission = (
  setState: setStateArguments => void,
  state: State
): Promise<PermissionStatus> => {
  if (shouldNeverAsk(state.locationPermission))
    return Promise.resolve(state.locationPermission);
  setState({ locationPermission: "asking" });
  return Permissions.request("location").then(response => {
    setState({ locationPermission: response });
    return response;
  });
};

const withHighAccuracy = {
  enableHighAccuracy: true,
  timeout: 3000,
  maximumAge: 10000
};

const withLowAccuracy = {
  enableHighAccuracy: false,
  timeout: 3000,
  maximumAge: 10000
};

const animateToCoordinate = ref => (coords: Coordinates) => {
  const { latitude, longitude } = coords;
  ref.current.animateToCoordinate({ latitude, longitude }, 500);
};

class Map extends PureComponent<Props, State> {
  state = {
    activeMarker: null,
    tileDetails: null,
    locationPermission: "undetermined",
    atUserLocation: false
  };

  componentDidMount() {
    checkLocationPermission(this.setState.bind(this));
  }

  onRegionChange = (position: Coordinates) => {
    if (this.state.atUserLocation) {
      this.setState({ atUserLocation: false });
    } else if (this.state.locationPermission === "authorized") {
      getCurrentPosition(withHighAccuracy).then(
        this.checkAtUserLocation(position)
      );
    }
  };

  handleMarkerPress(stage: Event) {
    this.setState({ tileDetails: stage, activeMarker: stage.id });
  }

  handleMapPress = () => {
    this.setState({ tileDetails: null, activeMarker: null });
  };

  checkAtUserLocation = (mapCoordinate: Coordinates) => (
    coords: Coordinates
  ) => {
    const { latitude, longitude } = coords;
    if (
      mapCoordinate.latitude.toFixed(5) === latitude.toFixed(5) &&
      mapCoordinate.longitude.toFixed(5) === longitude.toFixed(5)
    )
      this.setState({ atUserLocation: true });
  };

  moveToCurrentLocation = (): Promise<void> =>
    requestLocationPermission(this.setState.bind(this), this.state).then(() => {
      if (this.state.locationPermission === "authorized") {
        return getCurrentPosition(withHighAccuracy)
          .catch(() => getCurrentPosition(withLowAccuracy))
          .then(animateToCoordinate(this.mapViewRef))
          .catch(() => {
            Alert.alert(
              "We couldn't find your location",
              "GPS or other location finding magic might not be available, please try again later"
            );
          });
      } else if (
        Platform.OS === "ios" &&
        this.state.locationPermission === "denied"
      ) {
        Linking.openURL("app-settings:");
      }
      return Promise.resolve();
    });

  // $FlowFixMe
  mapViewRef: ElementRef<typeof MapView> = React.createRef();

  renderStageMarker = (stage: Event) => (
    <Marker
      zIndex={1}
      coordinate={{
        longitude: stage.fields.location.lon,
        latitude: stage.fields.location.lat
      }}
      key={stage.id}
      onPress={() => this.handleMarkerPress(stage)}
      stopPropagation
      image={
        this.state.activeMarker === stage.id
          ? stageIconActive
          : stageIconInactive
      }
    />
  );

  render() {
    const {
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      onEventCardPress,
      amenities
    } = this.props;

    const uniqueStages = uniqWith(eqBy(stage => stage.id.split("-")[0]))(
      this.props.stages
    );

    return (
      <View style={styles.mapWrapper}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={this.props.paradeRegion}
          showsUserLocation={this.state.locationPermission === "authorized"}
          showsMyLocationButton={false}
          onRegionChange={this.onRegionChange}
          ref={this.mapViewRef}
          showsPointsOfInterest={false}
          showsScale={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          onPress={this.handleMapPress}
        >
          <Polyline
            coordinates={this.props.route}
            strokeWidth={5}
            strokeColor={warmPinkColor}
            lineJoin="bevel"
          />
          {this.props.terminals.map(terminal => (
            <Marker
              coordinate={terminal.coordinates}
              key={terminal.key}
              centerOffset={{ x: 0, y: -15 }}
              stopPropagation
            >
              <View style={terminal.style.markerView}>
                <View style={terminal.style.markerTextWrapper}>
                  <Text type={terminal.text.type} color={terminal.text.color}>
                    {terminal.text.text}
                  </Text>
                </View>
                <View style={terminal.style.triangle} />
              </View>
            </Marker>
          ))}
          <AmenityMarkers amenities={amenities} />
          {uniqueStages.length > 0 && uniqueStages.map(this.renderStageMarker)}
        </MapView>

        {!shouldNeverAsk(this.state.locationPermission) && (
          <View style={styles.touchable}>
            <TouchableWithoutFeedback
              onPress={this.moveToCurrentLocation}
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            >
              <View>
                <Image
                  accessibilityLabel="Show my location"
                  source={
                    this.state.atUserLocation
                      ? locationButtonActive
                      : locationButtonInactive
                  }
                  style={styles.image}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
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
                onPress={onEventCardPress}
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
    justifyContent: "space-between",
    alignItems: "center"
  },
  tileContainer: {
    width: "100%"
  },
  touchable: {
    alignSelf: "flex-end",
    marginTop: Platform.OS === "ios" ? 44 : 8,
    paddingRight: Platform.OS === "ios" ? 9 : 8,
    paddingLeft: 10,
    paddingBottom: 10
  },
  image: {
    width: 48,
    height: 48
  }
});

export default Map;
