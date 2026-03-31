/**
 * Competition entry upload limits. Kept under Vercel's ~4.5MB serverless
 * request body cap so multipart uploads succeed before hitting the API.
 */
export const COMPETITION_MAX_FILE_BYTES = 4 * 1024 * 1024 // 4 MB
export const COMPETITION_MAX_LONG_EDGE_PX = 2000
