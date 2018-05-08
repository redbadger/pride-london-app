// @flow
import { NAVIGATION, navigate } from "./navigation";

const navigationState = (currentName: string) => ({
  index: 0,
  routes: [
    {
      key: "0",
      routeName: currentName
    }
  ]
});

const nestedNavigationState = (currentName: string) => ({
  index: 0,
  routes: [
    {
      key: "0",
      routeName: "foo",
      index: 0,
      routes: [
        {
          key: "0",
          routeName: currentName
        }
      ]
    }
  ]
});

describe("navigate", () => {
  it("dispatches a NAVIGATION event", async () => {
    const mockDispatch = jest.fn();
    const prevState = navigationState("Previous");
    const currentState = navigationState("Next");
    navigate(mockDispatch)(prevState, currentState);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: NAVIGATION,
      route: "Next"
    });
  });

  it("dispatches a NAVIGATION event when current route is nested", async () => {
    const mockDispatch = jest.fn();
    const prevState = navigationState("Previous");
    const currentState = nestedNavigationState("Next");
    navigate(mockDispatch)(prevState, currentState);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: NAVIGATION,
      route: "Next"
    });
  });
});
