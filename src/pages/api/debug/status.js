export default function handler(req, res) {
  // TEMPORARY DEBUG ENDPOINT - REMOVE AFTER VERIFICATION
  const hasAdminPassword = Boolean(process.env.ADMIN_PASSWORD)

  let publicFiles = {
    heroBgExists: false,
    logoExists: false,
  }

  try {
    // Attempt a lightweight fs check; if unavailable in serverless, it will be caught
    const fs = require('fs')
    const path = require('path')
    const root = process.cwd()
    publicFiles.heroBgExists = fs.existsSync(path.join(root, 'public', 'hero-bg.jpg'))
    publicFiles.logoExists = fs.existsSync(path.join(root, 'public', 'logo.png'))
  } catch (_) {}

  res.status(200).json({
    ok: true,
    adminPasswordConfigured: hasAdminPassword,
    publicFiles,
    note: 'This endpoint is for temporary diagnostics only.'
  })
}


