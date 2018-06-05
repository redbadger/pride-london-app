// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import type { State } from "../../reducers";
import type { Event } from "../../data/event-deprecated";
import type { FieldRef } from "../../data/field-ref";
import type { ImageSource } from "../../data/get-asset-source";
import type { HeaderBanner } from "../../data/header-banner";
import getAssetSource from "../../data/get-asset-source";
import strings from "../../constants/strings";
import {
  selectFeaturedEventsByTitle,
  selectEventsLoading,
  selectAssetById
} from "../../selectors/events";
import { selectHeaderBanners } from "../../selectors/header-banner";
import Component from "./component";

type StateProps = {
  headerBanners: HeaderBanner[],
  featuredEventsTitle: string,
  featuredEvents: Event[],
  loading: boolean,
  getAssetSource: FieldRef => ImageSource
};

type Props = StateProps;

// Note we must add a return type here for react-redux connect to work
// with flow correctly. If not provided is silently fails if types do
// not line up. See https://github.com/facebook/flow/issues/5343
const mapStateToProps = (state: State): StateProps => ({
  headerBanners: selectHeaderBanners(state),
  featuredEventsTitle: strings.featuredEventsTitle,
  featuredEvents: selectFeaturedEventsByTitle(
    state,
    strings.featuredEventsTitle
  ),
  loading: selectEventsLoading(state),
  getAssetSource: getAssetSource(id => selectAssetById(state, id))
});

const mapDispatchToProps = {};

const connector: Connector<StateProps, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(Component);
