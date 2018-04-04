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
  events: Event[],
  stagedCategories: Set<string>
} & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = state => ({
  events: selectFilteredEvents(state, true),
  stagedCategories: state.eventFilters.stagedFilters.categories
});

const mapDispatchToProps = {
  onApplyFilters: () => commitEventFilters(),
  onFiltersChange: (categories: Set<string>) =>
    stageEventFilters({ categories: new Set(categories) }),
  onClearAll: () => stageEventFilters({ categories: new Set() }),
  onClose: () => clearStagedEventFilters()
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
