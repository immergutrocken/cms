import { RiMenuAddLine } from "react-icons/ri";
import link from "../fields/link";
import sanityClient from "part:@sanity/base/client";
import localeString from "../fields/localeString";
import externalLink from "../fields/externalLink";
import internalLink from "../fields/internalLink";

export default {
  title: "Menü",
  type: "document",
  name: "menu",
  icon: RiMenuAddLine,
  fields: [
    {
      type: "string",
      name: "title",
      title: "Name",
    },
    localeString("Titel", "displayName"),
    {
      type: "boolean",
      name: "isMainMenu",
      title: "Ist dieses Menü ein Hauptmenü?",
    },
    {
      type: "array",
      name: "menuEntries",
      title: "Menü Einträge",
      of: [
        externalLink,
        internalLink("article"),
        {
          type: "reference",
          name: "submenu",
          title: "Untermenü",
          to: [{ type: "menu" }],
          options: {
            filter: "isMainMenu == $isMainMenu",
            filterParams: { isMainMenu: false },
          },
        },
      ],
    },
  ],
  initialValue: {
    isMainMenu: false,
  },
};
