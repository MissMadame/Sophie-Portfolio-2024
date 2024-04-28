import {defineField, defineType} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    orderRankField({type: 'project'}), // Add this as the first field for easy access
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'otherImages',
      title: 'Other Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'array',
      of: [{type: 'file'}],
      description: 'Upload video files (mp4 recommended)',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'labels',
      title: 'Labels',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'text',
      description: 'Provide date of the project',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Provide a detailed description of the project',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title,
        media,
      }
    },
  },
})
