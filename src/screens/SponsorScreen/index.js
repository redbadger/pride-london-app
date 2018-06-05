// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { State } from "../../reducers";
import type { Sponsor } from "../../data/sponsor";
import { getImageDetails } from "../../data/image";
import type { ImageDetails } from "../../data/image";
import { selectSponsors } from "../../selectors/sponsors";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type Props = {
  sponsors: Sponsor[],
  getImageDetails: string => ?ImageDetails
} & OwnProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State, { navigation }: OwnProps): Props => ({
  sponsors: selectSponsors(state),
  getImageDetails: getImageDetails(state.data.images),
  navigation
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
