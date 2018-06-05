// @flow
/* eslint-disable import/prefer-default-export */

export const hyphenate = (text: string): string =>
  text
    .toLowerCase()
    .split(" ")
    .join("-");
