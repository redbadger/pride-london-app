// @flow

const getAccessibiltyLabel = (
  label: string,
  placeholder: ?string,
  value: ?string,
  focused: boolean
) => {
  const labelParts = [];
  if (focused) {
    labelParts.push("editing");
  }

  if (value) {
    labelParts.push(value);
  }

  labelParts.push("edit box");
  labelParts.push(label);

  const descriptionParts = [];
  if (!focused) {
    descriptionParts.push("double tap to enter text");
  } else {
    descriptionParts.push("double tap and hold to long press");
  }

  return [labelParts.join(", "), descriptionParts.join(", ")].join("; ");
};

export default getAccessibiltyLabel;
