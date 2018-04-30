import detox from "detox";
import { detox as config } from "../package.json";

// Set the default test timeout of 20s
jest.setTimeout(20000);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

beforeAll(async () => {
  await detox.init(config);
  await sleep(1000);
});

afterAll(async () => {
  await detox.cleanup();
});
