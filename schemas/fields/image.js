import { FaImage } from "react-icons/fa";

export default {
  name: "image",
  type: "image",
  title: "Bild",
  icon: FaImage,
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: "Caption",
      name: "caption",
      type: "string",
      description: "Bildunterschrift",
    },
    {
      title: "Alternativer Text",
      name: "alt",
      type: "string",
      description:
        "Text der angezeigt wird, wenn das Bild nicht geladen werden kann.",
    },
    {
      title: "Credits",
      name: "credits",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
