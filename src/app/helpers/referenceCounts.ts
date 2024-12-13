import type { PatternBaseDto, PatternBaseWithReferencesDto } from '@/sanity/lib/definitions';

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
  referencesToAdd: PatternBaseDto[],
) => {
  referencesToAdd.forEach(reference => {
    const refName = reference.name;
    // Add the reference for the pattern
    if (references[refName]) {
      if (!references[refName].find(ref => ref._id === pattern._id)) {
        references[refName].push(formattedPatternData(pattern));
      }
    } else {
      references[refName] = [formattedPatternData(pattern)];
    }
  });
};

export const addReferenceCounts = (patterns: PatternBaseWithReferencesDto[]) => {
  const references: ReferencesList = {};

  patterns.forEach((pattern: PatternBaseWithReferencesDto) => {
    if (pattern.earlierPatternReferences) {
      addFormattedReferenceData(pattern, references, pattern.earlierPatternReferences);
    }

    if (pattern.laterPatternReferences) {
      addFormattedReferenceData(pattern, references, pattern.laterPatternReferences);
    }
  });

  patterns.map((pattern: PatternBaseWithReferencesDto) => {
    pattern.references = references[pattern.name] || [];
  });
};

export const generateLinksDataForD3 = (
  patterns: PatternBaseWithReferencesDto[],
  selectedNumber?: number,
  includeAllNodes?: boolean,
) => {
  const selectedPattern = selectedNumber
    ? patterns.find(pattern => pattern.number === selectedNumber)
    : null;

  // Filter patterns to only include those that are referenced by the selected pattern
  const filteredPatterns =
    selectedNumber && selectedPattern && !includeAllNodes
      ? patterns.filter(
          pattern =>
            selectedPattern.references?.find(reference => reference._id === pattern._id) ||
            pattern._id === selectedPattern._id,
        )
      : patterns;

  const nodes: { id: string; name: string; number: number; group: number }[] = filteredPatterns.map(
    pattern => {
      return {
        id: pattern.slug,
        name: pattern.name,
        number: pattern.number,
        group: pattern.number < 95 ? 1 : pattern.number < 205 ? 2 : 3,
      };
    },
  );

  const links: { source: string; target: string; value: number }[] = [];
  const patternsToLink = selectedPattern ? [selectedPattern] : patterns;
  patternsToLink.map(pattern => {
    pattern.references?.map(reference => {
      links.push({
        source: pattern.slug,
        target: reference.slug,
        value: 1,
      });
    });
  });

  return { nodes, links };
};
