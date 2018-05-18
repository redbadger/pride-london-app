// @flow

const checkboxAccessibilityLabel = (label: string, checked: boolean) =>
  checked ? `${label}, checkbox, selected` : `${label}, checkbox, empty`;

export default checkboxAccessibilityLabel;
