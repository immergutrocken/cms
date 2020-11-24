import Tabs from "sanity-plugin-tabs";
import { RiArticleLine } from "react-icons/ri";
import linkCategory from "../fields/linkCategory";
import { slug } from "../fields/slug";

const supportedLanguages = [
  { id: "de", title: "Deutsch", isDefault: true },
  { id: "en", title: "Englisch" },
];

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
    type: "igImage",
    name: "banner",
    title: "Banner",
  },
  {
    title: "News",
    name: "isNews",
    type: "boolean",
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
            {
              name: "link",
              type: "object",
              title: "External link",
              fields: [
                linkCategory,
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
            },
            {
              name: "internalLink",
              type: "object",
              title: "Internal link",
              fields: [
                linkCategory,
                {
                  name: "reference",
                  type: "reference",
                  title: "Reference",
                  to: [{ type: "article" }],
                },
              ],
            },
          ],
        },
      },
      { type: "youtube" },
      { type: "igImage" },
    ],
  },
];

const buildFields = () => {
  const languagedFields = [];
  const defaultLang = supportedLanguages.find((lang) => lang.isDefault);
  supportedLanguages.forEach((lang) => {
    const langObject = {
      type: "object",
      name: lang.id,
      title: "Test",
      fieldset: lang.id + "-tab",
      fields: fields,
    };
    languagedFields.push(langObject);
  });
  return languagedFields;
};

export default {
  type: "document",
  name: "localeArticle",
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
  ],
  preview: {
    select: {
      title: "languages.de.title",
      media: "languages.de.banner",
    },
  },
};
