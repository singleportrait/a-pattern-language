import { type SchemaTypeDefinition } from "sanity";
import { pattern } from "./pattern";
import { blockContent } from "./blockContent";
import { section } from "./section";
import { subSection } from "./subSection";
import { page } from "./page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pattern, blockContent, section, subSection, page],
};
