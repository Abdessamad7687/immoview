import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type JwtPrincipal = {
  role: "ADMIN" | "USER";
  sub: string; // subject id
  email?: string;
};

export function signAccessToken(principal: JwtPrincipal, expiresIn: string = "1h") {
  return jwt.sign(principal, env.JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): JwtPrincipal {
  return jwt.verify(token, env.JWT_SECRET) as JwtPrincipal;
}


