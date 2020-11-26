import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import youtube from "./components/youtube";
import localeArticle from "./documents/localeArticle";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([youtube, localeArticle]),
});
