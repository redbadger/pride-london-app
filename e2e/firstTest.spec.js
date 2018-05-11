const { takeScreenshot } = require("./helpers");

describe("Pride App", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id("home-screen")))
      .toExist()
      .withTimeout(200000);
  });

  afterEach(async () => {
    await takeScreenshot();
  });

  it("should start on Home page", async () => {
    const homeScreen = element(by.id("home-screen"));
    await expect(homeScreen).toBeVisible();
  });

  it("should navigate to Events tab", async () => {
    const eventsTabButton = element(by.id("events-tab-button"));
    await expect(eventsTabButton).toBeVisible();
    await element(by.id("events-tab-button")).tap();
    await expect(element(by.id("event-filter-header"))).toBeVisible();
  });

  it("should navigate to Parade tab", async () => {
    const paradeTabButton = element(by.id("parade-tab-button"));
    await expect(paradeTabButton).toBeVisible();
    await paradeTabButton.tap();
    await expect(element(by.id("page-heading-parade"))).toBeVisible();
  });

  it("should navigate to Saved Events tab", async () => {
    const savedEventsTabButton = element(by.id("saved-events-tab-button"));
    await expect(savedEventsTabButton).toBeVisible();
    await savedEventsTabButton.tap();
    await expect(element(by.id("page-heading-saved-events"))).toBeVisible();
  });

  it("should navigate to Support Us tab", async () => {
    const supportUsTabButton = element(by.id("support-us-tab-button"));
    await expect(supportUsTabButton).toBeVisible();
    await supportUsTabButton.tap();
    await expect(element(by.id("page-heading-support-us"))).toBeVisible();
  });
});
