export type Pattern = {
  _id: string;
  name: string;
  number: number;
  slug: string;
  confidence: "low" | "medium" | "high";
  page: number;
  problem: string;
  solution: string;
  // smallerPatterns: BlockContent[];
};
