import { RiArticleLine } from "react-icons/ri";
import { slug } from "../fields/slug";
import image from "../fields/image";
import blockContent from "../fields/blockContent";
import contactForm from "../fields/contactForm";
import expander from "../fields/expander";
import localizedTabs from "./localizedTabs";
import { threeColumns, twoColumns } from "../fields/columns";

const fields = [
  {
    type: "string",
    name: "title",
    title: "Titel",
    validation: (Rule) => Rule.required(),
  },
  {
    type: "string",
    name: "subtitle",
    title: "Untertitel",
  },
  {
    ...image,
    title: "Banner",
    name: "banner",
    validation: (Rule) => Rule.required(),
  },
  {
    ...blockContent,
    of: [
      ...blockContent.of,
      contactForm,
      expander,
      {
        type: "object",
        name: "articleGallery",
        title: "Artikel Galerie",
        fields: [
          {
            type: "array",
            name: "articles",
            title: "Artikel",
            of: [
              {
                type: "reference",
                to: [{ type: "article" }],
              },
            ],
          },
        ],
      },
    ],
    validation: (Rule) => Rule.required(),
  },
];

export default {
  type: "document",
  name: "article",
  icon: RiArticleLine,
  title: "Artikel",
  fields: [
    localizedTabs(fields),
    slug,
    {
      title: "Autor",
      name: "author",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "News",
      name: "isNews",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: "languages.de.title",
      subtitle: "languages.de.subtitle",
      media: "languages.de.banner",
    },
  },
  initialValue: {
    isNews: true,
  },
};
