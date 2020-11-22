import Tabs from "sanity-plugin-tabs";
import sanityClient from "part:@sanity/base/client";
import { RiArticleLine } from "react-icons/ri";
import linkCategory from "../fields/linkCategory";

const type = "localeArticle";

const supportedLanguages = [
  { id: "de", title: "Deutsch", isDefault: true },
  { id: "en", title: "Englisch" },
];

function slugify(input) {
  const slugyfiedTitle = input.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .slice(0, 200);

  const query =
    "count(*[_type == $type && languages.de.slug.current == $slug && _id !=$id ]{_id})";
  const params = { slug: slugyfiedTitle, id: input.id, type: type };
  return sanityClient.fetch(query, params).then((count) => {
    console.log(count);
    if (count === 0) {
      return slugyfiedTitle;
    } else {
      return `${slugyfiedTitle}-${count + 1}`;
    }
  });
}

const fields = [
  {
    type: "string",
    name: "title",
    title: "Titel",
  },
  {
    title: "Slug",
    name: "slug",
    type: "slug",
    options: {
      source: (doc) => ({ title: doc.languages.de.title, id: doc._id }),
      slugify: slugify,
    },
    validation: (Rule) => Rule.required(),
    hideInOtherLang: true,
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
    title: "Tags",
    name: "tags",
    type: "array",
    of: [{ type: "reference", to: [{ type: "tag" }] }],
    options: {
      layout: "tags",
    },
  },
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
  name: type,
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
  ],
  preview: {
    select: {
      title: "content.de.title",
      media: "content.de.banner",
    },
  },
};
