// @flow
import { generateCMSEvent, sampleOne } from "../data/__test-data";
import reducer from "./data";

describe("Events reducer", () => {
  it("initialises with default state", () => {
    // $FlowFixMe
    const state = reducer(undefined, {});

    expect(state).toMatchSnapshot();
  });

  it("sets loading flag for REQUEST_CMS_DATA action", () => {
    const initialState = {
      entries: [],
      assets: [],
      events: {},
      headerBanners: [],
      images: {},
      performances: {},
      sponsors: [],
      loading: false,
      refreshing: false
    };
    const state = reducer(initialState, { type: "REQUEST_CMS_DATA" });

    expect(state.loading).toBe(true);
    expect(state.refreshing).toBe(false);
  });

  it("sets refreshing flag for REQUEST_UPDATE_CMS_DATA action", () => {
    const initialState = {
      entries: [],
      assets: [],
      events: {},
      headerBanners: [],
      images: {},
      performances: {},
      sponsors: [],
      loading: false,
      refreshing: false
    };
    const state = reducer(initialState, { type: "REQUEST_UPDATE_CMS_DATA" });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(true);
  });

  it("saves entries from RECEIVE_CMS_DATA action", () => {
    const initialState = {
      entries: [],
      assets: [],
      events: {},
      headerBanners: [],
      images: {},
      performances: {},
      sponsors: [],
      loading: true,
      refreshing: false
    };
    const newCmsData = {
      entries: [
        {
          sys: { id: "event1", contentType: { sys: { id: "event" } } },
          fields: {}
        }
      ],
      assets: [{ sys: { id: "asset1", contentType: { sys: { id: "asset" } } } }]
    };

    // $FlowFixMe
    const state = reducer(initialState, {
      type: "RECEIVE_CMS_DATA",
      data: newCmsData
    });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(false);
    expect(state.entries).toEqual(newCmsData.entries);
    expect(state.assets).toBe(newCmsData.assets);
  });

  it("expands recurring events from RECEIVE_CMS_DATA action", () => {
    const initialState = {
      entries: [],
      assets: [],
      events: {},
      headerBanners: [],
      images: {},
      performances: {},
      sponsors: [],
      loading: true,
      refreshing: false
    };

    const newCmsData = {
      entries: [
        {
          fields: {
            startTime: { "en-GB": "2018-08-02T00:00+00:00" },
            endTime: { "en-GB": "2018-08-02T03:00+00:00" },
            recurrenceDates: { "en-GB": ["03/08/2018"] }
          },
          sys: { id: "event1", contentType: { sys: { id: "event" } } }
        }
      ],
      assets: [{ id: "1" }],
      syncToken: "abc",
      updated: true
    };
    const expected = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          endTime: { "en-GB": "2018-08-02T03:00+00:00" },
          recurrenceDates: { "en-GB": ["03/08/2018"] }
        },
        sys: { id: "event1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: {
          startTime: { "en-GB": "2018-08-03T00:00+00:00" },
          endTime: { "en-GB": "2018-08-03T03:00+00:00" },
          recurrenceDates: { "en-GB": ["02/08/2018", "03/08/2018"] }
        },
        sys: {
          id: "event1-recurrence-03/08/2018",
          contentType: { sys: { id: "event" } }
        }
      }
    ];

    // $FlowFixMe
    const state = reducer(initialState, {
      type: "RECEIVE_CMS_DATA",
      data: newCmsData
    });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(false);
    expect(state.entries).toEqual(expected);
    expect(state.assets).toBe(newCmsData.assets);
  });

  it("sets loading and refreshing to false for RECEIVE_CMS_ERROR action", () => {
    const initialState = {
      entries: [],
      assets: [],
      events: {},
      headerBanners: [],
      images: {},
      performances: {},
      sponsors: [],
      loading: true,
      refreshing: true
    };
    const state = reducer(initialState, { type: "RECEIVE_CMS_ERROR" });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(false);
  });

  describe("RECEIVE_CMS_DATA action", () => {
    it("decodes events", () => {
      const initialState = {
        entries: [],
        assets: [],
        events: {},
        headerBanners: [],
        images: {},
        performances: {},
        sponsors: [],
        loading: true,
        refreshing: false
      };

      const newCmsData = {
        entries: [sampleOne(generateCMSEvent)],
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
    });

    it("decodes headerBanners", () => {
      const initialState = {
        entries: [],
        assets: [],
        headerBanners: [],
        images: {},
        performances: {},
        sponsors: [],
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
        entries: [],
        assets: [],
        headerBanners: [],
        images: {},
        performances: {},
        sponsors: [],
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

    it("decodes performances", () => {
      const initialState = {
        entries: [],
        assets: [],
        headerBanners: [],
        images: {},
        performances: {},
        sponsors: [],
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
        entries: [],
        assets: [],
        headerBanners: [],
        images: {},
        performances: {},
        sponsors: [],
        loading: true,
        refreshing: false
      };

      const newCmsData = {
        entries: [
          {
            fields: {
              sponsorName: { "en-GB": "sponsorName" },
              sponsorLogo: {
                "en-GB": { sys: { id: "2o2SZPgYl2ABCWu2MoK333" } }
              },
              sponsorUrl: { "en-GB": "sponsorUrl" },
              sponsorLevel: { "en-GB": "Headline" }
            },
            sys: {
              id: "3O3SZPgYl2MUEWu2MoK2oi",
              contentType: {
                sys: {
                  id: "sponsor"
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
          contentType: "sponsor",
          revision: 1,
          locale: "en-GB",
          fields: {
            sponsorName: "sponsorName",
            sponsorLogo: { sys: { id: "2o2SZPgYl2ABCWu2MoK333" } },
            sponsorUrl: "sponsorUrl",
            sponsorLevel: "Headline"
          }
        }
      ];

      // $FlowFixMe
      const state = reducer(initialState, {
        type: "RECEIVE_CMS_DATA",
        data: newCmsData
      });

      expect(state.sponsors).toEqual(expected);
    });
  });
});
