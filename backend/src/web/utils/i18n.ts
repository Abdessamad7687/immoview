import { Request } from "express";

export type SupportedLang = "ar" | "fr" | "en";

export function detectLang(req: Request): SupportedLang {
  const q = (req.query.lang as string | undefined)?.toLowerCase();
  if (q === "ar" || q === "fr" || q === "en") return q;
  const h = req.headers["accept-language"] as string | undefined;
  if (h?.toLowerCase().startsWith("ar")) return "ar";
  if (h?.toLowerCase().startsWith("fr")) return "fr";
  return "en";
}

export function localizeVideo<T extends {
  title: string;
  titleFr?: string | null;
  titleAr?: string | null;
  description?: string | null;
  descriptionFr?: string | null;
  descriptionAr?: string | null;
}>(lang: SupportedLang, v: T) {
  const title =
    (lang === "ar" ? v.titleAr : lang === "fr" ? v.titleFr : v.title) ||
    v.titleFr ||
    v.titleAr ||
    v.title;
  const description =
    (lang === "ar" ? v.descriptionAr : lang === "fr" ? v.descriptionFr : v.description) ||
    v.descriptionFr ||
    v.descriptionAr ||
    v.description ||
    null;
  return { ...v, title, description };
}


