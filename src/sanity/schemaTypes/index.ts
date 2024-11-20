import { type SchemaTypeDefinition } from "sanity";
import { pattern } from "./pattern";
import { blockContent } from "./blockContent";
import { section } from "./section";
import { subSection } from "./subSection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pattern, blockContent, section, subSection],
};
