import { PortableTextBlock } from "@portabletext/types";
export interface PatternDto {
  _id: string;
  name: string;
  number: number;
  slug: string;
  confidence: "low" | "medium" | "high";
  page: number;
  problem: string;
  solution: string;
  earlierPatterns: PortableTextBlock;
  laterPatterns: PortableTextBlock;
}

export interface PatternInlineReferenceBlock {
  _type: "patternReference";
  _ref: string;
  _key: string;
  name: string;
  number: number;
  slug: string;
}

export interface SubSectionDto {
  _key: string;
  description?: string;
  patterns: PatternDto[];
}
export interface SectionDto {
  _id: string;
  name: string;
  order: number;
  description: string;
  subSections: SubSectionDto[];
}
