@echo off
REM Image Creatives Admin Area - Git Commit Script (Windows)
REM Run this script to commit all admin area changes to GitHub

echo 🚀 Image Creatives Admin Area - Git Commit
echo ==========================================

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Error: Not in a git repository
    pause
    exit /b 1
)

REM Add all files
echo 📁 Adding all files to git...
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
echo 💾 Committing changes...

REM Commit with descriptive message
git commit -m "feat: Add admin area for non-technical content management

- Create password-protected admin dashboard at /admin
- Add events management (create, edit, delete events)
- Add featured member management (select/create members)
- Implement API routes for Sanity CMS integration
- Add comprehensive forms with validation
- Include responsive design with Image Creatives branding
- Add session-based authentication
- Create setup documentation

Files added:
- src/pages/admin/index.jsx (main admin dashboard)
- src/pages/api/events/* (CRUD operations for events)
- src/pages/api/members/* (CRUD operations for members)
- src/lib/sanity.js (updated with write token support)
- ADMIN_SETUP.md (setup instructions)

This allows non-technical users to manage website content
without accessing Sanity Studio directly."

REM Push to GitHub
echo 🌐 Pushing to GitHub...
git push origin main

echo.
echo ✅ Successfully committed and pushed admin area to GitHub!
echo.
echo 📝 Next steps:
echo 1. Set up environment variables in .env.local:
echo    - NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
echo    - SANITY_API_TOKEN=your-sanity-write-token
echo 2. Test the admin area at http://localhost:3000/admin
echo 3. Share admin access with your team
echo.
echo 📖 See ADMIN_SETUP.md for detailed setup instructions

pause
