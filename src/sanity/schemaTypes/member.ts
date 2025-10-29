import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
      description: 'Brief bio for member cards (max 200 characters)',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full description with paragraphs for featured member layout',
    }),
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      description: 'Optional: Business or photography business name',
    }),
    defineField({
      name: 'profileLink',
      title: 'Profile Link',
      type: 'url',
      description: 'Link to full profile page',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Member',
      type: 'boolean',
      description: 'Mark this member to be featured in the spotlight section',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
