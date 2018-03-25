/* eslint-disable no-console */
const contentful = require("contentful-management");
const { generateEvent } = require("./generators");

const MAX_EVENTS = 150;

const generateEvents = async (spaceId, accessToken, count) => {
  const client = contentful.createClient({
    accessToken
  });

  try {
    const space = await client.getSpace(spaceId);

    const eventType = await space.getContentType("event");
    const assets = await space.getAssets();
    const { total: totalEvents } = await space.getEntries({
      content_type: "event",
      limit: 0
    });
    const toGenerate =
      count + totalEvents >= MAX_EVENTS ? MAX_EVENTS - totalEvents : count;

    console.log(`Space contains ${totalEvents} events`);
    console.log(`Generating ${toGenerate} events`);

    const eventCategories = eventType.fields.find(
      field => field.id === "eventCategories"
    ).items.validations[0].in;

    const newEntries = Array.from(Array(toGenerate)).map(() =>
      generateEvent(eventCategories, assets)
    );

    const newEntryPromises = newEntries.map(entry =>
      space
        .createEntry("event", entry)
        .then(createdEntry => createdEntry.publish())
    );

    await Promise.all(newEntryPromises);
  } catch (e) {
    console.error(e);
  }
};

const deleteGeneratedEvents = async (spaceId, accessToken) => {
  const client = contentful.createClient({
    accessToken
  });

  const space = await client.getSpace(spaceId);

  try {
    const entries = await space.getEntries({
      content_type: "event",
      "fields.name[match]": "Generated: ",
      select: "sys.id"
    });

    const entryIds = entries.items.map(entry => entry.sys.id);

    console.log(`Space contains ${entries.total} generated events`);
    console.log(`Deleting ${entryIds.length} events`);

    const deletionPromises = entryIds.map(entryId =>
      space
        .getEntry(entryId)
        .then(entry => {
          if (entry.isPublished()) {
            return entry.unpublish();
          }
          return entry;
        })
        .then(entry => entry.delete())
    );

    await Promise.all(deletionPromises);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  generateEvents,
  deleteGeneratedEvents
};
