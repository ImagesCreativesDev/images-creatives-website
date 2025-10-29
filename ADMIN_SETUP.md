# Admin Area Setup Instructions

## Overview
The admin area provides a simple interface for non-technical users to manage events and featured members without accessing Sanity Studio.

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in your project root with the following variables:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token

# Admin Area Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
```

### 2. Get Sanity Write Token
1. Go to your Sanity project dashboard
2. Navigate to "API" section
3. Create a new token with "Editor" permissions
4. Copy the token and add it to your `.env.local` file

### 3. Set Admin Password
Choose a secure password and add it to `NEXT_PUBLIC_ADMIN_PASSWORD` in your `.env.local` file.

## Accessing the Admin Area

1. Visit `http://localhost:3000/admin` (or your domain + `/admin`)
2. Enter the admin password
3. Use the tabs to switch between:
   - **Manage Events**: Add, edit, or delete events
   - **Featured Member**: Select existing member or add new one to feature

## Features

### Events Management
- **View all events** in a simple list format
- **Add new events** with all necessary fields:
  - Title, Description, Date, Location
  - Header styling (color, text, sub-text)
  - Pricing, capacity, registration details
  - Virtual event option
- **Edit existing events** by clicking the Edit button
- **Delete events** with confirmation
- **Real-time updates** - changes appear immediately on the live site

### Featured Member Management
- **Select from existing members** via dropdown
- **Add new members** with complete profile information
- **Automatic featuring** - when you save a member, they become the featured member
- **Member fields**:
  - Name, Business Name, Role
  - Short bio and full description
  - Profile link and image URL
- **One-click featuring** - only one member can be featured at a time

## Security Notes

- The admin password is stored in environment variables
- API routes verify permissions server-side
- Sanity write token is kept secure on the server
- Session storage maintains login during browser session

## User Experience

The admin interface is designed for non-technical users:
- **Simple forms** with clear labels
- **Visual feedback** with success/error messages
- **Responsive design** works on mobile and tablet
- **No technical knowledge required**
- **Immediate results** - changes reflect on live site instantly

## Troubleshooting

### Common Issues

1. **"Error loading data"**
   - Check your Sanity project ID and dataset in `.env.local`
   - Verify your Sanity API token has write permissions

2. **"Invalid password"**
   - Check `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`
   - Restart your development server after changing environment variables

3. **Events not appearing**
   - Check that your Sanity schemas match the expected fields
   - Verify the event schema includes all required fields

4. **Member spotlight not updating**
   - Ensure the member schema includes a `featured` boolean field
   - Check that the `getFeaturedMember` query is working correctly

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure your Sanity project is properly configured
4. Restart your development server after making changes

## File Structure

```
src/
├── pages/
│   ├── admin/
│   │   └── index.jsx          # Main admin dashboard
│   └── api/
│       ├── events/
│       │   ├── create.js      # Create new event
│       │   ├── update.js      # Update existing event
│       │   ├── delete.js      # Delete event
│       │   └── list.js        # List all events
│       └── members/
│           ├── create.js      # Create new member
│           ├── update.js      # Update existing member
│           └── list.js        # List all members
└── lib/
    └── sanity.js             # Sanity client configuration
```
