// @flow
import type { Dispatch } from "redux";
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
