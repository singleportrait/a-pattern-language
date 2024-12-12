import { type SchemaTypeDefinition } from "sanity";
import { pattern } from "./pattern";
import { blockContent } from "./blockContent";
import { section } from "./section";
import { subSection } from "./subSection";
import { page } from "./page";
import { pageSection } from "./pageSection";
import { blockContentImages } from "@/sanity/schemaTypes/blockContentImages";
import { blockContentImage } from "@/sanity/schemaTypes/blockContentImage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pattern,
    blockContent,
    section,
    subSection,
    page,
    pageSection,
    blockContentImage,
    blockContentImages,
  ],
};
