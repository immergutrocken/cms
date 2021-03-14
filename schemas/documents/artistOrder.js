export default {
  name: "artistOrder",
  type: "document",
  title: "Künstler Reihenfolge",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      type: "array",
      name: "artists",
      title: "Künstler",
      of: [
        {
          type: "reference",
          to: [{ type: "artist" }],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Künstler Reihenfolge",
      };
    },
  },
};
