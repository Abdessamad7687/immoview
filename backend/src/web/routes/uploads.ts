import { Router } from "express";
import path from "node:path";
import { upload } from "../../storage/local";
import { requireAuth } from "../middleware/requireAuth";

export const uploadsRouter = Router();

uploadsRouter.post("/", requireAuth(["ADMIN"]), upload.single("file"), (req: any, res) => {
  const file = req.file as Express.Multer.File | undefined;
  if (!file) return res.status(400).json({ error: "Missing file" });
  // Expose file under /files path
  const filename = path.basename(file.path);
  const publicUrl = `/files/${filename}`;
  res.status(201).json({ url: publicUrl, filename });
});


