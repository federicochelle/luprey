export type Cliente = {
  /** Nombre completo: se usa en el alt del logo */
  nombre: string;
  logo: string;
  /** Dimensiones reales del archivo (para next/image) */
  ancho: number;
  alto: number;
};

// Logos en /public/images/clientes/ (WebP con transparencia, máx. 400×200).
// Originales en /originales-imagenes/clientes/. Todos son oscuros o de color: la tira va sobre fondo claro.
export const clientes: Cliente[] = [
  { nombre: "Alto Sur Supermercado", logo: "/images/clientes/alto-sur.webp", ancho: 400, alto: 116 },
  { nombre: "Alianza – Servicio de acompañante y enfermería", logo: "/images/clientes/alianza.webp", ancho: 400, alto: 112 },
  { nombre: "El Jardín de la Felicidad", logo: "/images/clientes/el-jardin-de-la-felicidad.webp", ancho: 400, alto: 169 },
  { nombre: "Intendencia de Soriano y Municipio de Palmitas", logo: "/images/clientes/intendencia-soriano-palmitas.webp", ancho: 400, alto: 171 },
  { nombre: "Deleite Artesanal", logo: "/images/clientes/deleite-artesanal.webp", ancho: 145, alto: 200 },
  { nombre: "Santina Ruiz Milans – Cosmetóloga médica", logo: "/images/clientes/santina-ruiz-milans.webp", ancho: 200, alto: 200 },
  { nombre: "Tres Grados", logo: "/images/clientes/tres-grados.webp", ancho: 336, alto: 106 },
  { nombre: "Melazzi Representaciones", logo: "/images/clientes/melazzi.webp", ancho: 254, alto: 67 },
  { nombre: "Psicóloga Milagros Buffa", logo: "/images/clientes/milagros-buffa.webp", ancho: 366, alto: 23 },
];
