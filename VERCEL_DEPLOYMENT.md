# 🚀 Vercel Deployment Guide

## Step-by-Step Instructions for Deploying to Vercel

### Prerequisites
- Your code is committed and pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- You have a Vercel account (sign up at [vercel.com](https://vercel.com) if you don't have one)

### 1. Deploy Your Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Vercel will auto-detect Next.js - click **"Deploy"**

### 2. Add Environment Variables

⚠️ **CRITICAL**: These environment variables must be added for your site to work properly!

#### How to Add Environment Variables in Vercel:

1. **Go to your project dashboard** on Vercel
2. Click on the **"Settings"** tab (at the top of the page)
3. Scroll down to find the **"Environment Variables"** section
4. You'll see **Key** and **Value** input fields ready to use (no button needed to start)

#### Add these 4 environment variables one at a time:

**Variable 1:**
- In the **Key** field: Enter `SANITY_API_TOKEN`
- In the **Value** field: Enter your Sanity API token (starts with `skey_`)
- Make sure **Environments** dropdown says "All Environments" (or select Production, Preview, Development)
- Click the **"Save"** button (top right of the form)
- After saving, you'll see it in the list below

**Variable 2:**
- Click **"Add Another"** button (or the input fields will appear fresh)
- In the **Key** field: Enter `NEXT_PUBLIC_SANITY_PROJECT_ID`
- In the **Value** field: Enter your Sanity project ID (e.g., `abc123xyz`)
- Make sure **Environments** is set to "All Environments"
- Click **"Save"**

**Variable 3:**
- Click **"Add Another"** (or fields will be fresh)
- In the **Key** field: Enter `NEXT_PUBLIC_SANITY_DATASET`
- In the **Value** field: Enter `production` (or your dataset name)
- Make sure **Environments** is set to "All Environments"
- Click **"Save"**

**Variable 4:**
- Click **"Add Another"** (or fields will be fresh)
- In the **Key** field: Enter `ADMIN_PASSWORD` ⚠️ **IMPORTANT:** Do NOT use `NEXT_PUBLIC_ADMIN_PASSWORD` - the password must stay server-side only for security!
- In the **Value** field: Enter your admin password
- Make sure **Environments** is set to "All Environments"
- Click **"Save"**

### 3. Redeploy After Adding Variables

After adding all environment variables:

1. Go to the **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Confirm the redeploy

**OR** simply push a new commit to trigger a new deployment with the variables.

### 4. Verify Images Are Working

After deployment:

1. Visit your live site
2. Check that:
   - Logo appears in the navigation bar
   - Hero background image displays correctly
   - Logo appears in the footer
   - Logo appears in the membership section

If images are still not showing:
- Check that files exist in the `public` folder:
  - `public/logo.png`
  - `public/hero-bg.jpg`
- Ensure image file names match exactly (case-sensitive)
- Clear your browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### 5. Verify Sanity Connection

1. Visit your live site
2. Navigate to `/admin` 
3. Try logging in with your admin password
4. Verify you can see/create events

### Troubleshooting

#### Images Not Showing:
- ✅ Verify files are in `public/` folder
- ✅ Check file names match exactly (case-sensitive)
- ✅ Clear browser cache
- ✅ Check browser console for 404 errors
- ✅ Verify images exist in the repository

#### Environment Variables Not Working:
- ✅ Ensure variable names match exactly (case-sensitive)
- ✅ Make sure variables are added to all environments (Production, Preview, Development)
- ✅ Redeploy after adding variables
- ✅ Check Vercel build logs for errors

#### Sanity Connection Issues:
- ✅ Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- ✅ Verify `NEXT_PUBLIC_SANITY_DATASET` matches your Sanity dataset
- ✅ Check that `SANITY_API_TOKEN` is valid and not expired
- ✅ Check Vercel build logs for Sanity connection errors

### Quick Checklist

- [ ] Project deployed to Vercel
- [ ] `SANITY_API_TOKEN` added to environment variables
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` added to environment variables
- [ ] `NEXT_PUBLIC_SANITY_DATASET` added to environment variables
- [ ] `ADMIN_PASSWORD` added to environment variables (NOT `NEXT_PUBLIC_ADMIN_PASSWORD` - server-side only!)
- [ ] Project redeployed after adding variables
- [ ] Images displaying correctly on live site
- [ ] Admin area accessible and working

### Need Help?

If you're still experiencing issues:
1. Check Vercel build logs (Deployments → Click deployment → View Build Logs)
2. Check browser console for errors
3. Verify all files are committed to your repository
4. Ensure environment variables are set correctly

