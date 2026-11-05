export type Cliente = {
  nombre: string;
  logo: string;
  /** Cliente ficticio de demostración: se oculta con SHOW_DEMO_CLIENTS = false */
  demo?: boolean;
};

/**
 * Clientes de demostración (con `demo: true`, nombres inventados).
 * PONER EN false ANTES DE PUBLICAR.
 */
export const SHOW_DEMO_CLIENTS = true;

// Logos placeholder en /public/images/clientes/. Reemplazarlos por los oficiales
// con el mismo nombre de archivo (monocromáticos en carbón, para que la tira se vea pareja).
const todosLosClientes: Cliente[] = [
  { nombre: "Tabla y Birra", logo: "/images/clientes/tabla-y-birra.svg" },
  { nombre: "Deleite", logo: "/images/clientes/deleite.svg" },

  // ---------- DEMO (marcas ficticias) ----------
  { nombre: "Horno Alba, panadería", logo: "/images/clientes/horno-alba.svg", demo: true },
  { nombre: "Cuatro Techos, inmobiliaria", logo: "/images/clientes/cuatro-techos.svg", demo: true },
  { nombre: "Hilo Norte, indumentaria", logo: "/images/clientes/hilo-norte.svg", demo: true },
  { nombre: "Cima Viva, gimnasio", logo: "/images/clientes/cima-viva.svg", demo: true },
  { nombre: "Estudio Cifra Sur, estudio contable", logo: "/images/clientes/estudio-cifra-sur.svg", demo: true },
  { nombre: "Grano Claro, cafetería", logo: "/images/clientes/grano-claro.svg", demo: true },
];

export const clientes: Cliente[] = SHOW_DEMO_CLIENTS ? todosLosClientes : todosLosClientes.filter((c) => !c.demo);
