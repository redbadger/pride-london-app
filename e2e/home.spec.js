describe("e2e/home", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should start on Home screen", async () => {
    await expect(element(by.id("home-screen"))).toBeVisible();
  });

  it("should navigate to Support Us screen on button tap", async () => {
    await element(by.id("home-header-support-us-button")).tap();
    await expect(element(by.id("page-heading-support-us"))).toBeVisible();
  });

  it("should navigate to given event details screen on tap", async () => {
    await expect(element(by.id("event-tile-0"))).toBeVisible();
    await element(by.id("event-tile-0")).tap();
    await expect(element(by.id("event-details-screen"))).toBeVisible();
  });

  it("should navigate to Home tab", async () => {
    // Navigate to any other screen
    await element(by.id("support-us-tab-button")).tap();

    // Check that navigation to home screen works
    await element(by.id("home-tab-button")).tap();
    await expect(element(by.id("home-screen"))).toBeVisible();
  });
});
