"use client";

import { useId, useState } from "react";
import type { Faq as FaqItem } from "@/content/servicios";

function Pregunta({ item }: { item: FaqItem }) {
  const [abierta, setAbierta] = useState(false);
  const id = useId();
  const botonId = `${id}-boton`;
  const panelId = `${id}-panel`;

  return (
    <div className="py-5">
      <h3>
        <button
          type="button"
          id={botonId}
          aria-expanded={abierta}
          aria-controls={panelId}
          onClick={() => setAbierta((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-lg font-bold"
        >
          {item.pregunta}
          <span aria-hidden="true" className="faq-icon text-2xl text-oliva">
            +
          </span>
        </button>
      </h3>
      {/* La altura anima con grid-template-rows (ver globals.css) */}
      <div id={panelId} role="region" aria-labelledby={botonId} data-open={abierta} className="faq-panel">
        <div>
          <p className="pt-3 text-tone-accent">{item.respuesta}</p>
        </div>
      </div>
    </div>
  );
}

/** Preguntas frecuentes: acordeón con botones (aria-expanded / aria-controls) y animación de altura en CSS. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-12 max-w-3xl divide-y divide-tone-line border-y border-tone-line">
      {items.map((item) => (
        <Pregunta key={item.pregunta} item={item} />
      ))}
    </div>
  );
}
