import detox from "detox";
import { detox as config } from "../package.json";

// Set the default test timeout of 20s
jest.setTimeout(200000);

beforeAll(async () => {
  await detox.init(config);
});

afterAll(async () => {
  await detox.cleanup();
});
