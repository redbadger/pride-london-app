// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import {
  stageEventFilters,
  commitEventFilters,
  clearStagedEventFilters
} from "../../actions/event-filters";
import type { Event } from "../../data/event";
import type { State } from "../../reducers";
import { selectFilteredEvents } from "../../selectors/events";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<*>
};

type Props = {
  events: Event[]
} & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = state => ({
  events: selectFilteredEvents(state, true)
});

const mapDispatchToProps = {
  onApplyFilters: () => commitEventFilters(),
  onFiltersChange: (categories: Array<string>) =>
    stageEventFilters({ categories: new Set(categories) }),
  onClearAll: () => clearStagedEventFilters()
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
