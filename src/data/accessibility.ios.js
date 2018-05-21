// @flow

// eslint-disable-next-line import/prefer-default-export
export const checkboxAccessibilityLabel = (label: string, checked: boolean) =>
  checked ? `${label}, checkbox, selected` : `${label}, checkbox, empty`;
