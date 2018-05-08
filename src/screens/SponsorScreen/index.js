// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import type { Sponsor } from "../../data/sponsor";
import type { FieldRef } from "../../data/field-ref";
import getAssetSource from "../../data/get-asset-source";
import type { ImageSource } from "../../data/get-asset-source";
import { selectAssetById } from "../../selectors/events";
import { selectSponsors } from "../../selectors/sponsors";
import Component from "./component";

type OwnProps = {
  navigation: NavigationScreenProp<NavigationState>
};

type Props = {
  sponsors: Sponsor[],
  getAssetSource: FieldRef => ImageSource
} & OwnProps;

const mapStateToProps = state => ({
  sponsors: selectSponsors(state),
  getAssetSource: getAssetSource(id => selectAssetById(state, id))
});

const mapDispatchToProps = {};

const connector: Connector<OwnProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
