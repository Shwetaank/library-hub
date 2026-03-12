import { BlobServiceClient, type ContainerClient } from "@azure/storage-blob";

const DEFAULT_CONTAINER_NAME = "book-covers";

let containerClientPromise: Promise<ContainerClient> | null = null;

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required for Azure Blob Storage.`);
  }

  return value;
}

function getBlobServiceClient() {
  const connectionString = getRequiredEnv("AZURE_STORAGE_CONNECTION_STRING");
  return BlobServiceClient.fromConnectionString(connectionString);
}

async function createContainerClient() {
  const containerName =
    process.env.AZURE_STORAGE_CONTAINER_NAME?.trim() || DEFAULT_CONTAINER_NAME;
  const client = getBlobServiceClient().getContainerClient(containerName);

  await client.createIfNotExists({ access: "blob" });

  return client;
}

export async function getBookCoverContainerClient() {
  containerClientPromise ??= createContainerClient();
  return containerClientPromise;
}

function sanitizeSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function getExtension(contentType: string) {
  switch (contentType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}

export async function uploadBookCover(params: {
  file: File;
  bookTitle?: string;
}) {
  const { file, bookTitle } = params;
  const containerClient = await getBookCoverContainerClient();
  const extension = getExtension(file.type);
  const titleSegment = bookTitle ? sanitizeSegment(bookTitle) : "book-cover";
  const blobName = `${titleSegment || "book-cover"}-${crypto.randomUUID()}.${extension}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: {
      blobContentType: file.type || "application/octet-stream",
      blobCacheControl: "public, max-age=31536000, immutable",
    },
  });

  return {
    blobName,
    url: blockBlobClient.url,
    containerName: containerClient.containerName,
  };
}

export function getAzureBlobHostname() {
  const accountName = getRequiredEnv("AZURE_STORAGE_ACCOUNT_NAME");
  return `${accountName}.blob.core.windows.net`;
}
