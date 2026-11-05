# Luprey

Sitio web de **Luprey**, agencia de marketing de Mercedes y Fray Bentos (Uruguay).
Next.js (App Router) + TypeScript + Tailwind v4. Sin CMS, sin base de datos ni backend: todo el contenido vive en
`src/content/` y el formulario de contacto arma un mensaje y abre WhatsApp.

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compila para producción
npm run start    # sirve el build
npm run lint
```

## Variables de entorno

Copiá `.env.example` a `.env.local` y completalo.

| Variable | Para qué sirve |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio. La usan los canonicals, el sitemap y Open Graph. |
| `NEXT_PUBLIC_SITE_ENV` | `preview` (por defecto) o `production`. Si no es `production`: `robots.txt` bloquea todo y las páginas llevan `noindex, nofollow`. |
| `PIXABAY_API_KEY` | Solo para los scripts que descargan imágenes y videos. Nunca llega al sitio. |

## Cómo cargar un trabajo nuevo

1. Copiá las imágenes a `public/images/casos/` y, si hay, los videos verticales a `public/videos/casos/`
   (con su poster en `public/images/casos/`).
2. Abrí `src/content/casos.ts` y agregá un objeto a `todosLosCasos` con los campos obligatorios
   (`slug`, `cliente`, `titulo`, `rubro`, `servicios`, `ciudad`, `anio`, `resumen`, `portada`).
3. Sumá los opcionales que tengas: `galeria` (fotos y reels juntos, en el mismo mosaico), `antesDespues`,
   `testimonio`, `resultados`. Cada sección de la página solo aparece si el caso tiene ese dato.

El caso aparece solo en `/trabajos`, en el sitemap, en `/trabajos/<slug>` y enlazado desde sus servicios.
Los servicios, los textos de la home y los de Nosotros están en `src/content/` (`servicios.ts`, `home.ts`, `nosotros.ts`).

## Flags

- **Contenido de ejemplo:** `SHOW_DEMO_CASES` (`src/content/casos.ts`) y `SHOW_DEMO_CLIENTS` (`src/content/clientes.ts`).
  Mientras estén en `true`, `next build` avisa. Ponerlos en `false` antes de publicar.
- **Trazos decorativos:** `MOSTRAR_TRAZOS` (`src/content/trazos.ts`), apagado por defecto. Para sumar la línea
  original de la marca, pegar su path en `LINEA_ORIGINAL` del mismo archivo.

## Scripts

- `npm run fetch-images`: descarga fotos de Pixabay (requiere `PIXABAY_API_KEY`).
- `npm run fetch-videos`: descarga videos verticales de Pixabay para los reels.
- `npm run generate-avatars`: regenera los avatares del equipo.

Los créditos de lo descargado quedan en `scripts/credits.json`.
