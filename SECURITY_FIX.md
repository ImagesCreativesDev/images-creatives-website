# 🔒 SECURE ENVIRONMENT SETUP

## ⚠️ CRITICAL: GitHub Token Exposure Fix

### 1. **IMMEDIATELY Revoke Exposed Token**
1. Go to your Sanity dashboard
2. Navigate to "API" section  
3. Find the `ImageCreativesWebsiteAdmin` token
4. **DELETE/REVOKE it immediately**

### 2. **Create New Secure Token**
1. Create a new token with same permissions:
   - Manage SDK Apps: **Editor**
   - Media Library: **Editor** 
   - Canvas: **Editor**
   - Deploy Studios: **Token Only**
   - Project Scope: **Select Projects** → Choose your project
2. **Copy the new token**

### 3. **Secure Environment Variables**

Create `.env.local` file in your project root:

```bash
# Sanity Configuration (SERVER-SIDE ONLY)
SANITY_API_TOKEN=skey_your_new_token_here

# Admin Password (SERVER-SIDE ONLY - secure)
ADMIN_PASSWORD=YourSecurePassword123

# Sanity Project Info (PUBLIC - safe to expose)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. **Git Security**

**NEVER commit these files:**
- `.env.local` (already in .gitignore)
- `.env` 
- Any file containing `SANITY_API_TOKEN`

**Verify .gitignore includes:**
```
.env.local
.env
.env.production
.env.development
```

### 5. **Deployment Security**

**For Vercel deployment:**

**Step-by-step instructions:**

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Log in to your account
   - Select your project

2. **Navigate to Settings:**
   - Click on the **"Settings"** tab at the top of the page
   - Scroll down to find **"Environment Variables"** section

3. **Add Environment Variables:**
   - You'll see **Key** and **Value** input fields already visible (no button needed)
   - Add each variable one at a time, then click **"Save"** after each one:

   **Variable 1:**
   - **Key field:** Enter `SANITY_API_TOKEN`
   - **Value field:** Enter your new Sanity token (starts with `skey_`)
   - **Environments dropdown:** Make sure it says "All Environments" (or select Production, Preview, Development)
   - Click **"Save"** button (top right)

   **Variable 2:**
   - Click **"Add Another"** button to add a new row
   - **Key field:** Enter `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - **Value field:** Enter your Sanity project ID
   - **Environments:** Select "All Environments"
   - Click **"Save"**

   **Variable 3:**
   - Click **"Add Another"** button
   - **Key field:** Enter `NEXT_PUBLIC_SANITY_DATASET`
   - **Value field:** Enter `production` (or your dataset name)
   - **Environments:** Select "All Environments"
   - Click **"Save"**

   **Variable 4:**
   - Click **"Add Another"** button
   - **Key field:** Enter `ADMIN_PASSWORD` (⚠️ NO `NEXT_PUBLIC_` prefix - this keeps it server-side only!)
   - **Value field:** Enter your admin password
   - **Environments:** Select "All Environments"
   - Click **"Save"**

4. **Redeploy:**
   - Go to **"Deployments"** tab
   - Click **"..."** menu on latest deployment
   - Select **"Redeploy"**
   - OR push a new commit to trigger automatic deployment

📋 **See VERCELL_DEPLOYMENT.md for detailed visual guide**

### 6. **How It Works Now**

✅ **Secure**: Sanity token stays server-side only  
✅ **Admin**: Password protected admin area  
✅ **Public**: Project ID safe to expose  
✅ **Git**: No sensitive data in repository  

### 7. **Test the Fix**

1. Restart your development server: `npm run dev`
2. Visit `/admin` and test login
3. Test creating/editing events
4. Verify everything works

## 🚨 **If Token Still Exposed**

If GitHub still shows the token as exposed:

1. **Check commit history**: The token might be in old commits
2. **Force push**: After fixing, you may need to rewrite history
3. **Contact GitHub**: If needed, contact GitHub support to clear the alert

## ✅ **Security Checklist**

- [ ] Old token revoked
- [ ] New token created  
- [ ] `.env.local` created with new token
- [ ] `.env.local` in `.gitignore`
- [ ] No sensitive data in commits
- [ ] Vercel environment variables set
- [ ] Admin area tested and working

## 📞 **Need Help?**

If you're still seeing GitHub alerts:
1. Check if token appears in any committed files
2. Search your repository for the old token string
3. Consider creating a new Sanity project if needed

The admin area will work perfectly with this secure setup!
