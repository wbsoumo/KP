import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: "dt02mpeqj",
  api_key: "485515273593933",
  api_secret: "Jgi9yZG6AZ8BMUlS5UEZ0F-dmZ0",
  secure: true,
});

const PUBLIC_DIR = path.join(process.cwd(), "public");

async function uploadFile(filePath, relativePath) {
  const isVideo = filePath.toLowerCase().endsWith(".mp4") || filePath.toLowerCase().endsWith(".mov");
  const folder = path.dirname(relativePath);
  console.log(`Uploading ${relativePath}...`);
  const options = {
    resource_type: isVideo ? "video" : "image",
    folder: `kreative-planet/${folder}`,
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    timeout: 180000,
  };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      let result;
      if (isVideo) {
        result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_large(
            filePath,
            { ...options, chunk_size: 4000000 },
            (error, res) => {
              if (error) reject(error);
              else resolve(res);
            }
          );
        });
      } else {
        result = await cloudinary.uploader.upload(filePath, options);
      }
      const secureUrl = result?.secure_url || result?.url;
      console.log(`Uploaded ${relativePath} -> ${secureUrl}`);
      return { relativePath, url: secureUrl };
    } catch (err) {
      console.error(`Attempt ${attempt} failed for ${relativePath}:`, err.message || err);
      if (attempt === 3) return null;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function main() {
  const foldersToUpload = ["videos", "creative", "social media", "creator", "brand"];
  const results = {};

  for (const folder of foldersToUpload) {
    const dirPath = path.join(PUBLIC_DIR, folder);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (file.startsWith(".")) continue;
      const fullPath = path.join(dirPath, file);
      const relPath = `${folder}/${file}`;
      const res = await uploadFile(fullPath, relPath);
      if (res) {
        results[relPath] = res.url;
      }
    }
  }

  fs.writeFileSync("cloudinary_mapping.json", JSON.stringify(results, null, 2));
  console.log("Upload complete! Saved mapping to cloudinary_mapping.json");
}

main();
