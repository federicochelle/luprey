"use client";

import { useId, type FormEvent, type ReactNode } from "react";
import { buttonClasses } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useWhatsAppPicker } from "./WhatsAppPicker";

export type ServicioOpcion = { slug: string; titulo: string };

const MSG_NOMBRE = "Contanos tu nombre para saber cómo llamarte.";

// Campos siempre blancos con texto carbón. Solo el contorno de foco usa el tono (tone-fg) para verse sobre crema y sobre carbón.
const campo =
  "w-full rounded-xl border border-carbon/20 bg-white px-4 py-3 text-carbon placeholder:text-oliva focus-visible:border-carbon focus-visible:outline-tone-fg";

function Campo({
  id,
  label,
  requerido,
  className,
  children,
}: {
  id: string;
  label: string;
  requerido?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">
        {label}
        {requerido && (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (obligatorio)</span>
          </>
        )}
      </label>
      {children}
    </div>
  );
}

/**
 * Formulario que arma el mensaje y abre el selector de WhatsApp (Mercedes / Fray Bentos) con ese texto.
 * Sin backend: no se envía ni se guarda ningún dato.
 */
export function WhatsAppForm({ servicios, defaultService }: { servicios: ServicioOpcion[]; defaultService?: string }) {
  const uid = useId();
  const { open } = useWhatsAppPicker();
  const ids = {
    nombre: `${uid}-nombre`,
    negocio: `${uid}-negocio`,
    servicio: `${uid}-servicio`,
    mensaje: `${uid}-mensaje`,
  };

  // Mensaje de validación en castellano rioplatense (se limpia al corregir el campo)
  const invalido = (e: FormEvent<HTMLInputElement>) => e.currentTarget.setCustomValidity(MSG_NOMBRE);
  const limpiar = (e: FormEvent<HTMLInputElement>) => e.currentTarget.setCustomValidity("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos = new FormData(form);
    const texto = (k: string) => String(datos.get(k) ?? "").trim();

    const nombre = texto("nombre");
    if (!nombre) {
      // Solo espacios: required lo deja pasar, lo marcamos acá
      const input = form.elements.namedItem("nombre") as HTMLInputElement;
      input.setCustomValidity(MSG_NOMBRE);
      input.reportValidity();
      return;
    }

    const negocio = texto("negocio");
    const servicio = texto("servicio");
    const mensaje = texto("mensaje");

    // "Hola! Soy [nombre] de [negocio]. Me interesa [servicio]. [mensaje]" (se omiten las partes vacías)
    const partes = [`Hola! Soy ${nombre}${negocio ? ` de ${negocio}` : ""}.`];
    if (servicio === "otro") partes.push("Me interesa otro tema.");
    else if (servicio) {
      const titulo = servicios.find((s) => s.slug === servicio)?.titulo;
      if (titulo) partes.push(`Me interesa ${titulo.toLowerCase()}.`);
    }
    if (mensaje) partes.push(mensaje);

    // El selector pregunta desde dónde escribe y abre wa.me del contacto de esa ciudad con este texto
    open(partes.join(" "));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo id={ids.nombre} label="Nombre" requerido>
          <input
            id={ids.nombre}
            name="nombre"
            type="text"
            autoComplete="given-name"
            required
            onInvalid={invalido}
            onInput={limpiar}
            className={campo}
          />
        </Campo>
        <Campo id={ids.negocio} label="Negocio o marca">
          <input id={ids.negocio} name="negocio" type="text" autoComplete="organization" className={campo} />
        </Campo>
        <Campo id={ids.servicio} label="¿Qué necesitás?" className="sm:col-span-2">
          <select id={ids.servicio} name="servicio" defaultValue={defaultService ?? ""} className={campo}>
            <option value="">Elegí una opción</option>
            {servicios.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.titulo}
              </option>
            ))}
            <option value="otro">Otro</option>
          </select>
        </Campo>
      </div>
      <Campo id={ids.mensaje} label="Mensaje (opcional)">
        <textarea id={ids.mensaje} name="mensaje" rows={3} className={campo} />
      </Campo>
      <button type="submit" className={buttonClasses("solid", "gap-2")}>
        <WhatsAppIcon className="size-5" />
        Enviar por WhatsApp
      </button>
    </form>
  );
}
