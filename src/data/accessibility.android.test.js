import { checkboxAccessibilityLabel } from "./accessibility.android";

describe("checkboxAccessibilityLabel", () => {
  it("indicates status of checkbox", () => {
    const result = checkboxAccessibilityLabel("label", true);
    expect(result).toBe("checked checkbox, label");
    const result2 = checkboxAccessibilityLabel("label", false);
    expect(result2).toBe("not checked checkbox, label");
  });
});