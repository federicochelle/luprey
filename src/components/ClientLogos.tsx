import Image from "next/image";
import { clientes, type Cliente } from "@/content/clientes";

// Con más logos que esto, la tira pasa a marquee lento. Con 4 o menos: estáticos y centrados.
const MAX_ESTATICOS = 4;

function Logo({ cliente, decorativo }: { cliente: Cliente; decorativo?: boolean }) {
  return (
    <Image
      src={cliente.logo}
      alt={decorativo ? "" : `Logo de ${cliente.nombre}`}
      width={213}
      height={64}
      // Discretos: con poca opacidad y sin color; en hover vuelven a color completo
      className="h-12 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-16"
    />
  );
}

/** Tira de logos de clientes (sin título: lo pone la sección que la contiene). */
export function ClientLogos() {
  const marquee = clientes.length > MAX_ESTATICOS;

  return marquee ? (
    // Marquee lento: pausa con hover; con prefers-reduced-motion queda estático y se desplaza a mano.
    <div className="marquee">
      <div className="marquee-track">
        <ul className="marquee-list">
          {clientes.map((c) => (
            <li key={c.nombre}>
              <Logo cliente={c} />
            </li>
          ))}
        </ul>
        {/* Copia para el loop continuo: oculta a lectores de pantalla */}
        <ul className="marquee-list marquee-dup" aria-hidden="true">
          {clientes.map((c) => (
            <li key={c.nombre}>
              <Logo cliente={c} decorativo />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
      {clientes.map((c) => (
        <li key={c.nombre}>
          <Logo cliente={c} />
        </li>
      ))}
    </ul>
  );
}
