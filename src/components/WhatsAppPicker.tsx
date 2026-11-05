"use client";

import { createContext, useCallback, useContext, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { site, whatsappUrl } from "@/content/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

const WhatsAppContext = createContext<{ open: (mensaje?: string) => void } | null>(null);

/** Abre el selector de ciudad desde cualquier componente cliente. */
export function useWhatsAppPicker() {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) throw new Error("useWhatsAppPicker debe usarse dentro de <WhatsAppPicker>");
  return ctx;
}

/**
 * Selector "¿Desde dónde nos escribís?". Usa <dialog> nativo en modo modal:
 * atrapa el foco, cierra con Escape y devuelve el foco al botón que lo abrió.
 * Un solo diálogo compartido por todos los botones del sitio.
 */
export function WhatsAppPicker({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [mensaje, setMensaje] = useState<string>(site.mensajeWhatsapp);

  const open = useCallback((m?: string) => {
    setMensaje(m ?? site.mensajeWhatsapp);
    dialogRef.current?.showModal();
  }, []);
  const close = () => dialogRef.current?.close();
  const value = useMemo(() => ({ open }), [open]);

  return (
    <WhatsAppContext value={value}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        data-tone="crema"
        // El clic en el fondo (::backdrop) tiene como target al propio <dialog>
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="wa-dialog m-auto w-[min(92vw,28rem)] rounded-3xl p-0 text-tone-fg"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="text-2xl font-bold uppercase leading-tight">
              ¿Desde dónde nos escribís?
            </h2>
            <button
              type="button"
              onClick={close}
              className="-mr-2 -mt-2 flex size-11 shrink-0 items-center justify-center"
            >
              <span className="sr-only">Cerrar</span>
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <ul className="mt-6 space-y-3">
            {site.contactos.map((c) => (
              <li key={c.id}>
                <a
                  href={whatsappUrl(c, mensaje)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex items-center gap-4 rounded-2xl border-2 border-tone-fg p-4 transition-colors hover:bg-tone-fg hover:text-tone-bg"
                >
                  <WhatsAppIcon className="size-7 shrink-0" />
                  <span>
                    <span className="block text-lg font-bold uppercase">{c.ciudad}</span>
                    <span className="block text-sm">
                      {c.nombre} · {c.telefono}
                    </span>
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </WhatsAppContext>
  );
}
