import Tabs from "sanity-plugin-tabs";
import { RiArticleLine } from "react-icons/ri";
import { slug } from "../fields/slug";
import image from "../fields/image";
import youtube from "../components/youtube";
import imageGallery from "../components/imageGallery";
import link from "../fields/link";
import externalLink from "../fields/externalLink";
import { withCTA } from "../fields/fieldExtender";
import internalLink from "../fields/internalLink";
import supportedLanguages from "../../config/supportedLanguages";

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
  {
    title: "Inhalt",
    name: "content",
    type: "array",
    of: [
      {
        type: "block",
        marks: {
          annotations: [
            withCTA(externalLink),
            withCTA(internalLink("article")),
          ],
        },
      },
      youtube,
      {
        ...image,
        title: "Bild",
        fields: [...image.fields, link(["article"])],
      },
      imageGallery,
    ],
  },
];

const buildFields = () => {
  const languagedFields = [];
  supportedLanguages.forEach((lang) => {
    const langObject = {
      type: "object",
      name: lang.id,
      title: lang.title,
      fieldset: lang.id + "-tab",
      fields: fields,
    };
    languagedFields.push(langObject);
  });
  return languagedFields;
};

export default {
  type: "document",
  name: "article",
  icon: RiArticleLine,
  title: "Artikel",
  fields: [
    {
      name: "languages",
      type: "object",
      inputComponent: Tabs,
      fieldsets: supportedLanguages.map((lang) => ({
        name: lang.id + "-tab",
        title: lang.title,
      })),
      fields: buildFields(),
    },
    slug,
    {
      title: "Autor",
      name: "author",
      type: "string",
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
      media: "languages.de.banner",
    },
  },
};
