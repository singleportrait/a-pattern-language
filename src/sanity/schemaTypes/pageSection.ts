import { defineField, defineType } from "sanity";

export const pageSection = defineType({
  name: "pageSection",
  title: "Page Section",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: { source: "name" },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
    }),
  ],
});
