// @flow
// Ideally the keys here should be consts, but currently these are setup in
// contentful only as the label, hence we need to use this for the key too.
// If we move to realise categories as its own content type then this will
// go away and we will fetch this data.
import * as colors from "./colors";
import type { EventCategoryMap } from "../data/event-deprecated";

const categories: EventCategoryMap = {
  "en-GB": {
    "Cabaret and Variety": {
      label: "Cabaret and Variety",
      color: colors.coralColor,
      contrast: false
    },
    Community: {
      label: "Community",
      color: colors.brightLightBlueColor,
      contrast: true
    },
    "Talks and Debates": {
      label: "Talks and Debates",
      color: colors.darkSkyBlueColor,
      contrast: false
    },
    "Film and Screenings": {
      label: "Film and Screenings",
      color: colors.lightTealColor,
      contrast: true
    },
    "Plays and Theatre": {
      label: "Plays and Theatre",
      color: colors.warmPinkColor,
      contrast: false
    },
    "Social and Networking": {
      label: "Social and Networking",
      color: colors.turquoiseBlueColor,
      contrast: true
    },
    Nightlife: {
      label: "Nightlife",
      color: colors.yellowColor,
      contrast: true
    },
    "Exhibition and Tours": {
      label: "Exhibition and Tours",
      color: colors.brightPurpleColor,
      contrast: false
    },
    "Sports and Activities": {
      label: "Sports and Activities",
      color: colors.vomitYellowColor,
      contrast: true
    },
    Health: {
      label: "Health",
      color: colors.bubblegumPinkColor,
      contrast: true
    },
    Music: {
      label: "Music",
      color: colors.cornflowerBlueColor,
      contrast: false
    }
  }
};

export default categories;
