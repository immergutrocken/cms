import S from "@sanity/desk-tool/structure-builder";
import { MdFormatListNumbered } from "react-icons/md";

export default () =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !["sortings"].includes(listItem.getId())
      ),
      S.divider(),
      S.listItem()
        .title("Sortierungen")
        .icon(MdFormatListNumbered)
        .child(S.editor().schemaType("sortings").documentId("sortings")),
    ]);
