import detox from "detox";
import adapter from "detox/runners/jest/adapter";
import { detox as config } from "../package.json";

jest.setTimeout(200000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await detox.init(config);
});

// https://github.com/wix/detox/blob/master/docs/Guide.Migration.md#jest
// eslint-disable-next-line
beforeEach(async function() {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
