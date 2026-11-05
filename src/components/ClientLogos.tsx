import Image from "next/image";
import { clientes } from "@/content/clientes";

export function ClientLogos() {
  return (
    <div className="mt-16 border-t border-tone-line pt-8">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">Marcas que confían en nosotros</p>
      <ul className="mt-6 grid grid-cols-2 items-center gap-6 sm:grid-cols-4">
        {clientes.map((c) => (
          <li key={c.nombre}>
            <Image src={c.logo} alt={`Logo de ${c.nombre}`} width={160} height={64} className="h-14 w-auto opacity-80" />
          </li>
        ))}
      </ul>
    </div>
  );
}
