// @flow
import type { Dispatch } from "redux";
import { getCmsData, updateCmsData } from "../integrations/cms";
import type { SavedData } from "../integrations/cms";

export type DataAction =
  | { type: "REQUEST_CMS_DATA" }
  | {
      type: "RECEIVE_CMS_DATA",
      data: SavedData
    }
  | { type: "REQUEST_UPDATE_CMS_DATA" };

export const getData = (
  hideSplashScreen: ?Function,
  getCmsDataFn: typeof getCmsData = getCmsData
) => async (dispatch: Dispatch<DataAction>) => {
  dispatch({
    type: "REQUEST_CMS_DATA"
  });

  const cmsData = await getCmsDataFn();

  dispatch({
    type: "RECEIVE_CMS_DATA",
    data: cmsData
  });

  // This feels quite dirty.
  // Once we have a proper splash screen, we can coordinate the
  // event loading and splash screen hiding better.
  if (hideSplashScreen) {
    hideSplashScreen();
  }
};

export const backgroundRefreshData = (
  updateCmsDataFn: typeof updateCmsData = updateCmsData
) => async (dispatch: Dispatch<DataAction>) => {
  const cmsData = await updateCmsDataFn();

  if (cmsData.updated) {
    // We can change this to visually notify
    // the user of new content and give them
    // the choice to explicitly load it, rather than
    // refreshing content under their hands.
    // This would be a new action type
    dispatch({
      type: "RECEIVE_CMS_DATA",
      data: cmsData
    });
  }
};

export const updateData = (
  updateCmsDataFn: typeof updateCmsData = updateCmsData
) => async (dispatch: Dispatch<DataAction>) => {
  dispatch({
    type: "REQUEST_UPDATE_CMS_DATA"
  });

  const cmsData = await updateCmsDataFn();

  dispatch({
    type: "RECEIVE_CMS_DATA",
    data: cmsData
  });
};
