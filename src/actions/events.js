// @flow
import type { Dispatch } from "redux";
import SplashScreen from "react-native-splash-screen";
import { getCmsData, updateCmsData } from "../integrations/cms";
import type { SavedData } from "../integrations/cms";
import type { StandardAction } from "./";

type CmsActionType =
  | "REQUEST_CMS_DATA"
  | "RECEIVE_CMS_DATA"
  | "REQUEST_UPDATE_CMS_DATA";

export type CmsAction = StandardAction<CmsActionType, SavedData>;

export const getEvents = (
  getCmsDataFn: typeof getCmsData = getCmsData
) => async (dispatch: Dispatch<CmsAction>) => {
  dispatch({
    type: "REQUEST_CMS_DATA"
  });

  const cmsData = await getCmsDataFn();

  dispatch({
    type: "RECEIVE_CMS_DATA",
    payload: cmsData
  });

  // This feels quite dirty.
  // Once we have a proper splash screen, we can coordinate the
  // event loading and splash screen hiding better.
  if (SplashScreen) {
    SplashScreen.hide();
  }
};

export const backgroundRefreshEvents = (
  updateCmsDataFn: typeof updateCmsData = updateCmsData
) => async (dispatch: Dispatch<CmsAction>) => {
  const cmsData = await updateCmsDataFn();

  if (cmsData.updated) {
    // We can change this to visuall notify
    // the user of new content and give them
    // the choice to explicitly load it, rather than
    // refreshing content under their hands.
    // This would be a new action type
    dispatch({
      type: "RECEIVE_CMS_DATA",
      payload: cmsData
    });
  }
};

export const updateEvents = (
  updateCmsDataFn: typeof updateCmsData = updateCmsData
) => async (dispatch: Dispatch<CmsAction>) => {
  dispatch({
    type: "REQUEST_UPDATE_CMS_DATA"
  });

  const cmsData = await updateCmsDataFn();

  dispatch({
    type: "RECEIVE_CMS_DATA",
    payload: cmsData
  });
};
