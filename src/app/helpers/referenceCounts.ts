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

type ReferencesList = {
  [key: string]: PatternBaseDto[];
};

const addFormattedReferenceData = (
  pattern: PatternBaseWithReferencesDto,
  references: ReferencesList,
  referencesToAdd: PatternBaseDto[]
) => {
  referencesToAdd.forEach((reference) => {
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
};

export const addReferenceCounts = (
  patterns: PatternBaseWithReferencesDto[]
) => {
  const references: ReferencesList = {};

  patterns.forEach((pattern: PatternBaseWithReferencesDto) => {
    if (pattern.earlierPatternReferences) {
      addFormattedReferenceData(
        pattern,
        references,
        pattern.earlierPatternReferences
      );
    }

    if (pattern.laterPatternReferences) {
      addFormattedReferenceData(
        pattern,
        references,
        pattern.laterPatternReferences
      );
    }
  });

  patterns.map((pattern: PatternBaseWithReferencesDto) => {
    pattern.references = references[pattern.name] || [];
  });
};
