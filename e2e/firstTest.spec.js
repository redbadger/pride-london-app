const { takeScreenshot } = require("./helpers");

describe("Pride App", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await waitFor(element(by.id("events-tab-button")))
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
    await eventsTabButton.tap();
    await expect(element(by.id("filter-header"))).toBeVisible();
  });
});
