@echo off
REM Security Fix Commit - Sanity Token Protection (Windows)
REM Run this script to commit the security fixes

echo 🔒 Image Creatives Security Fix - Git Commit
echo =============================================

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Error: Not in a git repository
    pause
    exit /b 1
)

REM Add all files
echo 📁 Adding security fix files to git...
git add .

REM Check if there are changes to commit
git diff --staged --quiet
if %errorlevel% equ 0 (
    echo ℹ️  No changes to commit
    pause
    exit /b 0
)

REM Show what will be committed
echo 📋 Files to be committed:
git diff --staged --name-only

echo.
echo 💾 Committing security fixes...

REM Commit with descriptive message
git commit -m "security: Fix Sanity API token exposure and add page titles

SECURITY FIXES:
- Remove client-side Sanity token exposure
- Add server-side only token handling
- Create secure admin verification API
- Add comprehensive security documentation

PAGE TITLES:
- Add proper browser tab titles for all pages
- Include SEO meta descriptions
- Create _document.jsx for global HTML structure

Files added/modified:
- src/pages/_document.jsx (global HTML structure)
- src/pages/api/admin/verify.js (secure admin verification)
- src/pages/admin/index.jsx (updated authentication)
- src/pages/index.jsx (added Head with title)
- src/pages/events.jsx (added Head with title)
- src/pages/membership.jsx (added Head with title)
- src/pages/free-meeting.jsx (added Head with title)
- src/pages/admin/index.jsx (added Head with title)
- SECURITY_FIX.md (comprehensive security guide)

This fixes the GitHub token exposure alert and adds proper
page titles for better SEO and user experience."

REM Push to GitHub
echo 🌐 Pushing to GitHub...
git push origin master

echo.
echo ✅ Successfully committed and pushed security fixes to GitHub!
echo.
echo 📝 Next steps:
echo 1. Follow SECURITY_FIX.md instructions
echo 2. Revoke old Sanity token immediately
echo 3. Create new secure token
echo 4. Update .env.local with new token
echo 5. Test admin area functionality
echo.
echo 🔒 Security: Token is now properly hidden server-side only

pause
