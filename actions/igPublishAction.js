import { useState, useEffect } from "react";
import { useDocumentOperation } from "@sanity/react-hooks";
import { slugify } from "../schemas/fields/slug";

export default function igPublishAction(props) {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (isPublishing && !props.draft) setIsPublishing(false);
  }, [props.draft]);

  return {
    disabled: publish.disabled,
    label: isPublishing ? "Publishing..." : "Publish",
    onHandle: async () => {
      setIsPublishing(true);
      const slugifiedTitle = await slugify({
        title: props.draft.languages.de.title,
        id: props.id,
      });
      patch.execute([
        {
          set: {
            slug: {
              _type: "slug",
              current: slugifiedTitle,
            },
          },
        },
      ]);
      publish.execute();
      props.onComplete();
    },
  };
}
