// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { State } from "../../reducers";
import type {
  EventCategoryName,
  SavedEvents,
  EventDays
} from "../../data/event-deprecated";
import type { FieldRef } from "../../data/field-ref";
import type { ImageSource } from "../../data/get-asset-source";
import getAssetSource from "../../data/get-asset-source";
import { updateData } from "../../actions/data";
import { addSavedEvent, removeSavedEvent } from "../../actions/saved-events";
import {
  groupEventsByStartTime,
  selectEventsLoading,
  selectEventsRefreshing,
  selectFilteredEvents,
  selectAssetById
} from "../../selectors/events";
import Component from "./component";

type StateProps = {
  events: EventDays,
  savedEvents: SavedEvents,
  loading: boolean,
  refreshing: boolean,
  getAssetSource: FieldRef => ImageSource,
  selectedCategories: Set<EventCategoryName>
};

type DispatchProps = {
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  updateData: () => Promise<void>
};

type Props = StateProps & DispatchProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State): StateProps => ({
  events: groupEventsByStartTime(selectFilteredEvents(state)),
  savedEvents: state.savedEvents,
  loading: selectEventsLoading(state),
  refreshing: selectEventsRefreshing(state),
  getAssetSource: getAssetSource(id => selectAssetById(state, id)),
  selectedCategories: state.eventFilters.selectedFilters.categories
});

const mapDispatchToProps = {
  updateData,
  addSavedEvent,
  removeSavedEvent
};

const connector: Connector<StateProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
