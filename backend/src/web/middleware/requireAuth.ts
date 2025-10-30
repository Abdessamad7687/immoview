import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPrincipal } from "../../auth/jwt";

export function requireAuth(roles?: Array<JwtPrincipal["role"]>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const token = header.substring("Bearer ".length);
      const principal = verifyToken(token);
      if (roles && roles.length > 0 && !roles.includes(principal.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }
      (req as any).principal = principal;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}


