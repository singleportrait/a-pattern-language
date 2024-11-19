import { defineQuery } from "next-sanity";

const patternBaseFields = /* groq */ `
  _id,
  name,
  number,
  "slug": slug.current,
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

export const patternQuery = defineQuery(`
  *[_type == "pattern" && slug.current == $slug] {
    ${patternBaseFields}
    confidence,
    page,
    problem,
    solution,
    "smallerPatterns": smallerPatterns[]${blockContent},
    "largerPatterns": largerPatterns[]${blockContent}
  }[0]
`);
