import detox from "detox";
import { detox as config } from "../package.json";

// Set the default test timeout of 30s
jest.setTimeout(30000);

beforeAll(async () => {
  await detox.init(config);
});

afterAll(async () => {
  await detox.cleanup();
});
