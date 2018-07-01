// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { State } from "../../reducers";
import withIsFocused from "../../components/WithIsFocused";
import Component from "./component";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import type { Event, SavedEvents } from "../../data/event";
import type { Amenity } from "../../data/amenity";
import { selectStages, selectSavedEvents, getAmenities } from "../../selectors";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>,
  isFocused: boolean
};

type StateProps = {
  navigation: NavigationScreenProp<NavigationState>,
  stages: Event[],
  amenities: Amenity[],
  isFocused: boolean,
  savedEvents: SavedEvents
};

type DispatchProps = {
  addSavedEvent: string => void,
  removeSavedEvent: string => void
};

type Props = StateProps & DispatchProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation, isFocused }: OwnProps
): StateProps => ({
  navigation,
  amenities: getAmenities(state),
  stages: selectStages(state),
  isFocused,
  savedEvents: selectSavedEvents(state)
});

const mapDispatchToProps = {
  addSavedEvent,
  removeSavedEvent
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export const Container = connector(Component);

export default withIsFocused(Container);
