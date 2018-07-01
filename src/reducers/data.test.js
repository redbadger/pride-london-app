// @flow
import {
  generateCMSEvent,
  generateCMSParadeGroup,
  generateCMSSponsor,
  generateCMSAmenity,
  sampleOne
} from "../data/__test-data";
import reducer from "./data";

describe("Events reducer", () => {
  it("initialises with default state", () => {
    // $FlowFixMe
    const state = reducer(undefined, {});

    expect(state).toMatchSnapshot();
  });

  it("sets loading flag for REQUEST_CMS_DATA action", () => {
    const initialState = {
      events: [],
      featuredEvents: [],
      headerBanners: [],
      images: {},
      paradeGroups: [],
      performances: {},
      sponsors: [],
      amenities: [],
      loading: false,
      refreshing: false,
      noDataReceived: false
    };
    const state = reducer(initialState, { type: "REQUEST_CMS_DATA" });

    expect(state.loading).toBe(true);
    expect(state.refreshing).toBe(false);
  });

  it("sets refreshing flag for REQUEST_UPDATE_CMS_DATA action", () => {
    const initialState = {
      events: [],
      featuredEvents: [],
      headerBanners: [],
      images: {},
      paradeGroups: [],
      performances: {},
      sponsors: [],
      amenities: [],
      loading: false,
      refreshing: false,
      noDataReceived: false
    };
    const state = reducer(initialState, { type: "REQUEST_UPDATE_CMS_DATA" });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(true);
  });

  it("sets loading and refreshing to false for NO_DATA_RECEIVED action", () => {
    const initialState = {
      events: [],
      featuredEvents: [],
      headerBanners: [],
      images: {},
      paradeGroups: [],
      performances: {},
      sponsors: [],
      amenities: [],
      loading: true,
      refreshing: true,
      noDataReceived: false
    };
    const state = reducer(initialState, { type: "NO_DATA_RECEIVED" });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(false);
    expect(state.noDataReceived).toBe(true);
  });

  describe("RECEIVE_CMS_DATA action", () => {
    it("decodes events", () => {
      const initialState = {
        events: [],
        featuredEvents: [],
        headerBanners: [],
        images: {},
        paradeGroups: [],
        performances: {},
        sponsors: [],
        amenities: [],
        loading: true,
        refreshing: false,
        noDataRecived: true
      };

      const newCmsData = {
        entries: [sampleOne(generateCMSEvent, { seed: 1345 })],
        assets: [],
        syncToken: "abc",
        updated: true
      };

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      expect(state.events).toMatchSnapshot();
      expect(state.noDataReceived).toBe(false);
    });

    it("expands recurring events", () => {
      const initialState = {
        events: [],
        featuredEvents: [],
        headerBanners: [],
        images: {},
        paradeGroups: [],
        performances: {},
        sponsors: [],
        amenities: [],
        loading: true,
        refreshing: false,
        noDataRecived: false
      };

      const event = sampleOne(generateCMSEvent, { seed: 3353 });
      if (event && event.fields && typeof event.fields === "object") {
        event.fields.startTime = { "en-GB": "2018-08-02T00:00+00:00" };
        event.fields.endTime = { "en-GB": "2018-08-02T03:00+00:00" };
        event.fields.recurrenceDates = {
          "en-GB": ["03/08/2018", "04/08/2018"]
        };
      }

      const newCmsData = {
        entries: [event],
        assets: [{ id: "1" }],
        syncToken: "abc",
        updated: true
      };

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      expect(state.events).toMatchSnapshot();
    });

    it("decodes featuredEvents", () => {
      const initialState = {
        events: [],
        featuredEvents: [],
        headerBanners: [],
        images: {},
        paradeGroups: [],
        performances: {},
        sponsors: [],
        amenities: [],
        loading: true,
        refreshing: false
      };

      const newCmsData = {
        entries: [
          {
            fields: {
              title: { "en-GB": "title" },
              events: { "en-GB": [] }
            },
            sys: {
              id: "3O3SZPgYl2MUEWu2MoK2oi",
              contentType: {
                sys: {
                  id: "featuredEvents"
                }
              },
              revision: 1
            }
          }
        ],
        assets: [],
        syncToken: "abc",
        updated: true
      };

      const expected = [
        {
          id: "3O3SZPgYl2MUEWu2MoK2oi",
          contentType: "featuredEvents",
          revision: 1,
          locale: "en-GB",
          fields: {
            title: "title",
            events: []
          }
        }
      ];

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      expect(state.featuredEvents).toEqual(expected);
    });

    it("decodes headerBanners", () => {
      const initialState = {
        events: [],
        featuredEvents: [],
        headerBanners: [],
        images: {},
        paradeGroups: [],
        performances: {},
        sponsors: [],
        amenities: [],
        loading: true,
        refreshing: false
      };

      const newCmsData = {
        entries: [
          {
            fields: {
              heading: { "en-GB": "heading" },
              headingLine2: { "en-GB": "headingLine2" },
              subHeading: { "en-GB": "subHeading" },
              heroImage: { "en-GB": { sys: { id: "2o2SZPgYl2ABCWu2MoK333" } } },
              backgroundColour: { "en-GB": "#333333" }
            },
            sys: {
              id: "3O3SZPgYl2MUEWu2MoK2oi",
              contentType: {
                sys: {
                  id: "headerBanner"
                }
              },
              revision: 1
            }
          }
        ],
        assets: [],
        syncToken: "abc",
        updated: true
      };

      const expected = [
        {
          id: "3O3SZPgYl2MUEWu2MoK2oi",
          contentType: "headerBanner",
          revision: 1,
          locale: "en-GB",
          fields: {
            heading: "heading",
            headingLine2: "headingLine2",
            subHeading: "subHeading",
            heroImage: { sys: { id: "2o2SZPgYl2ABCWu2MoK333" } },
            backgroundColour: "#333333"
          }
        }
      ];

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      expect(state.headerBanners).toEqual(expected);
    });

    it("decodes performances", () => {
      const initialState = {
        events: [],
        featuredEvents: [],
        headerBanners: [],
        images: {},
        paradeGroups: [],
        performances: {},
        sponsors: [],
        amenities: [],
        loading: true,
        refreshing: false
      };

      const newCmsData = {
        entries: [],
        assets: [
          {
            fields: {
              file: {
                "en-GB": {
                  url: "//localhost/image.jpg",
                  details: {
                    image: {
                      height: 100,
                      width: 100
                    }
                  }
                }
              }
            },
            sys: {
              id: "3O3SZPgYl2MUEWu2MoK2oi",
              revision: 1
            }
          }
        ],
        syncToken: "abc",
        updated: true
      };

      const expected = {
        "3O3SZPgYl2MUEWu2MoK2oi": {
          id: "3O3SZPgYl2MUEWu2MoK2oi",
          revision: 1,
          uri: "https://localhost/image.jpg",
          width: 100,
          height: 100
        }
      };

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      expect(state.images).toEqual(expected);
    });

    it("decodes parade groups", () => {
      const initialState = {
        events: [],
        featuredEvents: [],
        headerBanners: [],
        images: {},
        paradeGroups: [],
        performances: {},
        sponsors: [],
        amenities: [],
        loading: true,
        refreshing: false
      };

      const newCmsData = {
        entries: [sampleOne(generateCMSParadeGroup, { seed: 6534 })],
        assets: [],
        syncToken: "abc",
        updated: true
      };

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      // $FlowFixMe
      expect(state.paradeGroups[0].id).toEqual(newCmsData.entries[0].sys.id);
    });

    it("decodes performances", () => {
      const initialState = {
        events: [],
        featuredEvents: [],
        headerBanners: [],
        images: {},
        paradeGroups: [],
        performances: {},
        sponsors: [],
        amenities: [],
        loading: true,
        refreshing: false
      };

      const newCmsData = {
        entries: [
          {
            fields: {
              title: { "en-GB": "title" },
              startTime: { "en-GB": "2018-07-07T12:00:00+01:00" }
            },
            sys: {
              id: "3O3SZPgYl2MUEWu2MoK2oi",
              contentType: {
                sys: {
                  id: "performance"
                }
              },
              revision: 1
            }
          }
        ],
        assets: [],
        syncToken: "abc",
        updated: true
      };

      const expected = {
        "3O3SZPgYl2MUEWu2MoK2oi": {
          id: "3O3SZPgYl2MUEWu2MoK2oi",
          contentType: "performance",
          revision: 1,
          locale: "en-GB",
          fields: {
            title: "title",
            startTime: "2018-07-07T12:00:00+01:00"
          }
        }
      };

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      expect(state.performances).toEqual(expected);
    });

    it("decodes sponsors", () => {
      const initialState = {
        events: [],
        featuredEvents: [],
        headerBanners: [],
        images: {},
        paradeGroups: [],
        performances: {},
        sponsors: [],
        amenities: [],
        loading: true,
        refreshing: false
      };

      const newCmsData = {
        entries: [sampleOne(generateCMSSponsor, { seed: 6534 })],
        assets: [],
        syncToken: "abc",
        updated: true
      };

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      // $FlowFixMe
      expect(state.sponsors[0].id).toEqual(newCmsData.entries[0].sys.id);
    });

    it("decodes amenities", () => {
      const initialState = {
        events: [],
        featuredEvents: [],
        headerBanners: [],
        images: {},
        paradeGroups: [],
        performances: {},
        sponsors: [],
        amenities: [],
        loading: true,
        refreshing: false
      };

      const newCmsData = {
        entries: [sampleOne(generateCMSAmenity, { seed: 6534 })],
        assets: [],
        syncToken: "abc",
        updated: true
      };

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      // $FlowFixMe
      expect(state.amenities[0].id).toEqual(newCmsData.entries[0].sys.id);
    });
  });
});
