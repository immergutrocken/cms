import sanityClient from "part:@sanity/base/client";

export async function slugify(input) {
  let slugyfiedTitle = input.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/\./g, "")
    .replace(/,/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .slice(0, 200);
  let needNextTest = true;
  let counter = 1;

  const id = input.id.replace("drafts.", "");

  // test for already used slug, if so, count up and check again
  do {
    const query =
      "count(*[_type == $type && slug.current == $slug && _id != $id && _id != 'drafts.' + $id ]{_id})";
    const params = {
      slug: counter === 1 ? slugyfiedTitle : slugyfiedTitle + "-" + counter,
      id: id,
      type: input.type,
    };
    const count = await sanityClient.fetch(query, params);
    if (count === 0) {
      needNextTest = false;
    } else {
      counter++;
    }
  } while (needNextTest);
  if (counter === 1) return slugyfiedTitle;
  else return slugyfiedTitle + "-" + counter;
}

export const slug = {
  title: "Slug",
  name: "slug",
  type: "slug",
  options: {
    source: (doc) => ({
      title: doc.languages.de.title,
      id: doc._id,
      type: doc._type,
    }),
    slugify: slugify,
  },
};
