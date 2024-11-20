import { defineField, defineType } from "sanity";

export const section = defineType({
  name: "section",
  title: "Section",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Section name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subSections",
      title: "Sub-sections",
      type: "array",
      of: [{ type: "subSection" }],
    }),
  ],
});
