// @flow
import { Alert, Linking, Platform } from "react-native";
import Permissions from "react-native-permissions";
import { Observable, defer, merge, of, race } from "rxjs";
import { delay, map, share, switchMap, tap } from "rxjs/operators";

export type Coordinate = {
  latitude: number,
  longitude: number
};

export type LocationValue =
  | { type: "awaiting" }
  | { type: "error" }
  | { type: "tracking", coords: Coordinate };

export type LocationStatus =
  | { type: "authorized", location: LocationValue }
  | { type: "checking" }
  | { type: "denied" }
  | { type: "requesting" }
  | { type: "restricted" }
  | { type: "undetermined" };

export const getLocation = (locationStatus: LocationStatus): ?Coordinate => {
  if (
    locationStatus.type === "authorized" &&
    locationStatus.location.type === "tracking"
  ) {
    return locationStatus.location.coords;
  }
  return null;
};

export const shouldNeverRequest = (status: LocationStatus): boolean => {
  if (status.type === "restricted") {
    return true;
  }
  return false;
};

export const shouldRequest = (status: LocationStatus): boolean => {
  if (status.type === "denied" || status.type === "undetermined") {
    return true;
  }
  return false;
};

export type PositionRequestOptions = {
  enableHighAccuracy: boolean,
  timeout: number,
  maximumAge: number
};

export const defaultLocationStatus: LocationStatus = {
  type: "undetermined"
};

const locationAwaiting: LocationValue = {
  type: "awaiting"
};

const locationStatusAuthorizedError = {
  type: "authorized",
  location: {
    type: "error"
  }
};

const locationStatusFromErrorCode = (code: number): LocationStatus => {
  // denied
  if (code === 1) {
    return {
      type: "denied"
    };
  }
  return locationStatusAuthorizedError;
};

const locationStatusAuthorizedTracking = (coords): LocationStatus => ({
  type: "authorized",
  location: {
    type: "tracking",
    coords
  }
});

const permissionToLocationStatus = (value: string): LocationStatus => {
  switch (value) {
    case "authorized":
      return {
        type: "authorized",
        location: locationAwaiting
      };
    case "checking":
      return {
        type: "checking"
      };
    case "denied":
      return {
        type: "denied"
      };
    case "requesting":
      return {
        type: "requesting"
      };
    case "restricted":
      return {
        type: "restricted"
      };
    default:
      return {
        type: "undetermined"
      };
  }
};

export const checkPermissionStream = () =>
  merge(of("checking"), defer(() => Permissions.check("location")));

export const requestPermissionStream = () =>
  merge(of("requesting"), defer(() => Permissions.request("location")));

const options = {
  timeout: 3000,
  maximumAge: 60000,
  enableHighAccuracy: false,
  distanceFilter: 5
};

export const locationStatusStream = () => {
  const stream = Observable.create(observer => {
    const watchId = navigator.geolocation.watchPosition(
      value => observer.next(locationStatusAuthorizedTracking(value.coords)),
      ({ code }) => observer.next(locationStatusFromErrorCode(code)),
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }).pipe(share());
  const timedOut = merge(
    of(locationStatusAuthorizedError).pipe(delay(3000)),
    stream
  );
  return race(stream, timedOut);
};

/*
Returns a stream of LocationStatus values. Automatically streams
location updates if permissions allow this to be done passively.
Example steaming output:
|-A---B---C---D---E
Where:
A = Checking
B = Authorized + Awaiting
C = Authorized + Tracking(1, 1)
D = Authorized + Tracking(1, 2)
E = Authorized + Error
*/
export const passiveLocationStream = () =>
  checkPermissionStream().pipe(
    map(permissionToLocationStatus),
    switchMap(value => {
      if (value.type === "authorized") {
        return merge(of(value), locationStatusStream());
      }
      return of(value);
    })
  );

const noop = () => {};

const showDeniedAlertToIOS = value => {
  if (value === "denied" && Platform.OS === "ios") {
    Alert.alert(
      "We can't get your location",
      "Enable location access in your Settings to help find your way around the Parade.",
      [
        {
          text: "Cancel"
        },
        {
          text: "Go to my Settings",
          onPress: () => Linking.openURL("app-settings:")
        }
      ]
    );
  }
};

/*
Returns a stream of LocationStatus values. This will prompt the user
to authorize getting location information. Automatically streams
location updates if resulting permission allows this.
Example steaming output:
|-A---B---C---D---E
Where:
A = Requesting
B = Authorized + Awaiting
C = Authorized + Tracking(1, 1)
D = Authorized + Tracking(1, 2)
E = Authorized + Error
*/
export const activeLocationStream = (locationStatus: LocationStatus) => {
  const showAlert =
    locationStatus.type === "denied" ? showDeniedAlertToIOS : noop;

  return requestPermissionStream().pipe(
    tap(showAlert),
    map(permissionToLocationStatus),
    switchMap(value => {
      if (value.type === "authorized") {
        return merge(of(value), locationStatusStream());
      }
      return of(value);
    })
  );
};
