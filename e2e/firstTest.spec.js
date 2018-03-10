describe("Pride App", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should start on events tab", async () => {
    await expect(element(by.id("filter-header"))).toBeVisible();
  });

  it("should navigate to Home tab", async () => {
    const homeTabButton = element(by.id("home-tab-button"));
    await expect(homeTabButton).toBeVisible();
    await homeTabButton.tap();
    await expect(element(by.id("home-screen"))).toBeVisible();
  });
});
