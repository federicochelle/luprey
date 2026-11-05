import { proceso } from "@/content/proceso";

export function ProcessSteps() {
  return (
    <ol className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
      {proceso.map((paso, i) => (
        <li key={paso.titulo}>
          <span aria-hidden="true" className="block text-[56px] font-bold leading-none text-oliva lg:text-[72px]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-8 text-2xl font-bold uppercase">{paso.titulo}</h3>
          <p className="mt-3 text-tone-accent">{paso.descripcion}</p>
        </li>
      ))}
    </ol>
  );
}
