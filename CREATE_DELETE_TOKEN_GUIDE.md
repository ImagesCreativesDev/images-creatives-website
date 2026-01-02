# 🔑 Step-by-Step: Creating New Sanity API Token for Delete Permissions

## Current Issue
You're getting "permissions denied" when trying to delete events from the admin portal. The existing token `ImageCreativesWebsiteAdmin` cannot be edited, so we need to create a new one with proper permissions.

## Understanding the Code

Your admin area uses this flow:
1. **Admin Portal** (`/admin`) → User clicks "Delete" button
2. **API Endpoint** (`/api/events/delete`) → Calls `client.delete(_id)`
3. **Sanity Client** (`src/lib/sanity.js`) → Uses `SANITY_API_TOKEN` environment variable
4. **Sanity API** → Requires **Editor** permissions to delete documents

The token must have **Editor** permissions (not Viewer or Editor restricted) to allow deletions.

---

## Step-by-Step Instructions

### Step 1: Access Sanity Dashboard
1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Log in with your Sanity account
3. Select your project (the one that matches your `NEXT_PUBLIC_SANITY_PROJECT_ID`)

### Step 2: Navigate to API Tokens
1. In the left sidebar, click **"API"**
2. Click **"Tokens"** (or it may be under "API" → "Tokens")
3. You should see a list of existing tokens, including `ImageCreativesWebsiteAdmin`

### Step 3: Create New Token
1. Click the **"Add API token"** button (usually blue, at top right or bottom of list)
2. A form/dialog will appear

### Step 4: Configure Token Settings

Fill in the form with these exact settings:

**Token Name:**
```
ImageCreativesWebsiteAdminV2
```
(Or any name you prefer - this is just for your reference)

**Permission Level:**
- Select **"Editor"** ⚠️ **CRITICAL: Must be "Editor" or "Administrator"**
- ❌ Do NOT select "Viewer" (read-only)
- ❌ Do NOT select "Editor (restricted)" (may not allow delete)

**Project Scope:**
- Select **"Select Projects"**
- Check the box next to your project name
- (This limits the token to only your project)

**Dataset Access:**
- Select your dataset name
- Usually **"production"** (or whatever matches `NEXT_PUBLIC_SANITY_DATASET`)

### Step 5: Save and Copy Token
1. Click **"Save"** or **"Create token"**
2. **IMMEDIATELY copy the token** - it will look like:
   ```
   skey_abc123xyz789...
   ```
3. ⚠️ **IMPORTANT:** You cannot view this token again after closing the dialog!
4. Paste it somewhere safe temporarily (you'll need it in the next step)

### Step 6: Update Vercel Environment Variable

1. **Go to Vercel:**
   - Visit [https://vercel.com](https://vercel.com)
   - Log in and select your project

2. **Navigate to Settings:**
   - Click the **"Settings"** tab at the top
   - Scroll down to **"Environment Variables"** section

3. **Find SANITY_API_TOKEN:**
   - Look for the row with **Key:** `SANITY_API_TOKEN`
   - Click on the **Value** field (or edit icon)

4. **Update the Token:**
   - Delete the old token value
   - Paste your new token (the one starting with `skey_`)
   - Ensure these environments are checked:
     - ✅ **Production**
     - ✅ **Preview** (recommended)
   - Click **"Save"**

5. **Verify:**
   - The value should update (partially masked)
   - Make sure it shows the new token

### Step 7: Redeploy Your Application

After updating the environment variable, you must redeploy:

**Option A: Redeploy from Vercel Dashboard**
1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Wait for deployment to complete

**Option B: Trigger via Git**
- Make a small change and push to your repository
- Vercel will auto-deploy

### Step 8: Test the Delete Function

1. **Wait for deployment to finish** (usually 1-2 minutes)
2. **Go to your admin portal:**
   - Visit: `https://images-creatives-website-3sd8.vercel.app/admin`
   - Or locally: `http://localhost:3000/admin`
3. **Log in** with your admin password
4. **Navigate to "Events" tab**
5. **Try deleting an event:**
   - Click "Delete" on any event
   - Confirm the deletion
   - It should work now! ✅

---

## Troubleshooting

### Still Getting "Permission Denied" Error?

1. **Verify Token Permissions:**
   - Go back to Sanity → API → Tokens
   - Check that your new token shows **"Editor"** permission
   - If it shows "Viewer", you need to create a new one

2. **Verify Environment Variable:**
   - In Vercel, double-check `SANITY_API_TOKEN` has the new token
   - Make sure it's set for **Production** environment
   - The token should start with `skey_`

3. **Verify Redeployment:**
   - Check Vercel deployments - make sure a new deployment ran after you updated the token
   - The environment variable change only takes effect after redeployment

4. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Try deleting again and look for specific error messages

### Token Not Showing in Sanity?

- Make sure you're in the correct project
- Check that you have admin/owner access to the project
- Try refreshing the page

### Can't Find Environment Variables in Vercel?

- Make sure you're logged in as the project owner/admin
- The "Settings" tab should be visible in the top navigation
- Environment Variables is usually near the bottom of the Settings page

---

## Quick Reference

- **Sanity Dashboard:** [sanity.io/manage](https://sanity.io/manage)
- **Vercel Dashboard:** [vercel.com](https://vercel.com)
- **Admin Portal:** `/admin` on your website
- **Required Permission:** Editor (not Viewer)
- **Environment Variable:** `SANITY_API_TOKEN`
- **Token Format:** Starts with `skey_`

---

## What Happens Behind the Scenes

When you click "Delete" in the admin portal:

1. Frontend calls: `DELETE /api/events/delete` with event `_id`
2. API route (`src/pages/api/events/delete.js`) receives the request
3. Sanity client (`src/lib/sanity.js`) uses `SANITY_API_TOKEN` to authenticate
4. Calls `client.delete(_id)` which requires Editor permissions
5. Sanity API verifies token has delete permissions
6. If authorized → Event deleted ✅
7. If not authorized → "Permission denied" error ❌

The token you create must have **Editor** permissions to pass step 5.

