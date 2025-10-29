# 🔒 Environment Variables Security Guide

## Which Variables Are Safe to Expose?

Vercel will warn you that variables starting with `NEXT_PUBLIC_` will be exposed to the browser. Here's what's safe and what's not:

### ✅ SAFE to Expose (NEXT_PUBLIC_ prefix is correct):

**1. `NEXT_PUBLIC_SANITY_PROJECT_ID`**
- ✅ **Safe** - This is your Sanity project ID
- **Purpose:** Needed by the browser to connect to Sanity
- **Why it's safe:** Project IDs are public identifiers, similar to a database connection string - safe to expose

**2. `NEXT_PUBLIC_SANITY_DATASET`**
- ✅ **Safe** - This is your Sanity dataset name (usually "production")
- **Purpose:** Tells the browser which dataset to query
- **Why it's safe:** Dataset names are not sensitive - they just identify which data collection to use

### ❌ NOT Safe to Expose (NO NEXT_PUBLIC_ prefix):

**3. `SANITY_API_TOKEN`**
- ❌ **MUST NOT have NEXT_PUBLIC_ prefix** - Keep it server-side only!
- **Purpose:** Authenticates write operations to Sanity
- **Why it's dangerous:** This token can modify/delete your content! Never expose it.

**4. `ADMIN_PASSWORD`**
- ❌ **MUST NOT have NEXT_PUBLIC_ prefix** - Keep it server-side only!
- **Purpose:** Protects your admin area
- **Why it's dangerous:** If exposed, anyone can access your admin panel and modify content.

## Summary

When adding to Vercel:

✅ **Safe to add with browser warning (these MUST have NEXT_PUBLIC_):**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

✅ **Safe to add, NO browser warning (these MUST NOT have NEXT_PUBLIC_):**
- `SANITY_API_TOKEN` 
- `ADMIN_PASSWORD`

## The Rule of Thumb

- `NEXT_PUBLIC_` prefix = exposed to browser (anyone can see it in the JavaScript bundle)
- NO `NEXT_PUBLIC_` prefix = server-side only (secure, never sent to browser)

**For security-critical values (passwords, API tokens), never use `NEXT_PUBLIC_` prefix!**

