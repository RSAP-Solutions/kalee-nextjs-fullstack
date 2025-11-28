import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.MY_AWS_REGION ?? process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? "us-east-1";
const BUCKET = process.env.AWS_S3_BUCKET ?? "";

if (!BUCKET) {
  console.warn("[s3] AWS_S3_BUCKET is not set. Image uploads will fail until configured.");
}

export const s3Client = new S3Client({
  region: REGION,
  credentials:
    process.env.MY_AWS_ACCESS_KEY_ID && process.env.MY_AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        }
      : process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

export type PresignedUrlParams = {
  key: string;
  contentType: string;
  expiresIn?: number;
};

export const createPresignedPutUrl = async ({
  key,
  contentType,
  expiresIn = 300,
}: PresignedUrlParams) => {
  console.log('[s3] Creating presigned URL for key:', key, 'contentType:', contentType);
  
  if (!BUCKET) {
    console.error('[s3] AWS_S3_BUCKET is not configured');
    throw new Error("AWS_S3_BUCKET is not configured");
  }

  console.log('[s3] Using bucket:', BUCKET, 'region:', REGION);

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    console.log('[s3] Successfully created presigned URL');

    const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

    return {
      uploadUrl: signedUrl,
      publicUrl,
      key,
    };
  } catch (error) {
    console.error('[s3] Failed to create presigned URL:', error);
    throw error;
  }
};

export const uploadToS3 = async ({
  key,
  buffer,
  contentType,
}: {
  key: string;
  buffer: Buffer;
  contentType: string;
}) => {
  console.log('[s3] Uploading to S3 - key:', key, 'contentType:', contentType);
  
  if (!BUCKET) {
    console.error('[s3] AWS_S3_BUCKET is not configured');
    throw new Error("AWS_S3_BUCKET is not configured");
  }

  console.log('[s3] Using bucket:', BUCKET, 'region:', REGION);

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    console.log('[s3] Successfully uploaded to S3');

    const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
    return publicUrl;
  } catch (error) {
    console.error('[s3] Failed to upload to S3:', error);
    throw error;
  }
};

export const getS3PublicUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) {
    return null;
  }

  const normalizedPath = imagePath.trim();

  if (normalizedPath.length === 0) {
    return null;
  }

  // Already proxied
  if (normalizedPath.startsWith("/api/images/")) {
    return normalizedPath;
  }

  // Legacy Pexels path format stored without scheme
  if (normalizedPath.startsWith("photos/")) {
    return `https://images.pexels.com/${normalizedPath}`;
  }

  // External URLs (Pexels, CDN, etc.) pass through untouched
  if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
    try {
      const url = new URL(normalizedPath);
      const host = url.hostname;
      if (host.includes("amazonaws.com") || host.includes("s3.")) {
        const key = url.pathname.replace(/^\/+/, "");
        return `/api/images/${key}`;
      }
      return normalizedPath;
    } catch {
      return normalizedPath;
    }
  }

  // Treat anything else as an S3 key (with or without leading slash)
  const key = normalizedPath.replace(/^\/+/, "");
  return `/api/images/${key}`;
};
