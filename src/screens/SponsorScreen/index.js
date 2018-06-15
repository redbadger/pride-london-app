// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { State } from "../../reducers";
import type { Sponsor } from "../../data/sponsor";
import { selectSponsors } from "../../selectors/sponsors";
import Component from "./component";
import withIsFocused from "../../components/WithIsFocused";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>,
  isFocused: boolean
};

type Props = {
  sponsors: Sponsor[],
  navigation: NavigationScreenProp<NavigationState>
};

let cache: Props;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (
  state: State,
  { navigation, isFocused }: OwnProps
): Props => {
  if (!cache || isFocused) {
    cache = {
      sponsors: selectSponsors(state),
      navigation
    };
  }
  return cache;
};

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export const Container = connector(Component);

export default withIsFocused(Container);
