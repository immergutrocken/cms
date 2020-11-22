import Tabs from "sanity-plugin-tabs";
import sanityClient from "part:@sanity/base/client";
import { RiArticleLine } from "react-icons/ri";

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
    "count(*[_type == $type && slug.current == $slug && _id !=$id ]{_id})";
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
      source: (doc) => ({ title: doc.content.de.title, id: doc._id }),
      slugify: slugify,
    },
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
    of: [{ type: "string" }],
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
                {
                  title: "Kategorie",
                  name: "category",
                  type: "string",
                  options: {
                    list: [
                      { title: "Normal", value: "normal" },
                      {
                        title: "Call To Action",
                        value: "call-to-action",
                      },
                    ],
                  },
                },
                {
                  name: "href",
                  type: "url",
                  title: "URL",
                },
                {
                  title: "Open in new tab",
                  name: "blank",
                  description: "Read https://css-tricks.com/use-target_blank/",
                  type: "boolean",
                },
              ],
            },
            {
              name: "internalLink",
              type: "object",
              title: "Internal link",
              fields: [
                {
                  title: "Kategorie",
                  name: "category",
                  type: "string",
                  options: {
                    list: [
                      { title: "Normal", value: "normal" },
                      {
                        title: "Call To Action",
                        value: "call-to-action",
                      },
                    ],
                  },
                },
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
      name: "content",
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
