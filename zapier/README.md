# Typeform -> Zapier -> Contentful Integration

As part of streamlining event submission we have built a typeform to accept events from the public. This has been integrated with Zapier in order to create a new event in Contentful upon submission. The `index.js` file here is the script used in the Zapier integration. It is only intended to create a draft event as some fields still need to be input manually via Contentful.

When Zapier gets the input from the Typeform, all fields are strings. In order for these to work in Contentful some of these are transformed to numbers (e.g. the price) or to options (e.g. the categories). In the case of options it is important that the values for the multiple choice fields match the exact casing expected in Contentful. You can find these values in Contentful via the Content Model for the event, navigating to the appropriate fields settings and looking at the validations tab.
