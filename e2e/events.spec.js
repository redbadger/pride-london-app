const { formatDateRange } = require("../src/data/formatters");

const formattedDateNumber = num => (num < 10 ? `0${num}` : num);

const today = new Date();
const thisDay = today.getDate();
const thisMonth = today.getMonth() + 1;
const thisYear = today.getFullYear();
const lastDayOfMonth = new Date(thisYear, thisMonth, 0).getDate();

const formattedDay = formattedDateNumber(thisDay);
const formattedLastDay = formattedDateNumber(lastDayOfMonth);
const formattedMonth = formattedDateNumber(thisMonth);

const dateRange = {
  startDate: `${thisYear}-${formattedMonth}-${formattedDay}`,
  endDate: `${thisYear}-${formattedMonth}-${formattedLastDay}`
};

describe("e2e/events", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should display events", async () => {
    await element(by.id("events-tab-button")).tap();

    await expect(element(by.id("event-filter-header"))).toBeVisible();
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
    await element(
      by.id(`calendar-day-${thisYear}-${thisMonth}-${thisDay}`)
    ).tap();
    await element(
      by.id(`calendar-day-${thisYear}-${thisMonth}-${lastDayOfMonth}`)
    ).tap();
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
