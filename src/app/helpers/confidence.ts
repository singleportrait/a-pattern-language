import { Confidence } from '@/sanity/lib/definitions';

export const confidenceDisplay = (confidence: Confidence) => {
  switch (confidence) {
    case Confidence.Low:
      return '';
    case Confidence.Medium:
      return '*';
    case Confidence.High:
      return '**';
  }
};
