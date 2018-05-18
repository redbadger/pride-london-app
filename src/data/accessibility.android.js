// @flow

// eslint-disable-next-line import/prefer-default-export
export const checkboxAccessibilityLabel = (label: string, checked: boolean) =>
  checked ? `checked checkbox, ${label}` : `not checked checkbox, ${label}`;
