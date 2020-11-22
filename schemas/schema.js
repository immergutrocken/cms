// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
import sanityClient from "part:@sanity/base/client";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import { RiArticleLine } from "react-icons/ri";
import localeString from "./localeString";
import localeImage from "./localeImage";
import youtube from "./youtube";

function slugify(input, type) {
  const parameters = input.split(",");
  const slugyfiedTitle = parameters[0]
    .toLowerCase()
    .replace(/\s+/g, "-")
    .slice(0, 200);

  const query =
    "count(*[_type=='article' && slug.current == $slug && _id !=$id ]{_id})";
  const params = { slug: slugyfiedTitle, id: parameters[1] };
  return sanityClient.fetch(query, params).then((count) => {
    if (count === 0) {
      return slugyfiedTitle;
    } else {
      return `${slugyfiedTitle}-${count + 1}`;
    }
  });
}

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    localeString,
    localeImage,
    youtube,
    {
      title: "Artikel",
      name: "article",
      icon: RiArticleLine,
      type: "document",
      fields: [
        {
          title: "Titel",
          name: "title",
          type: "localeString",
        },
        {
          title: "Untertitel",
          name: "subtitle",
          type: "localeString",
        },
        {
          title: "Slug",
          name: "slug",
          type: "slug",
          options: {
            source: (doc) => `${doc.title.de},${doc._id}`,
            maxLength: 200, // will be ignored if slugify is set
            slugify: slugify,
          },
        },
        {
          title: "Banner",
          name: "banner",
          type: "localeImage",
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
                        description:
                          "Read https://css-tricks.com/use-target_blank/",
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
          ],
        },
      ],
      preview: {
        select: {
          title: "title.de",
          media: "banner",
        },
      },
    },
  ]),
});
