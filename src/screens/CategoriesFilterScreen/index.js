// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { State } from "../../reducers";
import type { Event, EventCategoryName } from "../../data/event-deprecated";
import { setEventFilters } from "../../actions/event-filters";
import { selectStagedFilteredEvents } from "../../selectors";
import Component from "./component";
import text from "../../constants/text";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type StateProps = {
  navigation: NavigationScreenProp<NavigationState>,
  events: Event[],
  categories: Set<EventCategoryName>,
  applyButtonText: string
};

type DispatchProps = {
  toggleCategoryFilter: (Set<EventCategoryName>, string) => void,
  onClearAll: () => void
};

type Props = StateProps & DispatchProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation }: OwnProps
): StateProps => {
  const events = selectStagedFilteredEvents(state);
  return {
    navigation,
    events,
    categories: state.eventFilters.selectedFilters.categories,
    applyButtonText: text.filterPickerApply(events.length)
  };
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

export default connector(Component);
