const parse = require("./index");

// All inputs come into Zapier as strings
const createInput = () => ({
  name: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postcode: "",
  locationName: "",
  hasTickets: "",
  isEventPriceFree: "",
  eventPrice: "",
  eventPriceLow: "",
  eventPriceHigh: "",
  eventDescription: "",
  ticketingUrl: "",
  accessibilityOptions: "",
  eventCategories: "",
  audience: "",
  accessibilityDetails: "",
  email: "",
  phone: ""
});

describe("parse", () => {
  describe(".name", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.name = "";
      const output = parse(input);
      expect(output.fields.name["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.name = "Event Name";
      const output = parse(input);
      expect(output.fields.name["en-GB"]).toEqual("Event Name");
    });
  });

  describe(".addressLine1", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.addressLine1 = "";
      const output = parse(input);
      expect(output.fields.addressLine1["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.addressLine1 = "Address Line 1";
      const output = parse(input);
      expect(output.fields.addressLine1["en-GB"]).toEqual("Address Line 1");
    });
  });

  describe(".addressLine2", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.addressLine2 = "";
      const output = parse(input);
      expect(output.fields.addressLine2["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.addressLine2 = "Address Line 2";
      const output = parse(input);
      expect(output.fields.addressLine2["en-GB"]).toEqual("Address Line 2");
    });
  });

  describe(".city", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.city = "";
      const output = parse(input);
      expect(output.fields.city["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.city = "City";
      const output = parse(input);
      expect(output.fields.city["en-GB"]).toEqual("City");
    });
  });

  describe(".postcode", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.postcode = "";
      const output = parse(input);
      expect(output.fields.postcode["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.postcode = "SW1A 1AA";
      const output = parse(input);
      expect(output.fields.postcode["en-GB"]).toEqual("SW1A 1AA");
    });
  });

  describe(".locationName", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.locationName = "";
      const output = parse(input);
      expect(output.fields.locationName["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.locationName = "Event Location";
      const output = parse(input);
      expect(output.fields.locationName["en-GB"]).toEqual("Event Location");
    });
  });

  describe(".eventPriceLow and .eventPriceHigh", () => {
    it("returns 0 when .hasTickets is 'false'", () => {
      const input = createInput();
      input.hasTickets = "false";
      const output = parse(input);
      expect(output.fields.eventPriceLow["en-GB"]).toEqual(0);
      expect(output.fields.eventPriceHigh["en-GB"]).toEqual(0);
    });

    it("returns 0 when .isEventPriceFree is 'true'", () => {
      const input = createInput();
      input.hasTickets = "true";
      input.isEventPriceFree = "true";
      const output = parse(input);
      expect(output.fields.eventPriceLow["en-GB"]).toEqual(0);
      expect(output.fields.eventPriceHigh["en-GB"]).toEqual(0);
    });

    it("returns same value for both when eventPrice has a value", () => {
      const input = createInput();
      input.hasTickets = "true";
      input.eventPrice = "10.50";
      const output = parse(input);
      expect(output.fields.eventPriceLow["en-GB"]).toEqual(10.5);
      expect(output.fields.eventPriceHigh["en-GB"]).toEqual(10.5);
    });

    it("returns values for both when eventPriceLow and eventPriceHigh has a value", () => {
      const input = createInput();
      input.hasTickets = "true";
      input.eventPriceLow = "1.50";
      input.eventPriceHigh = "2.50";
      const output = parse(input);
      expect(output.fields.eventPriceLow["en-GB"]).toEqual(1.5);
      expect(output.fields.eventPriceHigh["en-GB"]).toEqual(2.5);
    });
  });

  describe(".eventDescription", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.eventDescription = "";
      const output = parse(input);
      expect(output.fields.eventDescription["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.eventDescription = "Event Description";
      const output = parse(input);
      expect(output.fields.eventDescription["en-GB"]).toEqual(
        "Event Description"
      );
    });
  });

  describe(".ticketingUrl", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.ticketingUrl = "";
      const output = parse(input);
      expect(output.fields.ticketingUrl["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.ticketingUrl = "https://prideinlondon.org";
      const output = parse(input);
      expect(output.fields.ticketingUrl["en-GB"]).toEqual(
        "https://prideinlondon.org"
      );
    });
  });

  describe(".accessibilityOptions", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.accessibilityOptions = "";
      const output = parse(input);
      expect(output.fields.accessibilityOptions["en-GB"]).toEqual([]);
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.accessibilityOptions = "Step free access, \nWheelchair Accessible";
      const output = parse(input);
      expect(output.fields.accessibilityOptions["en-GB"]).toEqual([
        "Step free access",
        "Wheelchair Accessible"
      ]);
    });
  });

  describe(".eventCategories", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.eventCategories = "";
      const output = parse(input);
      expect(output.fields.eventCategories["en-GB"]).toEqual([]);
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.eventCategories = "Cabaret and Variety, \nTalks and Debates";
      const output = parse(input);
      expect(output.fields.eventCategories["en-GB"]).toEqual([
        "Cabaret and Variety",
        "Talks and Debates"
      ]);
    });
  });

  describe(".audience", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.audience = "";
      const output = parse(input);
      expect(output.fields.audience["en-GB"]).toEqual([]);
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.audience = "Youth, \n16+";
      const output = parse(input);
      expect(output.fields.audience["en-GB"]).toEqual(["Youth", "16+"]);
    });
  });

  describe(".accessibilityDetails", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.accessibilityDetails = "";
      const output = parse(input);
      expect(output.fields.accessibilityDetails["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.accessibilityDetails = "Event Accessibility Details";
      const output = parse(input);
      expect(output.fields.accessibilityDetails["en-GB"]).toEqual(
        "Event Accessibility Details"
      );
    });
  });

  describe(".email", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.email = "";
      const output = parse(input);
      expect(output.fields.email["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.email = "test@prideinlondon.org";
      const output = parse(input);
      expect(output.fields.email["en-GB"]).toEqual("test@prideinlondon.org");
    });
  });

  describe(".phone", () => {
    it("is parsed when empty", () => {
      const input = createInput();
      input.phone = "";
      const output = parse(input);
      expect(output.fields.phone["en-GB"]).toEqual("");
    });

    it("is parsed when present", () => {
      const input = createInput();
      input.phone = "075555555";
      const output = parse(input);
      expect(output.fields.phone["en-GB"]).toEqual("075555555");
    });
  });
});
