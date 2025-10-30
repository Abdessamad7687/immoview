import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth } from "../middleware/requireAuth";
import bcrypt from "bcrypt";

export const adminRouter = Router();

// Admin management
adminRouter.get("/admins", requireAuth(["ADMIN"]), async (_req, res) => {
  const admins = await prisma.admin.findMany({ orderBy: { createdAt: "desc" } });
  res.json(admins);
});

adminRouter.post("/admins", requireAuth(["ADMIN"]), async (req, res) => {
  const { email, name, password, isSuperAdmin } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });
  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.admin.create({ data: { email, name, passwordHash, isSuperAdmin: !!isSuperAdmin } });
  res.status(201).json(admin);
});

adminRouter.patch("/admins/:id/deactivate", requireAuth(["ADMIN"]), async (req, res) => {
  const { id } = req.params;
  const admin = await prisma.admin.update({ where: { id }, data: { isActive: false } });
  res.json(admin);
});

// Users view
adminRouter.get("/users", requireAuth(["ADMIN"]), async (_req, res) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  res.json(users);
});

// Videos CRUD
adminRouter.get("/videos", requireAuth(["ADMIN"]), async (_req, res) => {
  const videos = await prisma.video.findMany({ orderBy: { createdAt: "desc" } });
  res.json(videos);
});

adminRouter.post("/videos", requireAuth(["ADMIN"]), async (req: any, res) => {
  const adminId = req.principal.sub as string;
  const { title, titleFr, titleAr, description, descriptionFr, descriptionAr, storageUrl, thumbnailUrl, status } = req.body || {};
  const mainTitle = title || titleFr || titleAr;
  if (!mainTitle || !storageUrl) return res.status(400).json({ error: "Missing title or storageUrl" });
  const video = await prisma.video.create({ data: { title: mainTitle, titleFr, titleAr, description, descriptionFr, descriptionAr, storageUrl, thumbnailUrl, status, uploadedByAdminId: adminId } });
  await prisma.videoMetrics.create({ data: { videoId: video.id } });
  res.status(201).json(video);
});

adminRouter.patch("/videos/:id", requireAuth(["ADMIN"]), async (req, res) => {
  const { id } = req.params;
  const { title, titleFr, titleAr, description, descriptionFr, descriptionAr, thumbnailUrl, status, publishedAt } = req.body || {};
  const video = await prisma.video.update({ where: { id }, data: { title, titleFr, titleAr, description, descriptionFr, descriptionAr, thumbnailUrl, status, publishedAt } });
  res.json(video);
});

adminRouter.delete("/videos/:id", requireAuth(["ADMIN"]), async (req, res) => {
  const { id } = req.params;
  await prisma.video.delete({ where: { id } });
  res.status(204).send();
});


