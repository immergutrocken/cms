import linkCategory from "./linkCategory";

export default {
  name: "link",
  type: "object",
  title: "External link",
  fields: [
    { ...linkCategory, validation: (Rule) => Rule.required() },
    {
      name: "href",
      type: "url",
      title: "URL",
    },
    {
      title: "Open in new tab",
      name: "blank",
      type: "boolean",
    },
  ],
};
