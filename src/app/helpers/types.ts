import { PortableTextBlock } from "@portabletext/types";

interface ImageReferenceDto {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
export interface PatternBaseDto {
  _id: string;
  name: string;
  number: number;
  slug: string;
  confidence: "low" | "medium" | "high";
  image?: ImageReferenceDto;
  diagram?: ImageReferenceDto;
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
  laterPatternReferences?: PatternBaseDto[];
  references?: PatternBaseDto[];
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
  title?: string;
  description?: string;
  patterns: PatternDto[];
}
export interface SectionDto {
  _id: string;
  name: string;
  order: number;
  description: string;
  image: ImageReferenceDto;
  subSections: SubSectionDto[];
}
