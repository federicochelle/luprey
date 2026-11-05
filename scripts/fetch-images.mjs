// Descarga fotos de Pixabay a public/images/ y guarda los créditos en scripts/credits.json.
// Uso: npm run fetch-images                        (todas)
//      npm run fetch-images -- hero catalogos      (solo esas; filtra por texto en la ruta)
// Requiere PIXABAY_API_KEY en .env.local
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { servicios } from "../src/content/servicios.ts";
// Los casos demo reutilizan las imágenes de los reales: no se descargan aparte
import { casosReales as casos } from "../src/content/casos.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "images");

// --- API key desde .env.local (parser tolerante a espacios) ---
async function loadKey() {
  if (process.env.PIXABAY_API_KEY) return process.env.PIXABAY_API_KEY.trim();
  const env = await readFile(path.join(root, ".env.local"), "utf8");
  for (const line of env.split(/\r?\n/)) {
    const m = line.match(/^\s*PIXABAY_API_KEY\s*=\s*(.*?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  throw new Error("Falta PIXABAY_API_KEY en .env.local");
}

// --- Búsquedas (clave = slug real de servicios.ts / casos.ts) ---
const consultasServicios = {
  "redes-sociales": "social media smartphone",
  "diseno-grafico": "graphic designer",
  contenido: "taking photo food smartphone",
  fotografia: "photographer studio",
  catalogos: "flat lay products",
  "desarrollo-web": "web developer laptop",
};
const consultasCasos = {
  "tabla-y-birra": ["event furniture rental", "outdoor event tables", "wedding chairs tables", "table decoration flowers"],
  deleite: ["coffee shop", "bakery", "coffee pastry", "latte coffee cup"],
};

const tareas = [
  { file: "hero/hero.jpg", query: "golden field sunset" },
  { file: "hero/hero-2.jpg", query: "photographer working" },
  { file: "hero/hero-3.jpg", query: "creative workspace" },
  // Página Nosotros (una por bloque)
  { file: "nosotros/que-es.jpg", query: "marketing team brainstorming" },
  { file: "nosotros/pensamos-1.jpg", query: "strategy planning notebook" },
  { file: "nosotros/pensamos-2.jpg", query: "typing laptop content writing" },
  { file: "nosotros/pensamos-3.jpg", query: "small business shop owner" },
  { file: "nosotros/pensamos-4.jpg", query: "friendly conversation coffee" },
];
for (const s of servicios) {
  const query = consultasServicios[s.slug];
  if (!query) throw new Error(`Sin búsqueda definida para el servicio "${s.slug}"`);
  tareas.push({ file: `servicios/${s.slug}.jpg`, query });
}
for (const c of casos) {
  const queries = consultasCasos[c.slug];
  if (!queries) throw new Error(`Sin búsquedas definidas para el caso "${c.slug}"`);
  // La 4.ª imagen de cada caso es vertical (para el mosaico de la galería)
  queries.slice(0, 4).forEach((query, i) =>
    tareas.push({ file: `casos/${c.slug}-${i + 1}.jpg`, query, ...(i === 3 && { orientation: "vertical" }) }),
  );
}

// Fotos fijadas por ID de Pixabay (la ruta destino -> id). Tienen prioridad sobre la búsqueda.
// El ID es el número final de la URL de la foto: pixabay.com/photos/...-1234567/
const idsFijos = {
  // "hero/hero.jpg": 1234567,
  // "servicios/catalogos.jpg": 1234567,
  // "servicios/redes-sociales.jpg": 1234567,
};

// Tonos cálidos/neutros primero; si no hay resultados, sin filtro de color.
const COLORES = "orange,brown,yellow,white,gray";

// Pixabay ordena por popularidad, que no siempre es relevante: puntuamos cada resultado
// por cuántas palabras de la búsqueda aparecen en sus tags y elegimos el mejor.
const puntaje = (hit, query) => {
  const tags = hit.tags.toLowerCase();
  return query.split(/\s+/).filter((w) => tags.includes(w.toLowerCase())).length;
};

async function consultar(key, query, colors, orientation = "horizontal") {
  const params = new URLSearchParams({
    key,
    q: query,
    image_type: "photo",
    orientation,
    safesearch: "true",
    per_page: "50",
    order: "popular",
  });
  if (colors) params.set("colors", colors);
  const res = await fetch(`https://pixabay.com/api/?${params}`);
  if (!res.ok) throw new Error(`Pixabay respondió ${res.status} para "${query}"`);
  return (await res.json()).hits;
}

async function porId(key, id) {
  const res = await fetch(`https://pixabay.com/api/?${new URLSearchParams({ key, id: String(id) })}`);
  if (!res.ok) throw new Error(`Pixabay respondió ${res.status} para el id ${id}`);
  const hit = (await res.json()).hits[0];
  if (!hit) throw new Error(`No existe la foto con id ${id}`);
  return hit;
}

async function buscar(key, query, usados, orientation) {
  const minimo = Math.ceil(query.split(/\s+/).length / 2);
  let mejor = null;
  // Tonos cálidos/neutros primero; si no hay un resultado suficientemente relevante, sin filtro de color.
  for (const colors of [COLORES, null]) {
    for (const hit of await consultar(key, query, colors, orientation)) {
      if (usados.has(hit.id)) continue;
      const p = puntaje(hit, query);
      if (!mejor || p > mejor.p) mejor = { hit, p };
    }
    if (mejor && mejor.p >= minimo) break;
  }
  if (!mejor) throw new Error(`Sin resultados para "${query}"`);
  return mejor.hit;
}

const key = await loadKey();
const creditosPath = path.join(root, "scripts", "credits.json");
const creditos = JSON.parse(await readFile(creditosPath, "utf8").catch(() => "{}"));
const filtros = process.argv.slice(2);
const aProcesar = filtros.length ? tareas.filter((t) => filtros.some((f) => t.file.includes(f))) : tareas;
if (!aProcesar.length) throw new Error(`Ninguna imagen coincide con: ${filtros.join(", ")}`);

// IDs ya usados por las fotos que NO vamos a regenerar, para no repetir imágenes
const usados = new Set(
  Object.entries(creditos)
    .filter(([file]) => !aProcesar.some((t) => t.file === file))
    .map(([, c]) => c.id),
);
const fallos = [];

for (const { file, query, orientation } of aProcesar) {
  try {
    const fijo = idsFijos[file];
    const hit = fijo ? await porId(key, fijo) : await buscar(key, query, usados, orientation);
    usados.add(hit.id);
    const img = await fetch(hit.largeImageURL);
    if (!img.ok) throw new Error(`Descarga falló (${img.status})`);
    const dest = path.join(outDir, file);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await img.arrayBuffer()));
    creditos[file] = {
      query: fijo ? `id fijo ${fijo}` : query,
      autor: hit.user,
      autorUrl: `https://pixabay.com/users/${hit.user}-${hit.user_id}/`,
      url: hit.pageURL,
      id: hit.id,
      tags: hit.tags,
    };
    console.log(`✓ ${file}  ←  "${query}" (${hit.user}) [${hit.tags}]`);
  } catch (err) {
    fallos.push(file);
    console.error(`✗ ${file}: ${err.message}`);
  }
}

await writeFile(creditosPath, JSON.stringify(creditos, null, 2) + "\n");
console.log(`\n${aProcesar.length - fallos.length}/${aProcesar.length} imágenes descargadas.`);
if (fallos.length) process.exit(1);
