import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project', // Use 'project' for better naming convention
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(), // Ensure title is required
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
        hotspot: true, // Allow cropping and resizing
      },
      validation: (Rule) => Rule.required(), // Ensure main image is required
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
      type: 'file',
      description: 'Upload a video file (mp4 recommended)',
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
