// @flow
import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { uniqWith, eqBy } from "ramda";
import type { Event } from "../../data/event";
import type { Coordinates } from "../../constants/parade-coordinates";
import stageIconActive from "../../../assets/images/stageIconActive.png";
import stageIconInactive from "../../../assets/images/stageIconInactive.png";

type Props = {
  stages: Event[],
  activeMarker: ?string,
  handleMarkerPress: (stage: Event) => void,
  markerSelect: (event: { nativeEvent: { coordinate: Coordinates } }) => void
};

const StageMarkers = ({
  stages,
  handleMarkerPress,
  markerSelect,
  activeMarker
}: Props) => {
  if (stages.length === 0) {
    return null;
  }

  const uniqueStages = uniqWith(eqBy(stage => stage.id.split("-")[0]))(stages);

  return (
    <Fragment>
      {uniqueStages.map(stage => (
        <Marker
          coordinate={{
            longitude: stage.fields.location.lon,
            latitude: stage.fields.location.lat
          }}
          key={stage.id}
          onPress={() => handleMarkerPress(stage)}
          stopPropagation
          image={
            activeMarker === stage.id ? stageIconActive : stageIconInactive
          }
          onSelect={markerSelect}
          style={
            activeMarker === stage.id
              ? styles.stageMarkerActiveStyle
              : styles.stageMarkerInactiveStyle
          }
        />
      ))}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  stageMarkerInactiveStyle: {
    zIndex: 1
  },
  stageMarkerActiveStyle: {
    // React Native Maps adds a constant to the currently open callout, but if the stage marker is active we want to move it above this
    // https://github.com/react-community/react-native-maps/blob/080678b24f886c3b8104206f2f80452ee723243a/lib/ios/AirMaps/AIRMapMarker.m#L316
    zIndex: 1001
  }
});

export default StageMarkers;
