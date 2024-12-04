import { type SchemaTypeDefinition } from "sanity";
import { pattern } from "./pattern";
import { blockContent } from "./blockContent";
import { section } from "./section";
import { subSection } from "./subSection";
import { page } from "./page";
import { pageSection } from "./pageSection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pattern, blockContent, section, subSection, page, pageSection],
};
