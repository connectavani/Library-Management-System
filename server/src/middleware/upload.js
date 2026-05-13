// upload.js
import fs from "fs";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./r2-client.js";
import dotenv from "dotenv";
dotenv.config();

const bucket = process.env.R2_BUCKET;

async function uploadFile(localPath, destKey, contentType) {
  const body = fs.readFileSync(localPath);
  const cmd = new PutObjectCommand({
    Bucket: bucket,   
    Key: destKey,
    Body: body,
    ContentType: contentType,
  });

  const res = await s3.send(cmd);
  console.log("Upload result:", res);
  console.log("Public URL (if public bucket):",
    `https://${bucket}.${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${encodeURIComponent(destKey)}`
  );
}

const filePath = path.resolve("./video.mp4"); // change as required
uploadFile(filePath, "uploads/video.mp4", "video/mp4").catch(console.error);
