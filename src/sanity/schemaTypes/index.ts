import { type SchemaTypeDefinition } from "sanity";
import { pattern } from "./pattern";
import { blockContent } from "./blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pattern, blockContent],
};
