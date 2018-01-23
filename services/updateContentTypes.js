const R = require("ramda");
const contentful = require("contentful-management");
const eventContentType = require("./../contentful/content-types/event.json");
const venueContentType = require("./../contentful/content-types/venue.json");

const spaceId = process.env.SPACE_ID;
const accessToken = process.env.ACCESS_TOKEN;
const client = contentful.createClient({ accessToken });
const clientSpace = client.getSpace(spaceId);
const srcContentTypes = [eventContentType, venueContentType];

const createOrUpdateContentTypes = dstContentTypes => {
  srcContentTypes.forEach(
    srcContentType =>
      dstContentTypes.includes(srcContentType.id)
        ? updateContentType(srcContentType)
        : createContentType(srcContentType)
  );
};

const updateContentType = srcContentType => {
  clientSpace
    .then(space => space.getContentType(srcContentType.id))
    .then(dstContentType => {
      dstContentType.name = srcContentType.name;
      dstContentType.description = srcContentType.description;
      dstContentType.displayField = srcContentType.displayField;
      dstContentType.fields = srcContentType.fields;
      return dstContentType.update();
    })
    .then(contentType => contentType.publish())
    .then(contentType => console.log(`Updated ${srcContentType.id}`));
};

const createContentType = srcContentType => {
  clientSpace
    .then(space =>
      space.createContentTypeWithId(
        srcContentType.id,
        R.omit(["id"], srcContentType)
      )
    )
    .then(contentType => contentType.publish())
    .then(contentType => console.log(`Created ${srcContentType.id}`));
};

clientSpace
  .then(space => space.getContentTypes())
  .then(response => response.items.map(item => item.sys.id))
  .then(dstContentTypes => createOrUpdateContentTypes(dstContentTypes))
  .catch(console.error);
