import localeString from "./localeString";
import { HiOutlineLink } from "react-icons/hi";

export default (...references) => ({
  type: "object",
  title: "Internal Link",
  name: "internalLink",
  icon: HiOutlineLink,
  fields: [
    localeString("Titel", "title"),
    {
      name: "reference",
      type: "reference",
      title: "Reference",
      to: references.map((reference) => ({ type: reference })),
    },
  ],
  preview: {
    select: {
      title: "title.de",
    },
  },
});
