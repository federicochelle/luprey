import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { SHOW_DEMO_CASES } from "./src/content/casos";
import { SHOW_DEMO_CLIENTS } from "./src/content/clientes";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Vercel agotó el límite gratis de Image Optimization: las imágenes se sirven tal cual están en public/.
  // Por eso hay que comprimirlas antes (npm run optimize-images: máx. 1920 px y 300 KB).
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default function config(phase: string): NextConfig {
  // La config se evalúa varias veces durante el build (workers): avisamos una sola vez.
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.LUPREY_DEMO_WARNED) {
    process.env.LUPREY_DEMO_WARNED = "1";
    const activos = [
      SHOW_DEMO_CASES && "SHOW_DEMO_CASES (src/content/casos.ts)",
      SHOW_DEMO_CLIENTS && "SHOW_DEMO_CLIENTS (src/content/clientes.ts)",
    ].filter(Boolean);
    if (process.env.NEXT_PUBLIC_SITE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
      console.warn("\n⚠️  NEXT_PUBLIC_SITE_ENV=production pero falta NEXT_PUBLIC_SITE_URL: canonicals y sitemap saldrán con localhost.\n");
    }
    if (activos.length) {
      console.warn(
        `\n⚠️  CONTENIDO DEMO ACTIVO: ${activos.join(" y ")} está en true.\n` +
          "   Ponelo en false antes de publicar.\n",
      );
    }
  }
  return nextConfig;
}
