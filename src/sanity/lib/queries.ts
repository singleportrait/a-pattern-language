import { defineQuery } from "next-sanity";

/* ---------- SHARED -- */
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
        "name": @->.name,
        "number": @->.number,
        "slug": @->.slug.current,
      }
    }
  }
}
`;

// Return all references included in block content !
const blockContentReferencesOnly = /* groq */ `
  [@._type == 'block'].children[@._type == 'patternReference'] {
    "_id": @->._id,
    "name": @->.name,
    "number": @->.number,
    "slug": @->.slug.current,
    "confidence": @->.confidence,
  }
`;

/* ---------- PATTERNS -- */
const patternBaseFields = /* groq */ `
  _id,
  name,
  number,
  "slug": slug.current,
  confidence
`;

export const allPatternsSlugsQuery = defineQuery(`
  *[_type == "pattern" && defined(slug.current)] | order(number asc) {
    ${patternBaseFields}
  }
`);

// TODO: Add later pattern references
export const allPatternsWithReferencesPatternsQuery = defineQuery(`
  *[_type == "pattern" && defined(slug.current)] | order(number asc) {
    ${patternBaseFields},
    image,
    diagram,
    "earlierPatternReferences": earlierPatterns${blockContentReferencesOnly},
    "laterPatternReferences": laterPatterns${blockContentReferencesOnly},
  }
`);

export const patternSlugQuery = defineQuery(`
  *[_type == "pattern" && slug.current == $slug] {
    ${patternBaseFields},
    page,
    problem,
    solution,
    "earlierPatterns": earlierPatterns[]${blockContent},
    "laterPatterns": laterPatterns[]${blockContent},
    image,
    diagram,
  }[0]
`);

export const patternSiblingsQuery = defineQuery(`
  {
    "previousPattern": *[_type == "pattern" && number == $number - 1] {
      ${patternBaseFields},
    }[0],
    "nextPattern": *[_type == "pattern" && number == $number + 1] {
      ${patternBaseFields},
    }[0]
  }
`);

/* ---------- PAGES -- */
const pageBaseFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  page
`;

export const allPagesSlugsQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)] {
    ${pageBaseFields}
  }
`);

export const pageSlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $pageSlug] {
    ${pageBaseFields},
    "content": content[]${blockContent},
  }[0]
`);

/* ---------- SECTIONS -- */
export const sectionsQuery = defineQuery(`
  *[_type == "section"] | order(order asc) {
    _id,
    name,
    order,
    description,
    image,
    "subSections": subSections[]{
      _key,
      title,
      description,
      "patternsOriginal": patterns[],
      "patterns": patterns[]{
        "_id": @->._id,
        "name": @->.name,
        "number": @->.number,
        "slug": @->.slug.current,
        "confidence": @->.confidence,
        "earlierPatternReferences": @->.earlierPatterns${blockContentReferencesOnly},
      }
    }
  }
`);
