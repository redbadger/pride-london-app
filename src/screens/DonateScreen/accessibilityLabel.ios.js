// @flow

const getAccessibiltyLabel = (
  label: string,
  placeholder: ?string,
  value: ?string,
  focused: boolean,
  selection: ?{ start: number, end: number }
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

    const insertionPoint = selection && selection.start > 0 ? "end" : "start";
    labelParts.push(`insertion point at ${insertionPoint}`);
  } else {
    if (value) {
      labelParts.push(value);
    } else if (placeholder) {
      labelParts.push(placeholder);
    }

    labelParts.push("text field");

    descriptionParts.push("double tap to edit");
  }

  if (descriptionParts.length > 0) {
    return `${labelParts.join(", ")}; ${descriptionParts.join(", ")}`;
  }

  return labelParts.join(", ");
};

export default getAccessibiltyLabel;
