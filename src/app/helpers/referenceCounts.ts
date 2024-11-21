import { PatternBaseDto, PatternBaseWithReferencesDto } from "./types";

const formattedPatternData = (pattern: PatternBaseWithReferencesDto) => {
  return {
    _id: pattern._id,
    name: pattern.name,
    number: pattern.number,
    slug: pattern.slug,
    confidence: pattern.confidence,
  };
};

export const addReferenceCounts = (
  patterns: PatternBaseWithReferencesDto[]
) => {
  const references: {
    [key: string]: PatternBaseDto[];
  } = {};

  patterns.forEach((pattern: PatternBaseWithReferencesDto) => {
    if (pattern.earlierPatternReferences) {
      pattern.earlierPatternReferences.forEach((reference) => {
        const refName = reference.name;
        // Add the reference for the pattern
        if (references[refName]) {
          if (!references[refName].find((ref) => ref._id === pattern._id)) {
            references[refName].push(formattedPatternData(pattern));
          }
        } else {
          references[refName] = [formattedPatternData(pattern)];
        }
      });
    }
  });

  patterns.map((pattern: PatternBaseWithReferencesDto) => {
    pattern.references = references[pattern.name] || [];
  });
};
