import { PortableTextBlock } from 'next-sanity';

const defaults = { nonTextBehavior: 'remove' };

const portableTextToPlainText = (blocks: PortableTextBlock[], opts = {}) => {
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`;
      }

      return block.children.map(child => child.text).join('');
    })
    .join('\n\n');
};

export default portableTextToPlainText;
