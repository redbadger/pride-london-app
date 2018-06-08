const { takeScreenshot } = require("./helpers");

describe("e2e/support-us", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(async () => {
    await takeScreenshot();
  });

  it("should display links to relevant sections", async () => {
    await element(by.id("support-us-tab-button")).tap();

    await expect(element(by.id("support-us-donate-button"))).toBeVisible();
    await expect(element(by.id("support-us-volunteer-button"))).toBeVisible();
    await expect(element(by.id("support-us-merchandise-button"))).toBeVisible();

    await element(by.id("support-us-main-content")).scrollTo("bottom");
    await expect(element(by.id("support-us-partner-button"))).toBeVisible();
  });

  it("should navigate to the Donate screen", async () => {
    await element(by.id("support-us-tab-button")).tap();

    await element(by.id("support-us-donate-button")).tap();

    await expect(element(by.id("donate-screen"))).toBeVisible();
  });

  it("should navigate to the Partner screen", async () => {
    await element(by.id("support-us-tab-button")).tap();

    await element(by.id("support-us-main-content")).scrollTo("bottom");
    await element(by.id("support-us-partner-button")).tap();

    await expect(element(by.id("partner-screen"))).toBeVisible();
  });
});
