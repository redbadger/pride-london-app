// @flow
// Ideally the keys here should be consts, but currently these are setup in
// contentful only as the label, hence we need to use this for the key too.
// If we move to realise categories as its own content type then this will
// go away and we will fetch this data.
import * as colors from "./colors";
import type { EventCategoryMap } from "../data/event";

const categories: EventCategoryMap = {
  "en-GB": {
    "Cabaret and Variety": {
      label: "Cabaret and Variety",
      color: colors.coralColor
    },
    Community: {
      label: "Community",
      color: colors.brightLightBlueColor
    },
    "Talks and Debates": {
      label: "Talks and Debates",
      color: colors.darkSkyBlueColor
    },
    "Film and Screenings": {
      label: "Film and Screenings",
      color: colors.lightTealColor
    },
    "Plays and Theatre": {
      label: "Plays and Theatre",
      color: colors.warmPinkColor
    },
    "Social and Networking": {
      label: "Social and Networking",
      color: colors.turquoiseBlueColor
    },
    Nightlife: {
      label: "Nightlife",
      color: colors.yellowColor,
      contrast: true
    },
    "Exhibition and Tours": {
      label: "Exhibition and Tours",
      color: colors.brightPurpleColor
    },
    "Sports and Activities": {
      label: "Sports and Activities",
      color: colors.vomitYellowColor
    },
    Health: {
      label: "Health",
      color: colors.bubblegumPinkColor
    },
    Music: {
      label: "Music",
      color: colors.cornflowerBlueColor
    }
  }
};

export default categories;
