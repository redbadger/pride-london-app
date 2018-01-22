const data = require("./../../data/data.json");

class MockClient {
  constructor() {
    this.data = data;
  }

  getEntries = args =>
    new Promise(resolve => {
      resolve(this.data[args.content_type]);
    });
}

export default MockClient;
