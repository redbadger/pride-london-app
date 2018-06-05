const { takeScreenshot } = require("./helpers");

describe("e2e/home", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(async () => {
    await takeScreenshot();
  });

  it("should start on Home screen", async () => {
    await expect(element(by.id("home-screen"))).toBeVisible();
  });

  it("should navigate to Support Us screen on button tap", async () => {
    await element(by.id("home-header-support-us-button")).tap();
    await expect(element(by.id("page-heading-support-us"))).toBeVisible();
  });

  it("should display featured events", async () => {
    await expect(element(by.id("event-tile-0"))).toBeVisible();
  });

  it("should navigate to given event details screen on tap", async () => {
    await element(by.id("event-tile-0")).tap();
    await expect(element(by.id("event-details-screen"))).toBeVisible();
  });
});
