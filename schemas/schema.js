import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import localeString from "./localeString";
import igImage from "./igImage";
import youtube from "./youtube";
import localeArticle from "./localeArticle";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([localeString, igImage, youtube, localeArticle]),
});
