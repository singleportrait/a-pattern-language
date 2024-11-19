export interface Pattern {
  _id: string;
  name: string;
  number: number;
  slug: string;
  confidence: "low" | "medium" | "high";
  page: number;
  problem: string;
  solution: string;
  // smallerPatterns: BlockContent[];
}

export interface PatternInlineReferenceBlock {
  _type: "patternReference";
  _ref: string;
  _key: string;
  name: string;
  number: number;
  slug: string;
}
