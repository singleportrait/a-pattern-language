export const confidenceDisplay = (confidence: 'low' | 'medium' | 'high') => {
  switch (confidence) {
    case 'low':
      return '';
    case 'medium':
      return '*';
    case 'high':
      return '**';
  }
};
