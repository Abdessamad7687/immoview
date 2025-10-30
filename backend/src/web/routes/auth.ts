import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { signAccessToken } from "../../auth/jwt";

export const authRouter = Router();

// Admin email/password login
authRouter.post("/admin/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !admin.isActive) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = signAccessToken({ role: "ADMIN", sub: admin.id, email: admin.email }, "8h");
  res.json({ accessToken: token });
});

// OAuth placeholders (Google/Facebook)
authRouter.get("/oauth/:provider/start", (req, res) => {
  const { provider } = req.params;
  res.status(200).json({ provider, message: "Initiate OAuth on frontend and hit /callback with code" });
});

authRouter.post("/oauth/:provider/callback", async (req, res) => {
  const { provider } = req.params;
  const { providerUserId, email, name, avatarUrl } = req.body || {};
  if (!providerUserId || !provider) return res.status(400).json({ error: "Missing providerUserId or provider" });

  const prov = provider.toUpperCase();
  if (prov !== "GOOGLE" && prov !== "FACEBOOK") return res.status(400).json({ error: "Unsupported provider" });

  // Upsert user by identity
  const user = await prisma.$transaction(async (tx) => {
    const identity = await tx.socialIdentity.findUnique({ where: { provider_providerUserId: { provider: prov as any, providerUserId } } });
    if (identity) {
      return tx.user.findUniqueOrThrow({ where: { id: identity.userId } });
    }
    const created = await tx.user.create({ data: { email: email || `${prov}:${providerUserId}@example.local`, name, avatarUrl } });
    await tx.socialIdentity.create({ data: { userId: created.id, provider: prov as any, providerUserId, email } });
    return created;
  });

  const token = signAccessToken({ role: "USER", sub: user.id, email: user.email }, "14d");
  res.json({ accessToken: token, user });
});


