import sanityClient from "part:@sanity/base/client";

export async function slugify(input) {
  const slugyfiedTitle = input.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .slice(0, 200);

  const query =
    "count(*[_type == 'localeArticle' && slug.current == $slug && _id !=$id ]{_id})";
  const params = { slug: slugyfiedTitle, id: input.id };
  return await sanityClient.fetch(query, params).then((count) => {
    if (count === 0) {
      return slugyfiedTitle;
    } else {
      return `${slugyfiedTitle}-${count + 1}`;
    }
  });
}

export const slug = {
  title: "Slug",
  name: "slug",
  type: "slug",
  options: {
    source: (doc) => ({ title: doc.languages.de.title, id: doc._id }),
    slugify: slugify,
  },
};
