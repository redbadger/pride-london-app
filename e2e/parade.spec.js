describe("e2e/parade", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should display the map by default", async () => {
    await element(by.id("parade-tab-button")).tap();

    await expect(element(by.id("page-heading-parade"))).toBeVisible();
    await expect(element(by.id("parade-map-screen"))).toBeVisible();
  });

  it("should navigate to the parade information tab", async () => {
    await element(by.id("parade-tab-button")).tap();

    await element(by.id("parade-groups-button")).tap();

    await expect(element(by.id("parade-groups-screen"))).toBeVisible();
  });

  it("should navigate back to map tab", async () => {
    await element(by.id("parade-tab-button")).tap();

    await element(by.id("parade-groups-button")).tap();
    await element(by.id("parade-map-button")).tap();

    await expect(element(by.id("parade-map-screen"))).toBeVisible();
  });
});
