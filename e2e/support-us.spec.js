describe("e2e/support-us", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should display links to relevant sections", async () => {
    await element(by.id("support-us-tab-button")).tap();
    await expect(element(by.id("page-heading-support-us"))).toBeVisible();

    await expect(element(by.id("support-us-donate-button"))).toBeVisible();
    await expect(element(by.id("support-us-volunteer-button"))).toBeVisible();
    await expect(element(by.id("support-us-merchandise-button"))).toBeVisible();

    await element(by.id("support-us-main-content")).scrollTo("bottom");
    await expect(element(by.id("support-us-sponsor-button"))).toBeVisible();
  });

  it("should navigate to the Donate screen", async () => {
    await element(by.id("support-us-tab-button")).tap();

    await element(by.id("support-us-donate-button")).tap();

    await expect(element(by.id("donate-screen"))).toBeVisible();
  });

  it("should navigate to the Sponsor screen", async () => {
    await element(by.id("support-us-tab-button")).tap();

    await element(by.id("support-us-main-content")).scrollTo("bottom");
    await element(by.id("support-us-sponsor-button")).tap();

    await expect(element(by.id("sponsor-screen"))).toBeVisible();
  });
});
