export default {
  name: "igImage",
  type: "image",
  title: "Bild",
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: "Caption",
      name: "caption",
      type: "string",
      description: "Bildunterschrift",
      options: {
        isHighlighted: true,
      },
    },
    {
      title: "Alternativer Text",
      name: "alt",
      type: "string",
      description:
        "Text der angezeigt wird, wenn das Bild nicht geladen werden kann.",
      options: {
        isHighlighted: true,
      },
    },
    {
      title: "Credits",
      name: "credits",
      type: "string",
      options: {
        isHighlighted: true,
      },
    },
  ],
};
