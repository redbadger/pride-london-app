/* eslint-disable no-console */
const program = require("commander");
const {
  generateEvents,
  deleteGeneratedEvents
} = require("./generate-content/contentful");

const PRODUCTION_SPACE = "0ho16wyr4i9n";
const DEFAULT_GENERATE_NUMBER = 150;

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
  .command("generate [num]")
  .option("-s, --space_id <spaceId>", "Contenful Space ID")
  .option(
    "-a, --access_token <accessToken>",
    "Contentful management access token"
  )
  .action((num, cmd) => {
    const generateCount = parseInt(num, 10) || DEFAULT_GENERATE_NUMBER;
    const { spaceId, accessToken } = getContentfulOpts(cmd);
    return generateEvents(spaceId, accessToken, generateCount);
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
