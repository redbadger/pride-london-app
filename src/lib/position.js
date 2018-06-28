// @flow
/* eslint-disable import/prefer-default-export */

export const getCurrentPosition = options =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
