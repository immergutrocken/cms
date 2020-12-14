import { RiGiftLine } from "react-icons/ri";
import externalLink from "../fields/externalLink";
import image from "../fields/image";

export default {
  type: "document",
  name: "sponsor",
  title: "Partner",
  icon: RiGiftLine,
  fields: [
    {
      type: "string",
      name: "title",
      title: "Titel",
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
