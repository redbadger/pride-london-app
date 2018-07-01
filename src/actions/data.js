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
  | { type: "REQUEST_UPDATE_CMS_DATA" }
  | { type: "NO_DATA_RECEIVED" };

/**
 * Loads data from local storage and falls back to asking
 * the CMS if no local data exists.
 *
 * This is supposed to be used when the app starts to show
 * content as fast as possible.
 */
export const getData = (getCmsDataFn: typeof getCmsData = getCmsData) => async (
  dispatch: Dispatch<DataAction>
) => {
  dispatch({
    type: "REQUEST_CMS_DATA"
  });

  try {
    const cmsData = await getCmsDataFn();
    dispatch({
      type: "RECEIVE_CMS_DATA",
      data: cmsData
    });
  } catch (e) {
    dispatch({
      type: "NO_DATA_RECEIVED"
    });
  }
};

/**
 * Refreshes data from CMS. This is supposed to be called
 * automatically in the background without distracting the
 * user.
 */
export const backgroundRefreshData = (
  updateCmsDataFn: typeof updateCmsData = updateCmsData
) => async (dispatch: Dispatch<DataAction>) => {
  try {
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
  } catch (e) {
    // We didn't notify the user when the refresh started,
    // so we don't want to notify when it fails, either.
  }
};

/**
 * Refreshes data from CMS. This is supposed to be called
 * when the user actively chooses to refreshes data. In this
 * case we probably want to give feedback about the status
 * of the refresh.
 */
export const updateData = (
  updateCmsDataFn: typeof updateCmsData = updateCmsData
) => async (dispatch: Dispatch<DataAction>) => {
  dispatch({
    type: "REQUEST_UPDATE_CMS_DATA"
  });

  try {
    const cmsData = await updateCmsDataFn();
    dispatch({
      type: "RECEIVE_CMS_DATA",
      data: cmsData
    });
  } catch (e) {
    dispatch({
      type: "NO_DATA_RECEIVED"
    });
  }
};
