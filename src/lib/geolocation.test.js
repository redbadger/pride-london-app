// @flow
import { Alert, Linking, Platform } from "react-native";
import Permissions from "react-native-permissions";
import { TestScheduler } from "rxjs/testing";
import { merge, empty } from "rxjs";
import { last, skip, take, tap, flatMap } from "rxjs/operators";
import {
  passiveLocationStream,
  checkPermissionStream,
  activeLocationStream,
  requestPermissionStream,
  locationStatusStream,
  getLocation,
  shouldNeverRequest,
  shouldRequest
} from "./geolocation";

jest.mock("react-native", () => ({
  Platform: {
    OS: "android"
  },
  Linking: {
    openURL: jest.fn()
  },
  Alert: {
    alert: jest.fn()
  }
}));

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

const streamValues = {
  c: { coords: { longitude: 1, latititude: 2 } },
  e: {
    type: "authorized",
    location: {
      type: "error"
    }
  },
  t: {
    type: "authorized",
    location: {
      type: "tracking",
      coords: { longitude: 1, latititude: 2 }
    }
  }
};

afterEach(() => {
  // $FlowFixMe
  Permissions.check.mockRestore();
  // $FlowFixMe
  Permissions.request.mockRestore();
  // $FlowFixMe
  Alert.alert.mockRestore();
  // $FlowFixMe
  Linking.openURL.mockRestore();
  Platform.OS = "android";
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

describe("locationStatusStream", () => {
  it("emits authorized + tracking when watchPosition emits values", done => {
    expect.assertions(1);
    watchPosition.mockImplementationOnce(
      callbackSuccessWith({ coords: { latitude: 1, longitude: 2 } })
    );
    locationStatusStream().subscribe(value => {
      expect(value).toEqual({
        type: "authorized",
        location: {
          type: "tracking",
          coords: { latitude: 1, longitude: 2 }
        }
      });
      done();
    });
  });

  it("emits authorized + error when watchPosition emits errors", done => {
    expect.assertions(1);
    watchPosition.mockImplementationOnce(callbackErrorWith({ code: 2 }));
    locationStatusStream().subscribe(value => {
      expect(value).toEqual({
        type: "authorized",
        location: { type: "error" }
      });
      done();
    });
  });

  it("emits denied when watchPosition emits errors with code 1", done => {
    expect.assertions(1);
    watchPosition.mockImplementationOnce(callbackErrorWith({ code: 1 }));
    locationStatusStream().subscribe(value => {
      expect(value).toEqual({
        type: "denied"
      });
      done();
    });
  });

  it("emits authorized + error when watchPosition does not emit first value in 3000ms", () => {
    let callback = v => v;
    watchPosition.mockImplementationOnce(cb => {
      callback = cb;
    });
    // See https://github.com/ReactiveX/rxjs/blob/master/doc/marble-testing.md
    const scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    scheduler.run(({ cold, expectObservable }) => {
      const watchCallback = cold(" 3000ms --c-c-c", streamValues).pipe(
        tap(v => callback(v)),
        flatMap(() => empty())
      );
      expectObservable(merge(locationStatusStream(), watchCallback)).toBe(
        " 3000ms e-t-t-t",
        streamValues
      );
    });
  });

  it("emits authorized + tracking when watchPosition emits first value within 3000ms", () => {
    let callback = v => v;
    watchPosition.mockImplementationOnce(cb => {
      callback = cb;
    });
    // See https://github.com/ReactiveX/rxjs/blob/master/doc/marble-testing.md
    const scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    scheduler.run(({ cold, expectObservable }) => {
      const watchCallback = cold(" 2999ms c-c-c", streamValues).pipe(
        tap(v => callback(v)),
        flatMap(() => empty())
      );
      expectObservable(merge(locationStatusStream(), watchCallback)).toBe(
        " 2999ms t-t-t",
        streamValues
      );
    });
  });

  it("clears watch callback when unsubscribed", done => {
    expect.assertions(1);
    watchPosition.mockImplementationOnce(cb => {
      setTimeout(() => cb({ coords: { longitude: 1, latititude: 2 } }));
      return 123;
    });
    const stream = locationStatusStream().subscribe(() => {
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
    activeLocationStream({ type: "undetermined" })
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
    activeLocationStream({ type: "undetermined" })
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
    activeLocationStream({ type: "undetermined" })
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

  describe("when passed a denied LocationStatus", () => {
    it("triggers alert on iOS when denied", done => {
      expect.assertions(4);
      // $FlowFixMe
      Permissions.request.mockReturnValue(Promise.resolve("denied"));
      Platform.OS = "ios";
      activeLocationStream({ type: "denied" })
        .pipe(
          skip(1),
          take(1)
        )
        .subscribe(() => {
          const [
            title,
            description,
            [negative, positive]
          ] = Alert.alert.mock.calls[0];
          expect(title).toEqual("We can't get your location");
          expect(description).toEqual(
            "Enable location access in your Settings to help find your way around the Parade."
          );
          expect(negative.text).toEqual("Cancel");
          expect(positive.text).toEqual("Go to my Settings");
          done();
        });
    });

    it("navigates user to settings page if user selects first alert CTA", done => {
      expect.assertions(1);
      // $FlowFixMe
      Permissions.request.mockReturnValue(Promise.resolve("denied"));
      Platform.OS = "ios";
      activeLocationStream({ type: "denied" })
        .pipe(
          skip(1),
          take(1)
        )
        .subscribe(() => {
          const { onPress } = Alert.alert.mock.calls[0][2][1];
          onPress();
          expect(Linking.openURL).toBeCalledWith("app-settings:");
          done();
        });
    });
  });
});
