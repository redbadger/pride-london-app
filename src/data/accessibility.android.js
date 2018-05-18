// @flow

const checkboxAccessibilityLabel = (label: string, checked: boolean) =>
  checked ? `checked checkbox, ${label}` : `not checked checkbox, ${label}`;

export default checkboxAccessibilityLabel;
