import { whatsappUrl } from "@/content/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Botón flotante de WhatsApp, visible en todas las páginas. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp (se abre en una pestaña nueva)"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full border-2 border-crema bg-oliva text-crema shadow-lg transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
