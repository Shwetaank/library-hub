import type { NextConfig } from "next";

const azureStorageAccount = process.env.AZURE_STORAGE_ACCOUNT_NAME?.trim();

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      ...(azureStorageAccount
        ? [
            {
              protocol: "https" as const,
              hostname: `${azureStorageAccount}.blob.core.windows.net`,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
