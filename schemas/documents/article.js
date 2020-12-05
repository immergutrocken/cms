import React from "react";
import Tabs from "sanity-plugin-tabs";
import { RiArticleLine } from "react-icons/ri";
import { slug } from "../fields/slug";
import image from "../fields/image";
import youtube from "../components/youtube";
import {
  FaHighlighter,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify,
} from "react-icons/fa";
import link from "../fields/link";

const supportedLanguages = [
  { id: "de", title: "Deutsch", isDefault: true },
  { id: "en", title: "Englisch" },
];

const highlightRender = (props) => (
  <span style={{ backgroundColor: "yellow" }}>{props.children}</span>
);

const alignRender = (align) => (props) => (
  <div
    class="test"
    style={{
      textAlign: align,
    }}
  >
    {props.children}
  </div>
);

const colorRender = (color) => (props) => (
  <span style={{ color: color }}>{props.children}</span>
);

const fields = [
  {
    type: "string",
    name: "title",
    title: "Titel",
  },
  {
    type: "string",
    name: "subtitle",
    title: "Untertitel",
  },
  {
    ...image,
    title: "Banner",
    name: "banner",
  },
  {
    title: "News",
    name: "isNews",
    type: "boolean",
  },
  {
    title: "Inhalt",
    name: "content",
    type: "array",
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "H1", value: "h1" },
          { title: "H2", value: "h2" },
          { title: "Quote", value: "blockquote" },
        ],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
            { title: "Code", value: "code" },
            { title: "Underline", value: "underline" },
            { title: "Strike", value: "strike-through" },
            {
              title: "Highlight",
              value: "highlight",
              blockEditor: {
                icon: FaHighlighter,
                render: highlightRender,
              },
            },
            {
              title: "Align left",
              value: "align-left",
              blockEditor: {
                icon: FaAlignLeft,
                render: alignRender("left"),
              },
            },
            {
              title: "Align center",
              value: "align-center",
              blockEditor: {
                icon: FaAlignCenter,
                render: alignRender("center"),
              },
            },
            {
              title: "Align right",
              value: "align-right",
              blockEditor: {
                icon: FaAlignRight,
                render: alignRender("right"),
              },
            },
            {
              title: "Align justify",
              value: "align-justify",
              blockEditor: {
                icon: FaAlignJustify,
                render: alignRender("justify"),
              },
            },
            {
              title: "Primary Color",
              value: "color-primary",
              blockEditor: {
                icon: () => "CP",
                render: colorRender("red"),
              },
            },
            {
              title: "Secondary Color",
              value: "color-secondary",
              blockEditor: {
                icon: () => "CS",
                render: colorRender("green"),
              },
            },
            {
              title: "Tertiary Color",
              value: "color-tertiary",
              blockEditor: {
                icon: () => "CT",
                render: colorRender("blue"),
              },
            },
          ],
          annotations: [link(["article"])],
        },
      },
      youtube,
      {
        ...image,
        title: "Bild",
        fields: [...image.fields, link(["article"])],
      },
    ],
  },
];

const buildFields = () => {
  const languagedFields = [];
  supportedLanguages.forEach((lang) => {
    const langObject = {
      type: "object",
      name: lang.id,
      title: lang.title,
      fieldset: lang.id + "-tab",
      fields: fields,
    };
    languagedFields.push(langObject);
  });
  return languagedFields;
};

export default {
  type: "document",
  name: "article",
  icon: RiArticleLine,
  title: "Artikel",
  fields: [
    {
      name: "languages",
      type: "object",
      inputComponent: Tabs,
      fieldsets: supportedLanguages.map((lang) => ({
        name: lang.id + "-tab",
        title: lang.title,
      })),
      fields: buildFields(),
    },
    slug,
    {
      title: "Autor",
      name: "author",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "languages.de.title",
      media: "languages.de.banner",
    },
  },
};
