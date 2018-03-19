/* eslint-disable no-console */
const contentful = require("contentful-management");
const loremIpsum = require("lorem-ipsum");
const program = require("commander");

const PRODUCTION_SPACE = "0ho16wyr4i9n";

const generateEvents = (spaceId, accessToken) => {
  const client = contentful.createClient({
    accessToken
  });

  client
    .getSpace(spaceId)
    .then(async space => {
      const { total: totalEvents } = await space.getEntries({
        content_type: "event",
        limit: 0
      });
      const toGenerate = Math.max(0, 150 - totalEvents);

      console.log(`Space contains ${totalEvents} events`);
      console.log(`Generating ${toGenerate} events`);

      const newEntries = Array.from(Array(toGenerate)).map(() => ({
        fields: {
          name: {
            "en-GB": `Generated: ${loremIpsum({ count: 4, units: "words" })}`
          },
          location: {
            "en-GB": {
              lon: -0.13319109999997636,
              lat: 51.5143379
            }
          },
          startTime: { "en-GB": "2017-07-08T11:00+00:00" }
        }
      }));

      const newEntryPromises = newEntries.map(entry =>
        space
          .createEntry("event", entry)
          .then(createdEntry => createdEntry.publish())
      );

      const savedEntries = await Promise.all(newEntryPromises);

      console.log(savedEntries);
    })
    .catch(console.error);
};

const deleteGeneratedEvents = (spaceId, accessToken) => {
  const client = contentful.createClient({
    accessToken
  });

  client
    .getSpace(spaceId)
    .then(async space => {
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
    })
    .catch(console.error);
};

const getContentfulOpts = cmd => {
  const spaceId = cmd.space_id || process.env.CONTENTFUL_SPACE_ID;
  const accessToken = cmd.access_token || process.env.CONTENTFUL_MANAGEMENT_KEY;
  if (!spaceId) {
    return console.error("Please provide a space_id");
  }
  if (spaceId === PRODUCTION_SPACE) {
    return console.error(
      "This looks like the production spaceId. I don't think you want to do that."
    );
  }
  if (!accessToken) {
    return console.error("Please provide access_token");
  }
  return { accessToken, spaceId };
};

program
  .command("generate")
  .option("-s, --space_id <spaceId>", "Contenful Space ID")
  .option(
    "-a, --access_token <accessToken>",
    "Contentful management access token"
  )
  .action(cmd => {
    const { spaceId, accessToken } = getContentfulOpts(cmd);
    return generateEvents(spaceId, accessToken);
  });

program
  .command("delete")
  .option("-s, --space_id <spaceId>", "Contenful Space ID")
  .option(
    "-a, --access_token <accessToken>",
    "Contentful management access token"
  )
  .action(cmd => {
    const { spaceId, accessToken } = getContentfulOpts(cmd);
    return deleteGeneratedEvents(spaceId, accessToken);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
