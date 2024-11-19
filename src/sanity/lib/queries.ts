import { defineQuery } from "next-sanity";

// problem,
// solution,
const patternBaseFields = /* groq */ `
  _id,
  name,
  number,
  "slug": slug.current,
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
    // "smallerPatterns": smallerPatterns[]{
    //   // if the type is block...
    //   _type == 'block' => {
    //     ...,
    //     // get the childrens array, and...
    //     children[]{
    //       ...,
    //       // if a childrens type is our pattern reference,...
    //       _type == 'patternReference' => {
    //         ...,
    //         // create a new key value pair named "patternName" with the value name value of the referenced pattern document
    //         "patternName": @->.name
    //       }
    //     }
    //   }
    // }
  }[0]
`);
