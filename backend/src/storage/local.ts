import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { randomUUID } from "node:crypto";

const uploadRoot = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadRoot)) fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadRoot);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${randomUUID()}${ext}`);
  }
});

export const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 512 } });
export const uploadsDir = uploadRoot;


