// @flow
/* eslint-disable import/prefer-default-export */
import type { Coordinates } from "../constants/parade-coordinates";

export type PositionRequestOptions = {
  enableHighAccuracy: boolean,
  timeout: number,
  maximumAge: number
};

export const getCurrentPosition = (
  options: PositionRequestOptions
): Promise<Coordinates> =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      reject,
      options
    )
  );
