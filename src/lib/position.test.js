// @flow
import { getCurrentPosition } from "./position";

global.navigator = {
  geolocation: {
    getCurrentPosition: jest.fn()
  }
};

const getCurrentPositionMock = global.navigator.geolocation.getCurrentPosition;

const options = {
  enableHighAccuracy: false,
  timeout: 3000,
  maximumAge: 10000
};

describe("getCurrentPosition", () => {
  it("resolves when geolocation.getCurrentPosition calls back successfully", () => {
    getCurrentPositionMock.mockImplementationOnce(resolve =>
      setTimeout(() => resolve({ coords: { latitude: 0, longitude: 0 } }))
    );

    return expect(getCurrentPosition(options)).resolves.toEqual({
      latitude: 0,
      longitude: 0
    });
  });

  it("rejects when geolocation.getCurrentPosition calls back unsuccessfully", () => {
    getCurrentPositionMock.mockImplementationOnce((resolve, reject) =>
      setTimeout(() => reject())
    );

    return expect(getCurrentPosition(options)).rejects.toEqual(undefined);
  });

  it("calls geolocation.getCurrentPosition with the correct options", () => {
    getCurrentPositionMock.mockImplementationOnce(resolve =>
      setTimeout(() => resolve({ coords: { latitude: 0, longitude: 0 } }))
    );

    return expect(getCurrentPositionMock.mock.calls[0][2]).toEqual(options);
  });
});
