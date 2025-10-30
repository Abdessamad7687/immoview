import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { router } from "./web/router";
import path from "node:path";
import { uploadsDir } from "./storage/local";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN || true, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api", router);

// Static file serving for uploaded files
app.use("/files", express.static(uploadsDir, { fallthrough: true, maxAge: env.NODE_ENV === "production" ? "7d" : 0 }));

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ err }, "Unhandled error");
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

const port = Number(env.PORT);
app.listen(port, () => {
  logger.info({ port, env: env.NODE_ENV }, "Backend server started");
});


