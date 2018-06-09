// @flow
import {
  generateCMSEvent,
  generateCMSEventMinimum,
  generateEvent,
  sampleOne
} from "./__test-data";
import { decodeEvent, expandRecurringEvents } from "./event";

describe("Event", () => {
  describe("decoder", () => {
    it("correctly decodes valid CMS event with all fields", () => {
      const data: mixed = sampleOne(generateCMSEvent);

      const decoded = decodeEvent("en-GB")(data);
      expect(decoded.ok).toEqual(true);
      if (decoded.ok) {
        expect(decoded.value).toMatchSnapshot();
      }
    });

    it("correctly decodes valid CMS event with minimum fields", () => {
      const data: mixed = sampleOne(generateCMSEventMinimum);

      const decoded = decodeEvent("en-GB")(data);
      expect(decoded.ok).toEqual(true);
      if (decoded.ok) {
        expect(decoded.value).toMatchSnapshot();
      }
    });

    it("fails if a property is missing", () => {
      const data: mixed = {
        fields: {},
        sys: {
          id: "3O3SZPgYl2MUEWu2MoK2oi",
          contentType: {
            sys: {
              id: "event"
            }
          }
        }
      };

      const decoded = decodeEvent("en-GB")(data);
      expect(decoded.ok).toEqual(false);
    });
  });

  describe("expandRecurringEvents", () => {
    it("creates new events for each recurrence date", () => {
      const event = sampleOne(generateEvent);
      event.id = "test";
      event.fields.startTime = "2018-08-02T00:00+00:00";
      event.fields.endTime = "2018-08-02T03:00+00:00";
      event.fields.recurrenceDates = ["03/08/2018", "04/08/2018"];

      const expandedEvents = expandRecurringEvents(event);

      expect(expandedEvents.length).toEqual(3);
      expect(expandedEvents[0]).toEqual(event);
      expect(expandedEvents[1].id).toEqual("test-recurrence-03/08/2018");
      expect(expandedEvents[1].fields.startTime).toEqual(
        "2018-08-03T00:00+00:00"
      );
      expect(expandedEvents[1].fields.recurrenceDates).toEqual([
        "02/08/2018",
        "03/08/2018",
        "04/08/2018"
      ]);
      expect(expandedEvents[2].id).toEqual("test-recurrence-04/08/2018");
      expect(expandedEvents[2].fields.startTime).toEqual(
        "2018-08-04T00:00+00:00"
      );
      expect(expandedEvents[2].fields.recurrenceDates).toEqual([
        "02/08/2018",
        "03/08/2018",
        "04/08/2018"
      ]);
    });

    it("creates new events for short format recurrence dates", () => {
      const event = sampleOne(generateEvent);
      event.id = "test";
      event.fields.startTime = "2018-08-02T00:00+00:00";
      event.fields.endTime = "2018-08-02T03:00+00:00";
      event.fields.recurrenceDates = ["3/8/2018", "4/8/2018"];

      const expandedEvents = expandRecurringEvents(event);

      expect(expandedEvents.length).toEqual(3);
      expect(expandedEvents[0]).toEqual(event);
      expect(expandedEvents[1].id).toEqual("test-recurrence-03/08/2018");
      expect(expandedEvents[1].fields.startTime).toEqual(
        "2018-08-03T00:00+00:00"
      );
      expect(expandedEvents[1].fields.recurrenceDates).toEqual([
        "02/08/2018",
        "3/8/2018",
        "4/8/2018"
      ]);
      expect(expandedEvents[2].id).toEqual("test-recurrence-04/08/2018");
      expect(expandedEvents[2].fields.startTime).toEqual(
        "2018-08-04T00:00+00:00"
      );
      expect(expandedEvents[1].fields.recurrenceDates).toEqual([
        "02/08/2018",
        "3/8/2018",
        "4/8/2018"
      ]);
    });

    it("updates endTime to be same distance from startTime", () => {
      const event = sampleOne(generateEvent);
      event.id = "test";
      event.fields.startTime = "2018-08-02T00:00+00:00";
      event.fields.endTime = "2018-08-02T03:00+00:00";
      event.fields.recurrenceDates = ["03/08/2018"];

      const expandedEvents = expandRecurringEvents(event);

      expect(expandedEvents[1].fields.endTime).toEqual(
        "2018-08-03T03:00+00:00"
      );
    });

    it("preserves timezone of startTime and endTime", () => {
      const event = sampleOne(generateEvent);
      event.fields.startTime = "2018-04-19T23:00+14:00";
      event.fields.endTime = "2018-04-20T14:48+02:00";
      event.fields.recurrenceDates = ["25/04/2018"];

      const expandedEvents = expandRecurringEvents(event);

      expect(expandedEvents[1].fields.startTime).toEqual(
        "2018-04-25T23:00+14:00"
      );
      expect(expandedEvents[1].fields.endTime).toEqual(
        "2018-04-26T14:48+02:00"
      );
    });

    it("does not create new events recurrence is on the same day as start date", () => {
      const event = sampleOne(generateEvent);
      event.id = "test";
      event.fields.startTime = "2018-08-02T00:00+00:00";
      event.fields.endTime = "2018-08-02T03:00+00:00";
      event.fields.recurrenceDates = [
        "02/08/2018",
        "2/8/2018",
        "2/08/2018",
        "02/8/2018"
      ];

      const expandedEvents = expandRecurringEvents(event);

      expect(expandedEvents.length).toEqual(1);
      expect(expandedEvents[0]).toEqual(event);
    });
  });
});
