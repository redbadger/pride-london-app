// @flow

const getAccessibiltyLabel = (
  label: string,
  placeholder: ?string,
  value: ?string,
  focused: boolean
) => {
  const labelParts = [];
  const descriptionParts = [];

  labelParts.push(label);

  if (focused) {
    labelParts.push("text field");
    labelParts.push("is editing");

    if (value) {
      labelParts.push(value);
    } else if (placeholder) {
      labelParts.push(placeholder);
    }

    labelParts.push("insertion point at START/END");
  } else {
    if (value) {
      labelParts.push(value);
    } else if (placeholder) {
      labelParts.push(placeholder);
    }

    labelParts.push("text field");

    descriptionParts.push("double tap to edit");
  }

  return [labelParts.join(", "), descriptionParts.join(", ")].join("; ");
};

export default getAccessibiltyLabel;
