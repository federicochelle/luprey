// Comprime las imágenes de public/images/ (jpg, png y webp) con sharp, en el mismo lugar:
// - ancho máximo 1920 px (no agranda las más chicas),
// - calidad 80 y, si todavía pesa más de 300 KB, baja la calidad de a poco y, si hace falta, el ancho,
// - mantiene nombre y formato. Solo reemplaza el archivo si el resultado pesa menos que el original.
// Hace falta porque el sitio usa images.unoptimized (Vercel no optimiza): cada imagen se sirve tal cual está.
// Uso: npm run optimize-images
import sharp from "sharp";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const carpeta = path.join(root, "public", "images");
const ANCHO_MAX = 1920;
const PESO_MAX = 300 * 1024;
const CALIDAD = 80;

async function listar(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await listar(p)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) out.push(p);
  }
  return out;
}

async function comprimir(entrada, ancho, calidad, ext) {
  let img = sharp(entrada, { failOn: "none" }).rotate().resize({ width: ancho, withoutEnlargement: true });
  if (ext === ".png") img = img.png({ quality: calidad, compressionLevel: 9, palette: true, effort: 10 });
  else if (ext === ".webp") img = img.webp({ quality: calidad, effort: 6 });
  else img = img.jpeg({ quality: calidad, mozjpeg: true });
  return img.toBuffer();
}

const archivos = await listar(carpeta);
let antes = 0, despues = 0, pasadas = 0;
const siguenPesadas = [];

for (const archivo of archivos) {
  const ext = path.extname(archivo).toLowerCase().replace(".jpeg", ".jpg");
  const original = await readFile(archivo);
  const meta = await sharp(original).metadata();
  const anchoInicial = Math.min(meta.width ?? ANCHO_MAX, ANCHO_MAX);

  // Calidad 80 y, si todavía pasa de 300 KB, se baja la calidad y después el ancho
  let mejor = await comprimir(original, anchoInicial, CALIDAD, ext);
  for (const calidad of [72, 65, 58, 50]) {
    if (mejor.length <= PESO_MAX) break;
    mejor = await comprimir(original, anchoInicial, calidad, ext);
  }
  for (let ancho = Math.round(anchoInicial * 0.85); mejor.length > PESO_MAX && ancho >= 800; ancho = Math.round(ancho * 0.85)) {
    mejor = await comprimir(original, ancho, 58, ext);
  }

  antes += original.length;
  if (mejor.length < original.length) {
    await writeFile(archivo, mejor);
    despues += mejor.length;
    pasadas++;
  } else {
    despues += original.length; // ya estaba más liviana: se deja como está
  }
  const final = (await stat(archivo)).size;
  if (final > PESO_MAX) siguenPesadas.push(`${path.relative(root, archivo)} (${Math.round(final / 1024)} KB)`);
  console.log(`${path.relative(root, archivo).padEnd(48)} ${String(Math.round(original.length / 1024)).padStart(5)} KB -> ${String(Math.round(final / 1024)).padStart(5)} KB`);
}

console.log(`\n${archivos.length} imágenes, ${pasadas} comprimidas: ${(antes / 1048576).toFixed(2)} MB -> ${(despues / 1048576).toFixed(2)} MB`);
if (siguenPesadas.length) {
  console.error("Siguen sobre 300 KB:", siguenPesadas.join(", "));
  process.exit(1);
}
console.log("Ninguna pesa más de 300 KB.");
