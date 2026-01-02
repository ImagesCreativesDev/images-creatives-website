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

### Quick Checklist
- [ ] Create new API token in Sanity with **Editor** permissions
- [ ] Copy the new token (starts with `skey_`)
- [ ] Update `SANITY_API_TOKEN` in Vercel environment variables
- [ ] Redeploy your Vercel project
- [ ] Test deletion in admin portal

### Step 1: Access Sanity Dashboard
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Log in with your Sanity account
3. Select your project (the one matching your `NEXT_PUBLIC_SANITY_PROJECT_ID`)

### Step 2: Create New API Token with Delete Permissions

Since you cannot edit the existing token, you'll need to create a new one:

1. In your Sanity project dashboard, go to **API** → **Tokens**
2. Click the **"Add API token"** button (usually at the top right or bottom of the tokens list)
3. **Token Name:** Enter `ImageCreativesWebsiteAdmin` (or any descriptive name)
4. **Permission:** Select **"Editor"** (NOT "Viewer" or "Editor (restricted)")
   - ⚠️ **Critical:** Only "Editor" or "Administrator" permissions allow delete operations
   - "Viewer" = read-only (won't work for delete)
   - "Editor (restricted)" = limited write (may not allow delete)
5. **Project scope:** 
   - Select **"Select Projects"** 
   - Choose your project from the list (the one matching your `NEXT_PUBLIC_SANITY_PROJECT_ID`)
6. **Dataset access:** 
   - Select your dataset (usually **"production"** or the name in `NEXT_PUBLIC_SANITY_DATASET`)
7. Click **"Save"** or **"Create token"**
8. **IMPORTANT:** Copy the token immediately (it starts with `skey_`)
   - ⚠️ You won't be able to see it again after closing the dialog!
   - The token will look like: `skey_abc123xyz...`

### Step 4: Update Environment Variables in Vercel

**Critical:** You must update the environment variable in Vercel for the changes to take effect on your live site.

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com) and log in
   - Select your project (likely "image-creatives-website" or similar)

2. **Navigate to Environment Variables:**
   - Click on the **"Settings"** tab at the top
   - Scroll down to the **"Environment Variables"** section
   - You'll see a list of all your environment variables

3. **Update SANITY_API_TOKEN:**
   - Find the row with **Key:** `SANITY_API_TOKEN`
   - Click on the **Value** field (or the edit/pencil icon if available)
   - **Delete the old token** and paste your new token (the one starting with `skey_`)
   - Make sure the token is selected for the correct environments:
     - ✅ **Production**
     - ✅ **Preview** (optional but recommended)
     - ✅ **Development** (optional)
   - Click **"Save"** or press Enter

4. **Verify the Update:**
   - The value should now show your new token (partially masked)
   - Double-check that it starts with `skey_`

### Step 4b: Update Local Environment (Optional - for local testing)

If you want to test locally:
1. Create or edit `.env.local` in your project root
2. Add or update:
   ```bash
   SANITY_API_TOKEN=skey_your_new_token_here
   ```
3. Restart your development server (`npm run dev`)

### Step 5: Redeploy
1. In Vercel, go to Deployments
2. Click "..." on latest deployment → "Redeploy"
3. Or push a new commit to trigger auto-deploy

## Verifying It Works

After redeploying:
1. Go to your admin area: `/admin`
2. Try deleting an event
3. It should work now! ✅

## Fixing CORS Error (Studio Not Working on Production)

If you see CORS errors like:
```
Access to XMLHttpRequest at 'https://n8s34eag.api.sanity.io/...' from origin 'https://www.imagecreatives.com' has been blocked by CORS policy
```

**You need to add your domain to Sanity's allowed CORS origins:**

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **CORS origins**
4. Click **"Add CORS origin"**
5. Add these URLs (one at a time):
   - `https://www.imagecreatives.com`
   - `https://imagecreatives.com` (if you use both)
   - `https://images-creatives-website-3sd8.vercel.app` (your Vercel preview URL)
   - For each, check **"Allow credentials"**
6. Click **"Save"**

After adding the CORS origins, the studio should work on your production site!

## Troubleshooting

### "No studios" on Sanity.io
- ✅ **This is normal!** Your studio is embedded in your Next.js app
- Access it at `/studio` on your website, not on Sanity.io

### CORS Error (Most Common Issue)
- **See section above** - You must add your domain to Sanity's CORS origins
- The error will say "blocked by CORS policy" in the console
- This only affects production, not localhost

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
- **If you see CORS errors, add your domain to Sanity CORS origins (see above)**

## Quick Reference

- **Studio URL (live):** `https://images-creatives-website-3sd8.vercel.app/studio`
- **Studio URL (local):** `http://localhost:3000/studio`
- **Sanity Dashboard:** [sanity.io/manage](https://sanity.io/manage)
- **API Tokens:** Dashboard → Your Project → API → Tokens

