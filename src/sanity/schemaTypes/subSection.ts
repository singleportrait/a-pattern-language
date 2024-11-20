import { defineField, defineType } from "sanity";

export const subSection = defineType({
  name: "subSection",
  title: "Sub-section",
  type: "object",
  fields: [
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
      description: "description",
      patterns: "patterns",
      pattern1Number: "patterns.0.number",
    },
    prepare({ description, patterns, pattern1Number }) {
      if (!patterns || !pattern1Number) {
        return {
          title: description,
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
        title: description,
        subtitle: `${displayLabel} ${displayRange}`,
      };
    },
  },
});
