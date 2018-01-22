import MockClient from "./MockClient";

const { createClient } = require("contentful/dist/contentful.browser.min.js");

class Client {
  constructor(fetchStaticData = true) {
    this.client = fetchStaticData
      ? new MockClient()
      : createClient({
          space: process.env.SPACE || "",
          accessToken: process.env.ACCESS_TOKEN || ""
        });
  }

  allEvents = () =>
    this.client
      .getEntries({ content_type: "event" })
      .then(response => response.items.map(item => item.fields));
}

export default Client;
