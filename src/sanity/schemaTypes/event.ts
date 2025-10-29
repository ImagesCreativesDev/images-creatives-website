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
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
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
