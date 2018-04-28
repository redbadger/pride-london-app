// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import type { Event } from "../../data/event";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import getAssetUrl from "../../data/get-asset-url";
import type { State } from "../../reducers";
import { selectEventById, selectAssetById } from "../../selectors/events";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>
};

type Props = {
  event: Event,
  getAssetUrl: LocalizedFieldRef => string
} & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = (
  state,
  ownProps
) => {
  const id = ownProps.navigation.state.params.eventId;
  return {
    event: selectEventById(state, id),
    getAssetUrl: getAssetUrl(eventId => selectAssetById(state, eventId)),
    isSaved: state.savedEvents.has(id)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSaved: active => {
    const id = ownProps.navigation.state.params.eventId;
    if (active) {
      return dispatch(addSavedEvent(id));
    }
    return dispatch(removeSavedEvent(id));
  }
});

// $FlowFixMe
const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
