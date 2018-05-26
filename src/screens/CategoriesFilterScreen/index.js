// @flow
import { connect } from "react-redux";
import type { Connector, MapStateToProps } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import { setEventFilters } from "../../actions/event-filters";
import type { State } from "../../reducers";
import { selectFilteredEvents } from "../../selectors/events";
import Component from "./component";
import type { Props as ComponentProps } from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<*>
};

type Props = ComponentProps & OwnProps;

const mapStateToProps: MapStateToProps<State, OwnProps, *> = state => ({
  events: selectFilteredEvents(state, true),
  categories: state.eventFilters.selectedFilters.categories
});

const mapDispatchToProps = {
  toggleCategoryFilter: (originalCagegories, categoryLabel) => {
    const categories = new Set(originalCagegories);
    if (!categories.delete(categoryLabel)) categories.add(categoryLabel);
    return setEventFilters({ categories });
  },
  onClearAll: () => setEventFilters({ categories: new Set() })
};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
