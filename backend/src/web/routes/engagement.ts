import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth } from "../middleware/requireAuth";

export const engagementRouter = Router();

engagementRouter.post("/like", requireAuth(["USER"]), async (req: any, res) => {
  const userId = req.principal.sub as string;
  const { videoId } = req.body || {};
  if (!videoId) return res.status(400).json({ error: "Missing videoId" });
  await prisma.$transaction(async (tx) => {
    await tx.like.upsert({
      where: { userId_videoId: { userId, videoId } },
      update: {},
      create: { userId, videoId }
    });
    await tx.videoMetrics.update({ where: { videoId }, data: { likeCount: { increment: 1 } } }).catch(async () => {
      await tx.videoMetrics.create({ data: { videoId, likeCount: 1 } });
    });
  });
  res.status(204).send();
});

engagementRouter.post("/unlike", requireAuth(["USER"]), async (req: any, res) => {
  const userId = req.principal.sub as string;
  const { videoId } = req.body || {};
  if (!videoId) return res.status(400).json({ error: "Missing videoId" });
  await prisma.$transaction(async (tx) => {
    await tx.like.delete({ where: { userId_videoId: { userId, videoId } } }).catch(() => undefined);
    await tx.videoMetrics.update({ where: { videoId }, data: { likeCount: { decrement: 1 } } }).catch(() => undefined);
  });
  res.status(204).send();
});

engagementRouter.post("/comment", requireAuth(["USER"]), async (req: any, res) => {
  const userId = req.principal.sub as string;
  const { videoId, content } = req.body || {};
  if (!videoId || !content) return res.status(400).json({ error: "Missing videoId or content" });
  const comment = await prisma.$transaction(async (tx) => {
    const c = await tx.comment.create({ data: { userId, videoId, content } });
    await tx.videoMetrics.update({ where: { videoId }, data: { commentCount: { increment: 1 } } }).catch(async () => {
      await tx.videoMetrics.create({ data: { videoId, commentCount: 1 } });
    });
    return c;
  });
  res.status(201).json(comment);
});

engagementRouter.get("/comments/:videoId", async (req, res) => {
  const { videoId } = req.params;
  const comments = await prisma.comment.findMany({ where: { videoId }, orderBy: { createdAt: "desc" } });
  res.json(comments);
});

engagementRouter.post("/share", requireAuth(["USER"]), async (req: any, res) => {
  const userId = req.principal.sub as string;
  const { videoId, target, externalId } = req.body || {};
  if (!videoId || !target) return res.status(400).json({ error: "Missing videoId or target" });
  const share = await prisma.$transaction(async (tx) => {
    const s = await tx.share.create({ data: { userId, videoId, target, externalId } });
    await tx.videoMetrics.update({ where: { videoId }, data: { shareCount: { increment: 1 } } }).catch(async () => {
      await tx.videoMetrics.create({ data: { videoId, shareCount: 1 } });
    });
    return s;
  });
  res.status(201).json(share);
});


