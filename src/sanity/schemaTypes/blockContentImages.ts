import { defineField, defineType } from 'sanity';

export const blockContentImages = defineType({
  name: 'blockContentImages',
  title: 'Images row',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'blockContentImage',
        },
      ],
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      return {
        title: images && images.length > 0 ? `${images.length} image(s)` : 'No images',
      };
    },
  },
});
