import { PortableTextBlock } from '@portabletext/types';
import { defineQuery } from 'next-sanity';

/* ---------- SHARED -- */
export interface ImageReferenceDto {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  ratio?: number;
}

const imageWithRatioFields = /* groq */ `
  {
    ...,
    "ratio": asset->metadata.dimensions.aspectRatio,
  }
`;

const blockContent = /* groq */ `
{
  // if the type is block...
  _type == 'block' => {
    ...,
    // get the childrens array, and...
    children[]{
      ...,
      // if a childrens type is our pattern reference,...
      _type == 'patternReference' => {
        ...,
        // create a new key value pair named "patternName" with the value name value of the referenced pattern document
        "name": @->name,
        "number": @->number,
        "slug": @->slug.current,
      },
      _type == 'blockContentImages' => {
        ...,
        images[]{
          ...,
          image${imageWithRatioFields},
        }
      }
    }
  }
}
`;

export enum Confidence {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

// Return all references included in block content !
const blockContentReferencesOnly = /* groq */ `
  [@._type == 'block'].children[@._type == 'patternReference'] {
    "_id": @->_id,
    "name": @->name,
    "number": @->number,
    "slug": @->slug.current,
    "confidence": @->confidence,
  }
`;

/* ---------- SECTIONS -- */
export interface PageSectionDto {
  _id: string;
  name: string;
  slug: string;
  content: PortableTextBlock[];
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

export interface SubSectionItemPageDto extends PageBaseDto {
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
  patterns?: PatternBaseDto[];
  items?: (SubSectionItemPatternDto | SubSectionItemPageDto)[];
}
export interface SectionDto {
  _id: string;
  name: string;
  order: number;
  description: PortableTextBlock[];
  image: ImageReferenceDto;
  subSections: SubSectionDto[];
}

const sectionFields = /* groq */ `
  _id,
  name,
  order,
  "description": description[]${blockContent},
  image${imageWithRatioFields},
  "subSections": subSections[]{
    _key,
    title,
    description,
    "patterns": patterns[]{
      "_id": @->_id,
      "name": @->name,
      "number": @->number,
      "slug": @->slug.current,
      "confidence": @->confidence,
    },
    "items": items[]{
      "_id": @->_id,
      "_type": @->_type,
      "slug": @->slug.current,
      "name": @->name,
      @->_type == 'page' => {
        "sections": @->sections[]{
          "_id": @->_id,
          "name": @->name,
          "slug": @->slug.current,
        },
      }
    }
  }
`;

export const sectionsQuery = defineQuery(`
  *[_type == "section"] | order(order asc) {
    ${sectionFields}
  }
`);

/* ---------- PATTERNS -- */
export interface PatternBaseDto {
  _id: string;
  name: string;
  number: number;
  slug: string;
  confidence: Confidence;
  image?: ImageReferenceDto;
  diagram?: ImageReferenceDto;
}

const patternBaseFields = /* groq */ `
  _id,
  name,
  number,
  "slug": slug.current,
  confidence
`;

export const allPatternsQuery = defineQuery(`
  *[_type == "pattern" && defined(slug.current)] | order(number asc) {
    ${patternBaseFields}
  }
`);

export interface PatternBaseWithReferencesDto extends PatternBaseDto {
  earlierPatternReferences?: PatternBaseDto[];
  laterPatternReferences?: PatternBaseDto[];
  references?: PatternBaseDto[];
}

export const allPatternsWithReferencesQuery = defineQuery(`
  *[_type == "pattern" && defined(slug.current)] | order(number asc) {
    ${patternBaseFields},
    image,
    diagram,
    "earlierPatternReferences": earlierPatterns${blockContentReferencesOnly},
    "laterPatternReferences": laterPatterns${blockContentReferencesOnly},
  }
`);

export interface PatternDto extends PatternBaseDto {
  page: number;
  problem: string;
  solution: string;
  earlierPatterns: PortableTextBlock[];
  laterPatterns: PortableTextBlock[];
  isPatternGuide?: boolean;
  sidebarSection?: SectionDto;
  previousPattern?: PatternBaseDto;
  nextPattern?: PatternBaseDto;
}

export const patternBySlugQuery = defineQuery(`
  *[_type == "pattern" && slug.current == $slug] {
    ${patternBaseFields},
    page,
    problem,
    solution,
    "earlierPatterns": earlierPatterns[]${blockContent},
    "laterPatterns": laterPatterns[]${blockContent},
    image${imageWithRatioFields},
    diagram${imageWithRatioFields},
    isPatternGuide,
    "sidebarSection": sidebarSection->{
      ${sectionFields}
    },
    "previousPattern": *[_type == "pattern" && ^.number > 0 && number == ^.number - 1] {
      ${patternBaseFields},
    }[0],
    "nextPattern": *[_type == "pattern" && ^.number > 0 && number == ^.number + 1] {
      ${patternBaseFields},
    }[0],
  }[0]
`);

export interface PatternWithTextContentDto extends PatternDto {
  problem: string;
  solution: string;
  earlierPatterns: PortableTextBlock[];
  laterPatterns: PortableTextBlock[];
}

export const allPatternsWithTextContentQuery = defineQuery(`
    *[_type == "pattern" && defined(slug.current)] | order(number asc) {
    ${patternBaseFields},
    problem,
    solution,
    "earlierPatterns": earlierPatterns[]${blockContent},
    "laterPatterns": laterPatterns[]${blockContent},
  }
`);

/* ---------- PAGES -- */
export interface PageBaseDto {
  _id: string;
  name: string;
  slug: string;
  content: PortableTextBlock[];
  page: string;
}

const pageBaseFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  page
`;

export const allPagesQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)] {
    ${pageBaseFields}
  }
`);

export interface PageDto extends PageBaseDto {
  content: PortableTextBlock[];
  sections: {
    _id: string;
    name: string;
    slug: string;
    content: PortableTextBlock[];
    image: ImageReferenceDto;
  }[];
  sidebarSection: SectionDto;
}

export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $pageSlug] {
    ${pageBaseFields},
    "content": content[]${blockContent},
    "sections": sections[]{
      "_id": @->_id,
      "slug": @->slug.current,
      "name": @->name,
      "content": @->content[]${blockContent},
      "image": @->image${imageWithRatioFields},
    },
    "sidebarSection": sidebarSection->{
      ${sectionFields}
    },
  }[0]
`);
