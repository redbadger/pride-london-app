// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Sponsor } from "../../data/sponsor";
import type { LocalizedFieldRef } from "../../data/localized-field-ref";
import getAssetUrl from "../../data/get-asset-url";
import getAssetSize from "../../data/get-asset-size";
import { selectAssetById } from "../../selectors/events";
import { selectSponsors } from "../../selectors/sponsors";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type Props = {
  sponsors: Sponsor[],
  getAssetUrl: LocalizedFieldRef => string,
  getAssetSize: LocalizedFieldRef => { width: number, height: number }
} & OwnProps;

const mapStateToProps = state => ({
  sponsors: selectSponsors(state),
  getAssetUrl: getAssetUrl(id => selectAssetById(state, id)),
  getAssetSize: getAssetSize(id => selectAssetById(state, id))
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
