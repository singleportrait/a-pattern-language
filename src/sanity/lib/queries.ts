import { defineQuery } from "next-sanity";

const patternBaseFields = /* groq */ `
  _id,
  name,
  number,
  "slug": slug.current,
  confidence,
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
        "name": @->.name,
        "number": @->.number,
        "slug": @->.slug.current,
      }
    }
  }
}
`;

export const allPatternsSlugsQuery = defineQuery(`
  *[_type == "pattern" && defined(slug.current)] | order(number asc) {
    ${patternBaseFields}
  }
`);

// Return all references included in block content !
// const blockContentReferencesOnly = /* groq */ `
// "earlierPatternReferences":
//   earlierPatterns[@._type == 'block']
//   .children[@._type == 'patternReference'] {
//     "name": @->.name,
//     "number": @->.number,
//     "slug": @->.slug.current,
// }
// `;

// export const allPatternsPatternReferences = defineQuery(`
//   *[_type == "pattern" && defined(slug.current)] | order(number asc) {
//     ${patternBaseFields}
//   }
// `);

export const patternQuery = defineQuery(`
  *[_type == "pattern" && slug.current == $slug] {
    ${patternBaseFields}
    page,
    problem,
    solution,
    "earlierPatterns": earlierPatterns[]${blockContent},
    "laterPatterns": laterPatterns[]${blockContent}
  }[0]
`);

export const sectionsQuery = defineQuery(`
  *[_type == "section"] | order(order asc) {
    _id,
    name,
    order,
    description,
    "subSections": subSections[]{
      _key,
      description,
      "patternsOriginal": patterns[],
      "patterns": patterns[]{
        "_id": @->._id,
        "name": @->.name,
        "number": @->.number,
        "slug": @->.slug.current,
        "confidence": @->.confidence,
      }
    }
  }
`);
