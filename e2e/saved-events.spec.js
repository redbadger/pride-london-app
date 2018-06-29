describe("e2e/saved-events", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should display the empty saved events screen by default", async () => {
    await element(by.id("saved-events-tab-button")).tap();
    await expect(element(by.id("page-heading-saved-events"))).toBeVisible();

    await expect(element(by.text("Where's the love?"))).toBeVisible();

    await element(by.id("no-saved-events-button")).tap();

    await expect(element(by.id("event-filter-header"))).toBeVisible();
  });

  it("should display saved events", async () => {
    await element(by.id("events-tab-button")).tap();
    await element(by.id("event-card-0-0-save-event-button")).tap();

    await element(by.id("saved-events-tab-button")).tap();

    await expect(element(by.id("saved-event-list"))).toBeVisible();
    await expect(
      element(by.id("event-card-0-0").withAncestor(by.id("saved-event-list")))
    ).toBeVisible();
  });
});
