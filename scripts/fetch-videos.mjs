// Descarga videos verticales cortos de Pixabay (API de videos) para los "reels" de los casos.
// Uso: npm run fetch-videos        (requiere PIXABAY_API_KEY en .env.local; el poster usa qlmanage/sips de macOS)
//
// - Elige la mejor resolución vertical que pese menos de 4 MB.
// - Avisa si el archivo trae pista de audio (afinfo) para que elijas otro video.
// - Guarda el mp4 en public/videos/casos/ y un frame como poster en public/images/casos/.
// - Suma la entrada a scripts/credits.json.
import { execFileSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAX_BYTES = 4_000_000;

// archivo (sin extensión) -> id del video en Pixabay (pixabay.com/videos/...-ID/)
const videos = {
  "reel-1": 236256, // café
  "reel-2": 227128, // elegido sin pista de audio
  "reel-3": 364873, // cupcakes
};

async function loadKey() {
  if (process.env.PIXABAY_API_KEY) return process.env.PIXABAY_API_KEY.trim();
  const env = await readFile(path.join(root, ".env.local"), "utf8");
  const m = env.match(/^\s*PIXABAY_API_KEY\s*=\s*(.*?)\s*$/m);
  if (!m) throw new Error("Falta PIXABAY_API_KEY en .env.local");
  return m[1].replace(/^["']|["']$/g, "");
}

const tieneAudio = (file) => {
  try {
    return /audio|channels|sample rate/i.test(execFileSync("afinfo", [file], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }));
  } catch {
    return false; // afinfo falla si no hay pista de audio
  }
};

const key = await loadKey();
const creditosPath = path.join(root, "scripts", "credits.json");
const creditos = JSON.parse(await readFile(creditosPath, "utf8").catch(() => "{}"));
await mkdir(path.join(root, "public", "videos", "casos"), { recursive: true });
await mkdir(path.join(root, "public", "images", "casos"), { recursive: true });
let fallos = 0;

for (const [nombre, id] of Object.entries(videos)) {
  try {
    const res = await fetch(`https://pixabay.com/api/videos/?${new URLSearchParams({ key, id: String(id) })}`);
    if (!res.ok) throw new Error(`Pixabay respondió ${res.status}`);
    const hit = (await res.json()).hits[0];
    if (!hit) throw new Error(`No existe el video ${id}`);

    const opciones = ["large", "medium", "small", "tiny"]
      .map((k) => hit.videos[k])
      .filter((v) => v?.url && v.height > v.width && v.size < MAX_BYTES);
    if (!opciones.length) throw new Error("Sin versión vertical de menos de 4 MB");
    const elegida = opciones[0]; // la de mayor resolución que entra en el límite

    const bin = Buffer.from(await (await fetch(elegida.url)).arrayBuffer());
    if (bin.length >= MAX_BYTES) throw new Error(`Pesa ${(bin.length / 1e6).toFixed(1)} MB`);
    const destino = path.join(root, "public", "videos", "casos", `${nombre}.mp4`);
    await writeFile(destino, bin);

    if (tieneAudio(destino)) console.warn(`  ⚠ ${nombre}.mp4 trae pista de audio: elegí otro video`);

    // Poster: un frame del video (miniatura de Quick Look -> jpg)
    const tmp = path.join(tmpdir(), `luprey-poster-${nombre}`);
    await rm(tmp, { recursive: true, force: true });
    await mkdir(tmp, { recursive: true });
    execFileSync("qlmanage", ["-t", "-s", "960", "-o", tmp, destino], { stdio: "ignore" });
    const png = path.join(tmp, `${nombre}.mp4.png`);
    const poster = path.join(root, "public", "images", "casos", `${nombre}-poster.jpg`);
    execFileSync("sips", ["-s", "format", "jpeg", png, "--out", poster], { stdio: "ignore" });
    await rm(tmp, { recursive: true, force: true });

    creditos[`videos/casos/${nombre}.mp4`] = {
      tipo: "video",
      autor: hit.user,
      autorUrl: `https://pixabay.com/users/${hit.user}-${hit.user_id}/`,
      url: hit.pageURL,
      id: hit.id,
      tags: hit.tags,
      duracion: hit.duration,
      resolucion: `${elegida.width}x${elegida.height}`,
      bytes: bin.length,
    };
    console.log(`✓ ${nombre}.mp4  ${elegida.width}x${elegida.height}  ${(bin.length / 1e6).toFixed(2)} MB  ${hit.duration}s  (${hit.user})`);
  } catch (err) {
    fallos++;
    console.error(`✗ ${nombre}: ${err.message}`);
  }
}

await writeFile(creditosPath, JSON.stringify(creditos, null, 2) + "\n");
if (fallos) process.exit(1);
