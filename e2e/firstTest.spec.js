const { takeScreenshot } = require("./helpers");

describe("Pride App", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(async () => {
    await takeScreenshot();
  });

  it("should start on Home screen", async () => {
    await expect(element(by.id("home-screen"))).toBeVisible();
  });

  it("should navigate to Events tab", async () => {
    await element(by.id("events-tab-button")).tap();
    await expect(element(by.id("event-filter-header"))).toBeVisible();
  });

  it("should navigate to Parade tab", async () => {
    await element(by.id("parade-tab-button")).tap();
    await expect(element(by.id("page-heading-parade"))).toBeVisible();
  });

  it("should navigate to Saved Events tab", async () => {
    await element(by.id("saved-events-tab-button")).tap();
    await expect(element(by.id("page-heading-saved-events"))).toBeVisible();
  });

  it("should navigate to Support Us tab", async () => {
    await element(by.id("support-us-tab-button")).tap();
    await expect(element(by.id("page-heading-support-us"))).toBeVisible();
  });
});
