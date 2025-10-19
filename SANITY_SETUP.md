# Sanity CMS Setup for Image Creatives

## Overview
This project is configured to work with Sanity CMS for managing member profiles and upcoming events.

## Setup Instructions

### 1. Create a Sanity Project
1. Go to [sanity.io](https://sanity.io) and create a new project
2. Choose a project name (e.g., "image-creatives")
3. Select a dataset (e.g., "production")

### 2. Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### 3. Initialize Sanity Studio
```bash
npx create-sanity@latest --template clean --create-project "image-creatives" --dataset production
```

### 4. Configure Environment Variables
Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 5. Create Content Schemas

#### Member Schema (`schemas/member.js`)
```javascript
export default {
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        }
      ]
    }
  ]
}
```

#### Event Schema (`schemas/event.js`)
```javascript
export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url'
    }
  ]
}
```

### 6. Update Sanity Configuration
Update your `sanity.config.js` to include the schemas:
```javascript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import member from './schemas/member'
import event from './schemas/event'

export default defineConfig({
  name: 'image-creatives',
  title: 'Image Creatives CMS',
  projectId: 'your-project-id',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: [member, event],
  },
})
```

### 7. Start Sanity Studio
```bash
cd sanity-studio
npm run dev
```

### 8. Add Content
1. Go to your Sanity Studio (usually at `http://localhost:3333`)
2. Add member profiles with images, names, roles, and bios
3. Add upcoming events with dates, descriptions, and images

## Current Implementation
The components are currently using mock data for development. Once Sanity is set up:

1. Update the environment variables with your actual project ID
2. The components will automatically fetch data from Sanity
3. Images will be optimized using Sanity's image URL builder

## Features
- **Member Spotlight**: Displays team members with photos, roles, and social links
- **Upcoming Events**: Shows the next event with date, location, and registration
- **Responsive Design**: All sections work perfectly on mobile, tablet, and desktop
- **Brand Styling**: Uses Image Creatives brand colors, fonts, and design principles
