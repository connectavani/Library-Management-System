// r2-client.js
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

export const s3 = new S3Client({
  region: "auto", // region is ignored by R2 but a value is required
  endpoint,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
  forcePathStyle: false, // R2 uses virtual-host style by default
});
