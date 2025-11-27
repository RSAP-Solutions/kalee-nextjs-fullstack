import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.MY_AWS_REGION ?? process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? "us-east-1";
const BUCKET = process.env.AWS_S3_BUCKET ?? "";

if (!BUCKET) {
  console.warn("[s3] AWS_S3_BUCKET is not set. Image uploads will fail until configured.");
}

const s3Client = new S3Client({
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
  if (!BUCKET) {
    throw new Error("AWS_S3_BUCKET is not configured");
  }

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });

  const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

  return {
    uploadUrl: signedUrl,
    publicUrl,
    key,
  };
};
