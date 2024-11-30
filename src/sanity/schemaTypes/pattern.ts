import { defineField, defineType } from "sanity";
import CustomNumberInput from "../components/CustomNumberInput";

export const pattern = defineType({
  name: "pattern",
  title: "Pattern",
  type: "document",
  fields: [
    defineField({
      name: "numberString",
      title: "Number",
      type: "string",
      options: {
        search: { weight: 20 },
      },
      validation: (rule) => rule.required().regex(/^\d+$/),
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "page",
      title: "Page in book",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "earlierPatterns",
      title: "Earlier Patterns",
      type: "blockContent",
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
      name: "laterPatterns",
      title: "Later Patterns",
      type: "blockContent",
    }),
    {
      title: "Diagram",
      name: "diagram",
      type: "image",
    },
    {
      title: "Image",
      name: "image",
      type: "image",
    },
    defineField({
      name: "number",
      title: "Number for sorting (automatically generated)",
      type: "number",
      components: {
        input: CustomNumberInput,
      },
    }),
  ],
  preview: {
    select: {
      name: "name",
      number: "number",
      media: "image",
      diagram: "diagram",
    },
    prepare(selection) {
      const { name, number, media, diagram } = selection;
      return {
        title: `${number ? `${number}. ` : ""}${name}`,
        media: media || diagram,
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
