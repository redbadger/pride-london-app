// @flow

const getAccessibiltyLabel = (
  label: string,
  placeholder: ?string,
  value: ?string,
  focused: boolean,
  selection: ?{ start: number, end: number } // eslint-disable-line no-unused-vars
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

  if (descriptionParts.length > 0) {
    return `${labelParts.join(", ")}; ${descriptionParts.join(", ")}`;
  }

  return labelParts.join(", ");
};

export default getAccessibiltyLabel;
