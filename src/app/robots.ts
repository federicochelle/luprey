import type { MetadataRoute } from "next";
import { esProduccion, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Preview: nada se indexa hasta el lanzamiento
  if (!esProduccion) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
