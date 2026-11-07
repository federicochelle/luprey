// Genera el favicon "Ly." (texto #232323 sobre fondo cuadrado #E3E3E3) a partir de los glifos del wordmark
// "Luprey." (src/components/LogoMark.tsx): L, y y el punto, con su espaciado original.
// Salida: src/app/icon.svg (512), src/app/apple-icon.png (180) y src/app/favicon.ico (16, 32 y 48).
// Uso: npm run generate-favicons
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FG = "#232323";
const BG = "#E3E3E3";

// --- Glifos del wordmark (subpaths del path del logo, por su punto de partida) ---
const logo = await readFile(path.join(root, "src/components/LogoMark.tsx"), "utf8");
const d = logo.match(/d="([^"]+)"/)[1];
const subpaths = d.split("Z").filter((s) => s.trim()).map((s) => `${s.trim()}Z`);
const glifo = (inicio) => {
  const sp = subpaths.find((s) => s.startsWith(`M${inicio}`));
  if (!sp) throw new Error(`No encontré el glifo que empieza en M${inicio}`);
  return sp;
};
const glifos = { L: glifo("137.9 329.6"), y: glifo("1565.3 423.2"), punto: glifo("1908.0 336.4") };

// Caja real de tinta de cada glifo (se renderiza solo y se recorta)
async function caja(pathD) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 446" width="2000" height="446"><path d="${pathD}" fill="#000"/></svg>`;
  const { info } = await sharp(Buffer.from(svg)).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  return { x: -info.trimOffsetLeft, y: -info.trimOffsetTop, w: info.width, h: info.height };
}
const cajas = { L: await caja(glifos.L), y: await caja(glifos.y), punto: await caja(glifos.punto) };

// Espaciado original del wordmark: L→u ≈ 27, y→punto ≈ 43 (en unidades del logo). Entre L e y usamos 30.
const GAP_L_Y = 30;
const GAP_Y_PUNTO = 43;
const pos = { L: 0 };
pos.y = cajas.L.w + GAP_L_Y;
pos.punto = pos.y + cajas.y.w + GAP_Y_PUNTO;
const anchoTexto = pos.punto + cajas.punto.w;
const top = Math.min(cajas.L.y, cajas.y.y, cajas.punto.y);
const bottom = Math.max(...Object.values(cajas).map((c) => c.y + c.h));
const altoTexto = bottom - top;

/** SVG cuadrado de `size` px; el texto ocupa `fraccion` del ancho, centrado en ambos ejes. */
function svgIcono(size, fraccion) {
  const k = (size * fraccion) / anchoTexto;
  const ox = (size - anchoTexto * k) / 2;
  const oy = (size - altoTexto * k) / 2;
  const g = (nombre) => {
    const c = cajas[nombre];
    const tx = ox + pos[nombre] * k - c.x * k;
    const ty = oy + (c.y - top) * k - c.y * k;
    return `<path transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${k.toFixed(5)})" d="${glifos[nombre]}"/>`;
  };
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<rect width="${size}" height="${size}" fill="${BG}"/>` +
    `<g fill="${FG}" fill-rule="evenodd">${g("L")}${g("y")}${g("punto")}</g></svg>`
  );
}

const png = (size, fraccion) => sharp(Buffer.from(svgIcono(size * 4, fraccion))).resize(size, size).png().toBuffer();

// icon (512): 80 % del ancho
await writeFile(path.join(root, "src/app/icon.svg"), svgIcono(512, 0.8));
// apple-icon (180): 80 %
await writeFile(path.join(root, "src/app/apple-icon.png"), await png(180, 0.8));

// favicon.ico (16, 32, 48): más grande (90 %) para que se lea a tamaño chico. ICO con PNGs embebidos.
const tamanos = [16, 32, 48];
const imagenes = await Promise.all(tamanos.map((s) => png(s, 0.9)));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(tamanos.length, 4);
let offset = 6 + 16 * tamanos.length;
const entradas = imagenes.map((img, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(tamanos[i], 0);
  e.writeUInt8(tamanos[i], 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  return e;
});
await writeFile(path.join(root, "src/app/favicon.ico"), Buffer.concat([header, ...entradas, ...imagenes]));
console.log("✓ icon.svg, apple-icon.png y favicon.ico (16/32/48) generados");
