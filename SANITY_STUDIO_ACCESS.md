# 🎨 Accessing Sanity Studio & Fixing Delete Permissions

## Understanding Your Setup

Your Sanity Studio is **embedded in your Next.js website**, not a separate Sanity-hosted studio. That's why you see "no studios" on Sanity.io - that's normal!

## How to Access Sanity Studio

### Option 1: On Your Live Website
Visit: `https://images-creatives-website-3sd8.vercel.app/studio`

### Option 2: Locally
1. Run `npm run dev`
2. Visit: `http://localhost:3000/studio`

You'll be prompted to log in with your Sanity account.

## Fixing Delete Permissions Issue

The error indicates your Sanity API token doesn't have delete permissions. Here's how to fix it:

### Step 1: Access Sanity Dashboard
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Log in with your Sanity account
3. Select your project (the one matching your `NEXT_PUBLIC_SANITY_PROJECT_ID`)

### Step 2: Create/Update API Token with Delete Permissions
1. In your Sanity project dashboard, go to **API** → **Tokens**
2. Find your current token (the one in `SANITY_API_TOKEN` environment variable)
3. **Either:**
   - **Update existing token:** Click on it → Edit → Ensure **Editor** permissions are selected
   - **Create new token:** Click "Add API token" → Name it (e.g., "ImageCreativesWebsiteAdmin")

### Step 3: Set Token Permissions
When creating/editing the token, make sure these permissions are set:
- ✅ **Editor** (this includes delete permissions)
- ✅ **Project scope:** Select your project
- ✅ **Dataset access:** Production (or your dataset name)

**Important:** The token must have **Editor** or **Administrator** permissions to delete documents. **Viewer** or **Editor (restricted)** won't work.

### Step 4: Update Environment Variables
1. **Copy the new token** (starts with `skey_`)
2. **In Vercel:**
   - Go to your project → Settings → Environment Variables
   - Find `SANITY_API_TOKEN`
   - Update the value with your new token
   - Click Save
3. **Locally (optional):**
   - Update `.env.local` with the new token
   - `SANITY_API_TOKEN=skey_your_new_token_here`

### Step 5: Redeploy
1. In Vercel, go to Deployments
2. Click "..." on latest deployment → "Redeploy"
3. Or push a new commit to trigger auto-deploy

## Verifying It Works

After redeploying:
1. Go to your admin area: `/admin`
2. Try deleting an event
3. It should work now! ✅

## Troubleshooting

### "No studios" on Sanity.io
- ✅ **This is normal!** Your studio is embedded in your Next.js app
- Access it at `/studio` on your website, not on Sanity.io

### Still can't delete after updating token
- Verify the token has **Editor** permissions (not Viewer)
- Check that `SANITY_API_TOKEN` in Vercel matches your new token exactly
- Make sure you redeployed after updating the environment variable
- Check browser console (F12) for specific error messages

### Can't access /studio
- Make sure your environment variables are set correctly:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
- Check Vercel build logs for any errors
- Try accessing it locally first: `npm run dev` then `http://localhost:3000/studio`

## Quick Reference

- **Studio URL (live):** `https://images-creatives-website-3sd8.vercel.app/studio`
- **Studio URL (local):** `http://localhost:3000/studio`
- **Sanity Dashboard:** [sanity.io/manage](https://sanity.io/manage)
- **API Tokens:** Dashboard → Your Project → API → Tokens

