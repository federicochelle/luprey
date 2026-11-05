import { proceso } from "@/content/proceso";

export function ProcessSteps() {
  return (
    <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {proceso.map((paso, i) => (
        <li key={paso.titulo} className="border-t-2 border-tone-fg pt-6">
          <span className="text-sm font-bold text-tone-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 text-2xl font-bold uppercase">{paso.titulo}</h3>
          <p className="mt-3 text-tone-accent">{paso.descripcion}</p>
        </li>
      ))}
    </ol>
  );
}
