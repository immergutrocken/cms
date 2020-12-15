import { RiGiftLine } from "react-icons/ri";
import externalLink from "../fields/externalLink";
import image from "../fields/image";

export default {
  type: "document",
  name: "partner",
  title: "Partner",
  icon: RiGiftLine,
  fields: [
    {
      type: "string",
      name: "title",
      title: "Titel",
    },
    {
      type: "string",
      name: "category",
      title: "Kategorie",
      options: {
        list: [
          { title: "Sponsor", value: "sponsor" },
          { title: "Medienpartner", value: "media-partner" },
          { title: "Außerdem", value: "additional" },
        ],
        layout: "dropdown",
      },
    },
    {
      ...image,
      name: "logo",
      title: "Logo",
    },
    { ...externalLink, title: "Link" },
  ],
  preview: {
    select: {
      title: "title",
      media: "logo",
    },
  },
};
