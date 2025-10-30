import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const videoRouter = Router();

// Public list videos (published only)
videoRouter.get("/", async (req, res) => {
  const { q } = req.query as { q?: string };
  const videos = await prisma.video.findMany({
    where: {
      status: "PUBLISHED",
      ...(q ? { title: { contains: q, mode: "insensitive" } } : {})
    },
    orderBy: { publishedAt: "desc" }
  });
  res.json(videos);
});

videoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const video = await prisma.video.findUnique({ where: { id } });
  if (!video || video.status !== "PUBLISHED") return res.status(404).json({ error: "Not found" });
  res.json(video);
});


