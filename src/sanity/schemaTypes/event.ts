import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Used for the event detail page URL (e.g. /events/your-event-slug). Click Generate to create from title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('Add at least one paragraph or image'),
      description:
        'Rich text with headings, lists, links, and inline images. You can also use the website admin (plain paragraphs only) or paste content here in Studio.',
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
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
      name: 'headerColor',
      title: 'Header Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Yellow', value: 'yellow' },
          { title: 'Blue', value: 'blue' },
          { title: 'Orange', value: 'orange' },
          { title: 'Purple', value: 'purple' },
          { title: 'Red', value: 'red' },
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'headerText',
      title: 'Header Text (Large)',
      type: 'string',
      description: 'e.g., "MONTHLY MEETING" or "BOARD MEETING"',
    }),
    defineField({
      name: 'headerSubText',
      title: 'Header Sub Text',
      type: 'string',
      description: 'e.g., "ENGAGE & EDUCATE"',
    }),
    defineField({
      name: 'isVirtual',
      title: 'Virtual Event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "Starting $0.00" or "Free"',
      initialValue: 'Starting $0.00',
    }),
    defineField({
      name: 'capacity',
      title: 'Event Capacity',
      type: 'number',
    }),
    defineField({
      name: 'ticketsSold',
      title: 'Tickets Sold',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'e.g., "Buy Tickets", "View Details"',
      initialValue: 'View Details',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eventDate',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      const date = new Date(subtitle)
      return {
        title: title,
        subtitle: date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }
    },
  },
})
