describe("Pride App", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should start on events tab", async () => {
    await expect(element(by.id("home-screen"))).toBeVisible();
  });

  it("should navigate to Events tab", async () => {
    const eventsTabButton = element(by.id("events-tab-button"));
    await expect(eventsTabButton).toBeVisible();
    await eventsTabButton.tap();
    await expect(element(by.id("filter-header"))).toBeVisible();
  });
});
