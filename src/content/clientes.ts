export type Cliente = { nombre: string; logo: string };

// Reemplazar los logos placeholder por los reales en /public/clientes/
export const clientes: Cliente[] = [
  { nombre: "Tabla y Birra", logo: "/placeholders/logo-cliente.svg" },
  { nombre: "Deleite", logo: "/placeholders/logo-cliente.svg" },
  { nombre: "[COMPLETAR] Cliente 3", logo: "/placeholders/logo-cliente.svg" },
  { nombre: "[COMPLETAR] Cliente 4", logo: "/placeholders/logo-cliente.svg" },
];
