import type { Faq as FaqItem } from "@/content/servicios";

/** Preguntas frecuentes con <details>: accesible y funciona sin JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-12 max-w-3xl divide-y divide-tone-line border-y border-tone-line">
      {items.map((item) => (
        <details key={item.pregunta} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
            {item.pregunta}
            <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-tone-accent">{item.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
