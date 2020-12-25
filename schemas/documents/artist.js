import { RiArticleLine, RiMusic2Line } from "react-icons/ri";
import { slug } from "../fields/slug";
import localizedTabs from "./localizedTabs";
import image from "../fields/image";
import blockContent from "../fields/blockContent";
import externalLink from "../fields/externalLink";

const fields = [
  {
    type: "string",
    name: "title",
    title: "Titel",
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
  },
  blockContent,
];

export default {
  type: "document",
  name: "artist",
  title: "Künstler*in",
  icon: RiMusic2Line,
  fields: [
    localizedTabs(fields),
    slug,
    {
      title: "Autor",
      name: "author",
      type: "string",
    },
    {
      type: "string",
      name: "category",
      title: "Kategorie",
      options: {
        list: [
          { title: "Musik", value: "music" },
          { title: "Lesung", value: "reading" },
        ],
        layout: "dropdown",
      },
    },
    {
      type: "array",
      name: "socialMedia",
      title: "Social Media",
      of: [
        {
          type: "object",
          name: "link",
          title: "Social Media Link",
          fields: [
            {
              type: "string",
              name: "medium",
              title: "Soziales Medium",
              options: {
                list: [
                  { title: "Youtube", value: "youtube" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter", value: "twitter" },
                ],
              },
            },
            externalLink,
          ],
          preview: {
            select: {
              title: "medium",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "languages.de.title",
      media: "languages.de.banner",
    },
  },
};
