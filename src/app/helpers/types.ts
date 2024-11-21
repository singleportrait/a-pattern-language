import { PortableTextBlock } from "@portabletext/types";

export interface PatternBaseDto {
  _id: string;
  name: string;
  number: number;
  slug: string;
  confidence: "low" | "medium" | "high";
  referencesCount?: number;
}
export interface PatternDto extends PatternBaseDto {
  page: number;
  problem: string;
  solution: string;
  earlierPatterns: PortableTextBlock;
  laterPatterns: PortableTextBlock;
}

export interface PatternBaseWithReferencesDto extends PatternBaseDto {
  earlierPatternReferences?: PatternBaseDto[];
}

export interface PatternInlineReferenceBlockDto {
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
