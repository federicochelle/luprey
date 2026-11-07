import Image from "next/image";
import { clientes, type Cliente } from "@/content/clientes";

function Logo({ cliente }: { cliente: Cliente }) {
  return (
    <Image
      src={cliente.logo}
      alt={`Logo de ${cliente.nombre}`}
      width={cliente.ancho}
      height={cliente.alto}
      // Misma altura base para todos; el ancho máximo evita que los muy horizontales dominen (object-contain: sin deformar).
      // Discretos: con poca opacidad y sin color; en hover vuelven a color completo
      className="h-12 w-auto max-w-36 object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-16 sm:max-w-48"
    />
  );
}

/** Grilla de logos de clientes (sin título: lo pone la sección que la contiene). */
export function ClientLogos() {
  return (
    // 2 columnas en mobile (el último, si queda solo, va centrado), 3 desde sm
    <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-14">
      {clientes.map((c) => (
        <li
          key={c.nombre}
          className="flex justify-center max-sm:last:odd:col-span-2"
        >
          <Logo cliente={c} />
        </li>
      ))}
    </ul>
  );
}
