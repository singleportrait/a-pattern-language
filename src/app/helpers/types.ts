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

export interface PageDto {
  _id: string;
  name: string;
  slug: string;
  content: PortableTextBlock;
  page: string;
}

export interface PageSectionDto {
  _id: string;
  name: string;
  slug: string;
  content: PortableTextBlock;
  image: ImageReferenceDto;
}

export interface SubSectionItemPatternDto extends PatternBaseDto {
  _type: string;
  sections: {
    _id: string;
    name: string;
    slug: string;
  }[];
}

export interface SubSectionItemPageDto extends PageDto {
  _type: string;
  sections: {
    _id: string;
    name: string;
    slug: string;
  }[];
}
export interface SubSectionDto {
  _key: string;
  title?: string;
  description?: string;
  // TODO: Use PatternBaseDto? Remove earlierPatternReferences from these sub-sections? (not sure why they're here)
  patterns?: PatternBaseDto[];
  items?: (SubSectionItemPatternDto | SubSectionItemPageDto)[];
}
export interface SectionDto {
  _id: string;
  name: string;
  order: number;
  description: PortableTextBlock;
  image: ImageReferenceDto;
  subSections: SubSectionDto[];
}
