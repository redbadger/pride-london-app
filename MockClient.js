const data = require("./data.json");

const SYS_ID_TO_KEY_MAPPINGS = {
  123: "events"
};

export default class MockClient {
  static getEntries(contentTypes) {
    const contentTypeKey = SYS_ID_TO_KEY_MAPPINGS[contentTypes.content_type];

    return new Promise(resolve => {
      resolve(data[contentTypeKey]);
    });
  }
}
