import React from "react";
import image from "../fields/image";
import sanityClient from "part:@sanity/base/client";
import imageUrlBuilder from "@sanity/image-url";
import { IoMdImages } from "react-icons/io";

console.log(sanityClient);
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

const Preview = ({ value }) => {
  const { images } = value;
  return (
    <div style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}>
      {images &&
        images.map((image) => {
          const url = urlFor(image).width(200).url();
          return (
            <img src={url} style={{ width: "25%", margin: "10px" }} key={url} />
          );
        })}
    </div>
  );
};

export default {
  type: "object",
  name: "imageGallery",
  title: "Bildergalerie",
  icon: IoMdImages,
  fields: [
    {
      type: "array",
      name: "images",
      title: "Bilder",
      of: [image],
    },
  ],
  preview: {
    select: {
      images: "images",
    },
    component: Preview,
  },
};
