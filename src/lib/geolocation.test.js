// @flow
import Permissions from "react-native-permissions";
import { last, skip, take } from "rxjs/operators";
import {
  passiveLocationStream,
  checkPermissionStream,
  activeLocationStream,
  requestPermissionStream,
  locationStream,
  getLocation,
  shouldNeverRequest,
  shouldRequest
} from "./geolocation";

jest.mock("react-native-permissions", () => ({
  check: jest.fn(),
  request: jest.fn()
}));

global.navigator = {
  geolocation: {
    watchPosition: jest.fn(),
    clearWatch: jest.fn()
  }
};

const { clearWatch, watchPosition } = navigator.geolocation;

afterEach(() => {
  // $FlowFixMe
  Permissions.check.mockRestore();
  // $FlowFixMe
  Permissions.request.mockRestore();
});

const callbackSuccessWith = value => success =>
  setTimeout(() => success(value), 0);

const callbackErrorWith = value => (success, error) =>
  setTimeout(() => error(value), 0);

describe("getLocation", () => {
  it("returns the location if authorized + tracking", () => {
    const coords = { longitude: 1, latitude: 2 };
    expect(
      getLocation({
        type: "authorized",
        location: {
          type: "tracking",
          coords
        }
      })
    ).toEqual(coords);
  });

  it("returns null the location if anything else", () => {
    expect(
      getLocation({
        type: "authorized",
        location: {
          type: "awaiting"
        }
      })
    ).toEqual(null);
  });
});

describe("shouldNeverRequest", () => {
  it("returns true for restricted LocationStatus", () => {
    expect(shouldNeverRequest({ type: "restricted" })).toEqual(true);
  });

  it("returns false otherwise", () => {
    expect(
      shouldNeverRequest({ type: "authorized", location: { type: "awaiting" } })
    ).toEqual(false);
    expect(shouldNeverRequest({ type: "checking" })).toEqual(false);
    expect(shouldNeverRequest({ type: "denied" })).toEqual(false);
    expect(shouldNeverRequest({ type: "requesting" })).toEqual(false);
    expect(shouldNeverRequest({ type: "undetermined" })).toEqual(false);
  });
});

describe("shouldRequest", () => {
  it("returns true for denied and undetermined LocationStatus", () => {
    expect(shouldRequest({ type: "denied" })).toEqual(true);
    expect(shouldRequest({ type: "undetermined" })).toEqual(true);
  });

  it("returns false otherwise", () => {
    expect(
      shouldRequest({ type: "authorized", location: { type: "awaiting" } })
    ).toEqual(false);
    expect(shouldRequest({ type: "checking" })).toEqual(false);
    expect(shouldRequest({ type: "requesting" })).toEqual(false);
    expect(shouldRequest({ type: "restricted" })).toEqual(false);
  });
});

describe("checkPermissionStream", () => {
  it("emits checking to start", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.check.mockReturnValue(Promise.resolve("authorized"));
    checkPermissionStream()
      .pipe(take(1))
      .subscribe(value => {
        expect(value).toEqual("checking");
        done();
      });
  });

  it("ends with result of checking", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.check.mockReturnValue(Promise.resolve("authorized"));
    checkPermissionStream()
      .pipe(last())
      .subscribe(value => {
        expect(value).toEqual("authorized");
        done();
      });
  });
});

describe("requestPermissionStream", () => {
  it("emits requesting to start", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.request.mockReturnValue(Promise.resolve("authorized"));
    requestPermissionStream()
      .pipe(take(1))
      .subscribe(value => {
        expect(value).toEqual("requesting");
        done();
      });
  });

  it("ends with result of checking", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.request.mockReturnValue(Promise.resolve("authorized"));
    requestPermissionStream()
      .pipe(last())
      .subscribe(value => {
        expect(value).toEqual("authorized");
        done();
      });
  });
});

describe("LocationStream", () => {
  it("emits values from subscribing to watchPosition", done => {
    expect.assertions(1);
    watchPosition.mockImplementationOnce(
      callbackSuccessWith({ coords: { latitude: 1, longitude: 2 } })
    );
    locationStream().subscribe(value => {
      expect(value).toEqual({
        type: "tracking",
        coords: { latitude: 1, longitude: 2 }
      });
      done();
    });
  });

  it("emits errors from subscribing to watchPosition", done => {
    expect.assertions(1);
    watchPosition.mockImplementationOnce(callbackErrorWith({ code: 2 }));
    locationStream().subscribe(value => {
      expect(value).toEqual({ type: "error" });
      done();
    });
  });

  it("clears watch callback when unsubscribed", done => {
    expect.assertions(1);
    watchPosition.mockImplementationOnce(cb => {
      setTimeout(() => cb({ coords: { longitude: 1, latititude: 2 } }));
      return 123;
    });
    const stream = locationStream().subscribe(() => {
      stream.unsubscribe();
      expect(clearWatch).toBeCalledWith(123);
      done();
    });
  });
});

describe("passiveLocationStream", () => {
  it("emits requesting to start", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.check.mockReturnValue(Promise.resolve("authorized"));
    passiveLocationStream()
      .pipe(take(1))
      .subscribe(value => {
        expect(value).toEqual({ type: "checking" });
        done();
      });
  });

  it("emits result of checking", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.check.mockReturnValue(Promise.resolve("authorized"));
    passiveLocationStream()
      .pipe(
        skip(1),
        take(1)
      )
      .subscribe(value => {
        expect(value).toEqual({
          type: "authorized",
          location: { type: "awaiting" }
        });
        done();
      });
  });

  it("subscribes to location if authorized", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.check.mockReturnValue(Promise.resolve("authorized"));
    watchPosition.mockImplementationOnce(
      callbackSuccessWith({ coords: { latitude: 1, longitude: 2 } })
    );
    passiveLocationStream()
      .pipe(
        skip(2),
        take(1)
      )
      .subscribe(value => {
        expect(value).toEqual({
          type: "authorized",
          location: { type: "tracking", coords: { latitude: 1, longitude: 2 } }
        });
        done();
      });
  });
});

describe("activeLocationStream", () => {
  it("emits requesting to start", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.request.mockReturnValue(Promise.resolve("authorized"));
    activeLocationStream()
      .pipe(take(1))
      .subscribe(value => {
        expect(value).toEqual({ type: "requesting" });
        done();
      });
  });

  it("emits result of requesting", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.request.mockReturnValue(Promise.resolve("authorized"));
    activeLocationStream()
      .pipe(
        skip(1),
        take(1)
      )
      .subscribe(value => {
        expect(value).toEqual({
          type: "authorized",
          location: { type: "awaiting" }
        });
        done();
      });
  });

  it("subscribes to location if authorized", done => {
    expect.assertions(1);
    // $FlowFixMe
    Permissions.request.mockReturnValue(Promise.resolve("authorized"));
    watchPosition.mockImplementationOnce(
      callbackSuccessWith({ coords: { latitude: 1, longitude: 2 } })
    );
    activeLocationStream()
      .pipe(
        skip(2),
        take(1)
      )
      .subscribe(value => {
        expect(value).toEqual({
          type: "authorized",
          location: { type: "tracking", coords: { latitude: 1, longitude: 2 } }
        });
        done();
      });
  });
});
