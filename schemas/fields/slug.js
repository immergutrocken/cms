import sanityClient from "part:@sanity/base/client";

export async function slugify(input) {
  let slugyfiedTitle = input.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .slice(0, 200);
  let needNextTest = true;
  let counter = 1;

  // test for already used slug, if so, count up and check again
  do {
    const query =
      "count(*[_type == 'localeArticle' && slug.current == $slug && _id !=$id ]{_id})";
    const params = {
      slug: counter === 1 ? slugyfiedTitle : slugyfiedTitle + "-" + counter,
      id: input.id,
    };
    const count = await sanityClient.fetch(query, params);
    console.log(count);
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
    source: (doc) => ({ title: doc.languages.de.title, id: doc._id }),
    slugify: slugify,
  },
};
