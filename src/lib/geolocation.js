// @flow
import Permissions from "react-native-permissions";
import { Observable, defer, merge, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

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

const authorized = (location: LocationValue): LocationStatus => ({
  type: "authorized",
  location
});

const locationAwaiting: LocationValue = {
  type: "awaiting"
};

const locationError: LocationValue = {
  type: "error"
};

const locationTracking = (coords): LocationValue => ({
  type: "tracking",
  coords
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

export const locationStream = () =>
  Observable.create(observer => {
    const watchId = navigator.geolocation.watchPosition(
      value => observer.next(locationTracking(value.coords)),
      () => observer.next(locationError),
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  });

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
        return merge(of(value), locationStream().pipe(map(authorized)));
      }
      return of(value);
    })
  );

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
export const activeLocationStream = () =>
  requestPermissionStream().pipe(
    map(permissionToLocationStatus),
    switchMap(value => {
      if (value.type === "authorized") {
        return merge(of(value), locationStream().pipe(map(authorized)));
      }
      return of(value);
    })
  );
