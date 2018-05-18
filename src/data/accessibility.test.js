import checkboxAccessibilityLabel from "./accessibility";

describe("checkboxAccessibilityLabel", () => {
  it("indicates status of checkbox", () => {
    const result = checkboxAccessibilityLabel("label", true);
    expect(result).toBe("label, checkbox, selected");
    const result2 = checkboxAccessibilityLabel("label", false);
    expect(result2).toBe("label, checkbox, empty");
  });
});
