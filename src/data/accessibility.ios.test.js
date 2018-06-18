import { checkboxAccessibilityLabel } from "./accessibility.ios";

describe("checkboxAccessibilityLabel", () => {
  it("indicates label of checkbox", () => {
    const result = checkboxAccessibilityLabel("label");
    expect(result).toBe("label");
  });
});
