import portableTextToPlainText from '@/app/helpers/portableTextToPlainText';
import { defineField, defineType } from 'sanity';

export const pageSection = defineType({
  name: 'pageSection',
  title: 'Page Section',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      description: 'content',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title || 'No title',
        subtitle: portableTextToPlainText(selection.description),
        media: selection.media,
      };
    },
  },
});
