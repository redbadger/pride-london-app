import detox from "detox";
import { detox as config } from "../package.json";

// Set the default test timeout of 10s
jest.setTimeout(10000);

beforeAll(async () => {
  await detox.init(config);
});

afterAll(async () => {
  await detox.cleanup();
});
