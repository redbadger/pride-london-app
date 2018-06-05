const { takeScreenshot } = require("./helpers");
const { formatDateRange } = require("../src/data/formatters");

const today = new Date();
const thisMonth = today.getMonth() + 1;
const formattedMonth = thisMonth < 10 ? `0${thisMonth}` : thisMonth;
const thisYear = today.getFullYear();

const dateRange = {
  startDate: `${thisYear}-${formattedMonth}-01`,
  endDate: `${thisYear}-${formattedMonth}-28`
};

describe("e2e/events", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(async () => {
    await takeScreenshot();
  });

  it("should display events", async () => {
    await element(by.id("events-tab-button")).tap();

    await expect(element(by.id("event-card-0-0"))).toBeVisible();
  });

  it("should navigate to given event details screen on tap", async () => {
    await element(by.id("events-tab-button")).tap();

    await element(by.id("event-card-0-0")).tap();
    await expect(element(by.id("event-details-screen"))).toBeVisible();
  });

  it("should filter events by category", async () => {
    await element(by.id("events-tab-button")).tap();

    await element(by.id("open-category-filters-button")).tap();
    await expect(element(by.text("All events"))).toBeVisible();

    await element(
      by.id("categories-filter-list-item-cabaret-and-variety")
    ).tap();
    await element(by.id("apply-category-filter-button")).tap();

    await expect(
      element(by.id("category-pill-cabaret-and-variety"))
    ).toBeVisible();
    await expect(element(by.id("event-card-0-0"))).toBeVisible();
  });

  it("should filter events by date", async () => {
    await element(by.id("events-tab-button")).tap();

    await element(by.id("open-date-filters-button")).tap();
    await element(by.id(`calendar-day-${thisYear}-${thisMonth}-1`)).tap();
    await element(by.id(`calendar-day-${thisYear}-${thisMonth}-28`)).tap();
    await element(by.id("apply-date-filter-button")).tap();

    await expect(element(by.text(formatDateRange(dateRange)))).toBeVisible();
    await expect(element(by.id("event-card-0-0"))).toBeVisible();
  });

  it("should filter events by area", async () => {
    await element(by.id("events-tab-button")).tap();

    await element(by.id("open-area-and-price-filters-button")).tap();
    await element(by.text("Central")).tap();
    await element(by.id("apply-area-and-price-filter-button")).tap();

    await expect(element(by.id("number-badge"))).toHaveText("1");
    await expect(element(by.id("event-card-0-0"))).toBeVisible();
  });
});
