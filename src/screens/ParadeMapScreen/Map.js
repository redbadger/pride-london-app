// @flow
import React, { PureComponent } from "react";
import type { ElementRef } from "react";
import {
  Image,
  Platform,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import type { Subscription } from "rxjs";
import MapView, { Polyline } from "react-native-maps";
import type { Event, SavedEvents } from "../../data/event";
import type { Amenity } from "../../data/amenity";
import AmenityMarkers from "./AmenityMarkers";
import StageMarkers from "./StageMarkers";
import TerminalMarkers from "./TerminalMarkers";
import { warmPinkColor } from "../../constants/colors";
import type {
  Coordinates,
  Region,
  Terminals
} from "../../constants/parade-coordinates";
import EventCard from "../../components/EventCard";
import ContentPadding from "../../components/ContentPadding";
import MessageBanner from "../../components/MessageBanner";
import locationButtonInactive from "../../../assets/images/location-inactive.png";
import locationButtonActive from "../../../assets/images/location-active.png";
import type { LocationStatus, Coordinate } from "../../lib/geolocation";
import {
  passiveLocationStream,
  activeLocationStream,
  defaultLocationStatus,
  getLocation,
  shouldNeverRequest,
  shouldRequest
} from "../../lib/geolocation";

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
  activeMarker: ?string,
  userLocation: LocationStatus,
  mapLocation: ?Coordinate,
  moveToUserLocation: boolean,
  tileDetails: ?Event
};

const checkAtUserLocation = (
  mapLocation: ?Coordinate,
  userLocation: LocationStatus
) => {
  if (
    mapLocation &&
    userLocation.type === "authorized" &&
    userLocation.location.type === "tracking" &&
    userLocation.location.coords.latitude.toFixed(5) ===
      mapLocation.latitude.toFixed(5) &&
    userLocation.location.coords.longitude.toFixed(5) ===
      mapLocation.longitude.toFixed(5)
  ) {
    return true;
  }
  return false;
};

class Map extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeMarker: null,
      tileDetails: null,
      userLocation: defaultLocationStatus,
      mapLocation: null,
      moveToUserLocation: false
    };
  }

  componentDidMount() {
    this.userLocationSubscription = passiveLocationStream().subscribe(value => {
      this.setState({ userLocation: value });
    });
  }

  componentDidUpdate() {
    if (
      this.state.moveToUserLocation &&
      this.state.userLocation.type === "authorized"
    ) {
      const { location } = this.state.userLocation;

      // Authorized + tracking
      if (location.type === "tracking") {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          moveToUserLocation: false
        });
        const { latitude, longitude } = location.coords;
        this.mapViewRef.current.animateToCoordinate(
          { latitude, longitude },
          500
        );
        return;
      }

      // Authorized + error
      if (location.type === "error") {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          moveToUserLocation: false
        });

        this.messageBannerRef.current.showBanner();
      }
    }
  }

  componentWillUnmount() {
    if (this.userLocationSubscription) {
      this.userLocationSubscription.unsubscribe();
      this.userLocationSubscription = null;
    }
  }

  onRegionChange = (position: Coordinates) => {
    this.setState({ mapLocation: position });
  };

  handleIOSMarkerSelect = (event: {
    nativeEvent: { coordinate: Coordinates }
  }) => {
    this.mapViewRef.current.animateToCoordinate(
      event.nativeEvent.coordinate,
      500
    );
  };

  handleMarkerPress = (stage: Event) => {
    this.setState({ tileDetails: stage, activeMarker: stage.id });
  };

  dismissEventTile = () => {
    this.setState({ tileDetails: null, activeMarker: null });
  };

  moveToUserLocation = () => {
    if (shouldRequest(this.state.userLocation)) {
      if (this.userLocationSubscription) {
        this.userLocationSubscription.unsubscribe();
      }
      this.userLocationSubscription = activeLocationStream(
        this.state.userLocation
      ).subscribe(value => {
        this.setState({ userLocation: value });
      });
    }
    this.setState({
      moveToUserLocation: true
    });
  };

  // $FlowFixMe
  mapViewRef: ElementRef<typeof MapView> = React.createRef();
  // $FlowFixMe
  messageBannerRef: ElementRef<typeof MessageBanner> = React.createRef();

  userLocationSubscription: ?Subscription = null;

  render() {
    const {
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      onEventCardPress,
      amenities,
      stages,
      terminals
    } = this.props;

    return (
      <View style={styles.mapWrapper}>
        <MessageBanner
          title="We couldn't find your location"
          message="GPS or other location finding magic might not be available, please try again later"
          ref={this.messageBannerRef}
        />
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={this.props.paradeRegion}
          showsUserLocation={!!getLocation(this.state.userLocation)}
          showsMyLocationButton={false}
          onRegionChange={this.onRegionChange}
          ref={this.mapViewRef}
          showsPointsOfInterest={false}
          showsScale={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          onPress={this.dismissEventTile}
        >
          <Polyline
            coordinates={this.props.route}
            strokeWidth={5}
            strokeColor={warmPinkColor}
            lineJoin="bevel"
          />
          <TerminalMarkers
            terminals={terminals}
            markerSelect={this.handleIOSMarkerSelect}
            handleMarkerPress={this.dismissEventTile}
          />
          <AmenityMarkers
            amenities={amenities}
            markerSelect={this.handleIOSMarkerSelect}
            handleMarkerPress={this.dismissEventTile}
          />
          <StageMarkers
            stages={stages}
            handleMarkerPress={this.handleMarkerPress}
            activeMarker={this.state.activeMarker}
            markerSelect={this.handleIOSMarkerSelect}
          />
        </MapView>

        {!shouldNeverRequest(this.state.userLocation) && (
          <View style={styles.touchable}>
            <TouchableWithoutFeedback
              onPress={this.moveToUserLocation}
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
            >
              <View>
                <Image
                  accessibilityLabel="Show my location"
                  source={
                    checkAtUserLocation(
                      this.state.mapLocation,
                      this.state.userLocation
                    )
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
    paddingRight: Platform.OS === "ios" ? 0 : 8,
    paddingLeft: 10,
    paddingBottom: 10
  },
  image: {
    width: 48,
    height: 48
  }
});

export default Map;
