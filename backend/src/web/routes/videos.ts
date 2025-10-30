import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { detectLang, localizeVideo } from "../utils/i18n";

export const videoRouter = Router();

// Public list videos (published only)
videoRouter.get("/", async (req, res) => {
  const { q } = req.query as { q?: string };
  const lang = detectLang(req);
  const videos = await prisma.video.findMany({
    where: {
      status: "PUBLISHED",
      ...(q ? { OR: [
        { title: { contains: q, mode: "insensitive" } },
        { titleFr: { contains: q, mode: "insensitive" } },
        { titleAr: { contains: q, mode: "insensitive" } },
      ] } : {})
    },
    orderBy: { publishedAt: "desc" }
  });
  const localized = videos.map(v => localizeVideo(lang, v));
  res.json(localized);
});

videoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const lang = detectLang(req);
  const video = await prisma.video.findUnique({ where: { id } });
  if (!video || video.status !== "PUBLISHED") return res.status(404).json({ error: "Not found" });
  res.json(localizeVideo(lang, video));
});


