import { defineField, defineType } from "sanity";

export const blockContentImage = defineType({
  name: "blockContentImage",
  title: "Block Content Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "alt",
      title: "Alt",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "captionUrl",
      title: "Caption URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
  },
});
