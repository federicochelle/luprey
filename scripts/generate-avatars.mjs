// Genera los avatares del equipo (estilo "lorelei" de DiceBear, licencia CC0) como SVG locales.
// Uso: npm run generate-avatars
// Para reemplazarlos por fotos reales, guardá sofia-perez.jpg y sofia-giurgi.jpg en public/images/equipo/ y
// cambiá las rutas en src/content/nosotros.ts.
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images", "equipo");

// Estilo común: pelo negro, sin accesorios, fondo oliva suave
const base = {
  seed: "luprey",
  hairColor: ["000000"],
  beardProbability: 0,
  earringsProbability: 0,
  hairAccessoriesProbability: 0,
  frecklesProbability: 0,
  backgroundColor: ["dcdfd0"],
};

const avatares = {
  // Pelo largo y suelto
  "sofia-perez": { hair: ["variant16"], glassesProbability: 0, skinColor: ["f5cfb4"] },
  // Rodete con flequillo y lentes de marco fino
  "sofia-giurgi": {
    hair: ["variant14"],
    glasses: ["variant03"],
    glassesProbability: 100,
    glassesColor: ["000000"],
    skinColor: ["f8dcc8"],
  },
};

await mkdir(outDir, { recursive: true });
const creditosPath = path.join(root, "scripts", "credits.json");
const creditos = JSON.parse(await readFile(creditosPath, "utf8").catch(() => "{}"));

for (const [nombre, opciones] of Object.entries(avatares)) {
  const svg = createAvatar(lorelei, { ...base, ...opciones }).toString();
  await writeFile(path.join(outDir, `${nombre}.svg`), svg);
  creditos[`equipo/${nombre}.svg`] = {
    tipo: "ilustración generada (DiceBear)",
    estilo: "Lorelei",
    autor: "Lisa Wischofsky (estilo Lorelei), vía DiceBear",
    licencia: "CC0 1.0",
    url: "https://www.dicebear.com/styles/lorelei/",
    opciones,
  };
  console.log(`✓ equipo/${nombre}.svg`);
}

await writeFile(creditosPath, JSON.stringify(creditos, null, 2) + "\n");
