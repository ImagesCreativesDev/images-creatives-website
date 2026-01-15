import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'competitionEntry',
  title: 'Competition Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photographer',
      title: 'Photographer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'uploadDate',
      title: 'Upload Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'score',
      title: 'Judge Score',
      type: 'number',
      description: 'Score between 0 and 100',
      // Optional: Validation to keep scores within a range
      validation: (Rule) => Rule.min(0).max(100), 
    }),
    defineField({
      name: 'termsAccepted',
      title: 'Terms Accepted',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'termsAcceptedAt',
      title: 'Terms Accepted At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'termsVersion',
      title: 'Terms Version',
      type: 'string',
      description: 'Version string matching Terms of Service page date (e.g., "2026-01-15")',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'photographer',
      media: 'photo',
    },
  },
})
