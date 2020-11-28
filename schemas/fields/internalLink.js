import linkCategory from "../fields/linkCategory";

export default (references) => ({
  name: "internalLink",
  type: "object",
  title: "Internal link",
  fields: [
    { ...linkCategory, validation: (Rule) => Rule.required() },
    {
      name: "reference",
      type: "reference",
      title: "Reference",
      to: references.map((reference) => ({ type: reference })),
    },
  ],
});
