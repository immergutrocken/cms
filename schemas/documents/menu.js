import { RiMenuAddLine } from "react-icons/ri";
import link from "../fields/link";

export default {
  title: "Menü",
  type: "document",
  name: "menu",
  icon: RiMenuAddLine,
  fields: [
    {
      type: "string",
      name: "title",
      title: "Titel",
    },
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
        { ...link(["article"]) },
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
