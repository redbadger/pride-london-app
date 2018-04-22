import detox from "detox";
import { detox as config } from "../package.json";

// Set the default test timeout of 5s
jest.setTimeout(5000);

beforeAll(async () => {
  await detox.init(config);
});

afterAll(async () => {
  await detox.cleanup();
});
