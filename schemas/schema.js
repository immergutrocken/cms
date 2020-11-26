import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import youtube from "./components/youtube";
import article from "./documents/article";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([article]),
});
