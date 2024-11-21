import { PatternBaseWithReferencesDto } from "./types";

export const addReferenceCounts = (
  patterns: PatternBaseWithReferencesDto[]
) => {
  // Create a map to count references
  const referenceCounts: { [key: string]: number } = {};

  patterns.forEach((pattern: PatternBaseWithReferencesDto) => {
    if (pattern.earlierPatternReferences) {
      pattern.earlierPatternReferences.forEach((reference) => {
        const refName = reference.name;
        // Increment the reference count for the pattern
        referenceCounts[refName] = (referenceCounts[refName] || 0) + 1;
      });
    }
  });

  // Convert the referenceCounts object into an array of objects
  // const result = Object.entries(referenceCounts).map(([name, count]) => ({
  //   name,
  //   count,
  // }));

  // // Sort the array in descending order by count
  // result.sort((a, b) => b.count - a.count);

  patterns.map((pattern: PatternBaseWithReferencesDto) => {
    pattern.referencesCount = referenceCounts[pattern.name] || 0;
  });
};
