import { defineField, defineType } from "sanity";

export const pattern = defineType({
  name: "pattern",
  title: "Pattern",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Number",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: { source: "name" },
    }),
    defineField({
      name: "confidence",
      title: "Confidence",
      type: "string",
      options: {
        list: [
          { title: "High confidence **", value: "high" },
          { title: "Medium confidence *", value: "medium" },
          { title: "Low confidence -", value: "low" },
        ],
      },
    }),
    defineField({
      name: "page",
      title: "Page in book",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "problem",
      title: "Problem",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "smallerPatterns",
      title: "Smaller Patterns",
      type: "blockContent",
    }),
    defineField({
      name: "largerPatterns",
      title: "Larger Patterns",
      type: "blockContent",
    }),
    {
      title: "Image",
      name: "image",
      type: "image",
    },
    {
      title: "Diagram",
      name: "diagram",
      type: "image",
    },
  ],
  preview: {
    select: {
      name: "name",
      number: "number",
      media: "image",
    },
    prepare(selection) {
      const { name, number, media } = selection;
      return {
        title: `${number}. ${name}`,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Number Ascending",
      name: "numberAsc",
      by: [{ field: "number", direction: "asc" }],
    },
  ],
});
