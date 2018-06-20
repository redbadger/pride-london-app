// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { State } from "../../reducers";
import type { EventCategoryName } from "../../data/event";
import { setEventFilters } from "../../actions/event-filters";
import { selectStagedFilteredEvents } from "../../selectors";
import Component from "./component";
import withIsFocused from "../../components/WithIsFocused";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>,
  isFocused: boolean
};

type StateProps = {
  navigation: NavigationScreenProp<NavigationState>,
  categories: Set<EventCategoryName>,
  numberOfEvents: number
};

type DispatchProps = {
  toggleCategoryFilter: (Set<EventCategoryName>, string) => void,
  onClearAll: () => void
};

type Props = StateProps & DispatchProps;

let cache: StateProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation, isFocused }: OwnProps
): StateProps => {
  if (!cache || isFocused) {
    cache = {
      navigation,
      numberOfEvents: selectStagedFilteredEvents(state).length,
      categories: state.eventFilters.selectedFilters.categories
    };
  }
  return cache;
};

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

export const Container = connector(Component);

export default withIsFocused(Container);
