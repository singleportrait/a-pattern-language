import { defineField, defineType } from "sanity";

export const subSection = defineType({
  name: "subSection",
  title: "Sub-section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Sub-section title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Sub-section description",
      type: "text",
    }),
    defineField({
      name: "patterns",
      title: "Patterns",
      type: "array",
      of: [{ type: "reference", to: [{ type: "pattern" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      patterns: "patterns",
      pattern1Number: "patterns.0.number",
    },
    prepare({ title, description, patterns, pattern1Number }) {
      const combinedTitle =
        !title && !description
          ? "Untitled"
          : `${title ? `${title}: ` : ""} ${description || ""}`;
      if (!patterns || !pattern1Number) {
        return {
          title: combinedTitle,
          subtitle: "No patterns",
        };
      }
      const calculatedLastPattern =
        Object.values(patterns).length - 1 + parseInt(pattern1Number, 10);
      const displayLabel =
        calculatedLastPattern === pattern1Number ? "Pattern" : "Patterns";
      const displayRange =
        calculatedLastPattern === pattern1Number
          ? pattern1Number
          : `${pattern1Number} – ${calculatedLastPattern}`;
      return {
        title: combinedTitle,
        subtitle: `${displayLabel} ${displayRange}`,
      };
    },
  },
});
