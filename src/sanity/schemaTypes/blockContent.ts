import { defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      type: "block",
      of: [
        {
          name: "patternReference",
          type: "reference",
          to: [{ type: "pattern" }],
        },
      ],
    },
  ],
});
