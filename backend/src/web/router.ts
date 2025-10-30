import { Router } from "express";
import { adminRouter } from "./routes/admin";
import { authRouter } from "./routes/auth";
import { videoRouter } from "./routes/videos";
import { engagementRouter } from "./routes/engagement";
import { uploadsRouter } from "./routes/uploads";

export const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/videos", videoRouter);
router.use("/engagement", engagementRouter);
router.use("/uploads", uploadsRouter);


