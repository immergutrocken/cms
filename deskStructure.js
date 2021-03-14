import S from "@sanity/desk-tool/structure-builder";
import { MdFormatListNumbered } from "react-icons/md";

export default () =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => !["artistOrder"].includes(listItem.getId())
      ),
      S.divider(),
      S.listItem()
        .title("Künstler Reihenfolge")
        .icon(MdFormatListNumbered)
        .child(S.editor().schemaType("artistOrder").documentId("artistOrder")),
    ]);
