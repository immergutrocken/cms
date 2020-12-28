import { RiMusic2Line } from "react-icons/ri";
import { slug } from "../fields/slug";
import localizedTabs from "./localizedTabs";
import image from "../fields/image";
import blockContent from "../fields/blockContent";
import externalLink from "../fields/externalLink";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaSpotify,
  FaTwitter,
  FaVimeo,
  FaYoutube,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

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
  blockContent,
];

export default {
  type: "document",
  name: "artist",
  title: "Künstler*in",
  icon: RiMusic2Line,
  fields: [
    localizedTabs(fields),
    slug,
    {
      title: "Autor",
      name: "author",
      type: "string",
    },
    {
      type: "string",
      name: "category",
      title: "Kategorie",
      options: {
        list: [
          { title: "Musik", value: "music" },
          { title: "Lesung", value: "reading" },
        ],
        layout: "dropdown",
      },
    },
    {
      type: "array",
      name: "socialMedia",
      title: "Social Media",
      of: [
        {
          type: "object",
          name: "link",
          title: "Social Media Link",
          fields: [
            {
              type: "string",
              name: "medium",
              title: "Soziales Medium",
              options: {
                list: [
                  { title: "Website", value: "Website" },
                  { title: "YouTube", value: "YouTube" },
                  { title: "Facebook", value: "Facebook" },
                  { title: "Twitter", value: "Twitter" },
                  { title: "Instagram", value: "Instagram" },
                  { title: "Vimeo", value: "Vimeo" },
                  { title: "TikTok", value: "TikTok" },
                  { title: "Spotify", value: "Spotify" },
                ],
              },
            },
            externalLink,
          ],
          preview: {
            select: {
              title: "medium",
            },
            prepare(selection) {
              const { title } = selection;
              let media;
              switch (title) {
                case "Website":
                  media = FaGlobe;
                  break;
                case "Youtube":
                  media = FaYoutube;
                  break;
                case "Facebook":
                  media = FaFacebook;
                  break;
                case "Twitter":
                  media = FaTwitter;
                  break;
                case "Instagram":
                  media = FaInstagram;
                  break;
                case "Vimeo":
                  media = FaVimeo;
                  break;
                case "TikTok":
                  media = SiTiktok;
                  break;
                case "Spotify":
                  media = FaSpotify;
                  break;
                default:
                  break;
              }
              return {
                title: title,
                media: media,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "languages.de.title",
      subtitle: "languages.de.subtitle",
      media: "languages.de.banner",
    },
  },
};
