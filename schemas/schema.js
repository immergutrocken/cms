// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
import sanityClient from "part:@sanity/base/client";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import { RiArticleLine } from "react-icons/ri";
import localeString from "./localeString";
import localeImage from "./localeImage";

function slugifyy(input, type) {
  const slug = input.toLowerCase().replace(/\s+/g, "-").slice(0, 200);

  const query = 'count(*[_type=="article" && slug.current == $slug]{_id})';
  const params = { slug: slug };
  return sanityClient.fetch(query, params).then((count) => {
    return `${slug}-${count + 1}`;
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
            source: "title.de",
            maxLength: 200, // will be ignored if slugify is set
            slugify: slugifyy,
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
