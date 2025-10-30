import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@immoview.local";
  const name = process.env.SEED_ADMIN_NAME || "Super Admin";
  const password = process.env.SEED_ADMIN_PASSWORD || "admin12345";
  const hash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, name, passwordHash: hash, isSuperAdmin: true }
  });

  // Ensure metrics exist for all videos
  const videos = await prisma.video.findMany({ select: { id: true } });
  for (const v of videos) {
    await prisma.videoMetrics.upsert({ where: { videoId: v.id }, update: {}, create: { videoId: v.id } });
  }

  console.log("Seed completed:", { admin: { email: admin.email } });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});


