module.exports = migration => {
  const event = migration
    .createContentType("event")
    .name("Event")
    .description("Events during Pride 2018");

  event
    .createField("name")
    .name("Name")
    .type("Symbol")
    .required(true);

  event
    .createField("location")
    .name("Location")
    .type("Location");

  event
    .createField("startTime")
    .name("Start time")
    .type("Date");
};
