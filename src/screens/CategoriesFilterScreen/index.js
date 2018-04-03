// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import { updateEventFilters } from "../../actions/event-filters";
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
  events: selectFilteredEvents(state)
});

const mapDispatchToProps = {
  onFiltersChange: (categories: Array<string>) =>
    updateEventFilters({ categories: new Set(categories) }),
  onClearAll: () => updateEventFilters({ categories: new Set() })
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
