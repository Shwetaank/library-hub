let url: string;

if (process.env.NEXT_PUBLIC_APP_URL) {
  // 1. Use the explicit environment variable if available
  url = process.env.NEXT_PUBLIC_APP_URL;
} else if (process.env.VERCEL_URL) {
  // 2. Fallback to Vercel's system-provided URL for preview/production
  url = `https://${process.env.VERCEL_URL}`;
} else {
  // 3. Default to localhost for local development
  url = "http://localhost:3000";
}

// Remove trailing slash if it exists to ensure consistency
if (url.endsWith("/")) {
  url = url.slice(0, -1);
}

export const APP_URL = url;
