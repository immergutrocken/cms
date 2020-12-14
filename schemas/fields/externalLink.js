import localeString from "./localeString";

import { HiOutlineExternalLink } from "react-icons/hi";

export default {
  title: "External Link",
  name: "link",
  type: "object",
  icon: HiOutlineExternalLink,
  fields: [
    {
      title: "URL",
      name: "url",
      type: "url",
    },
    {
      title: "Open in new tab",
      name: "blank",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: "title.de",
    },
  },
};
