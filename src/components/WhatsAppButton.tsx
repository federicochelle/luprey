"use client";

import type { ReactNode } from "react";
import { buttonClasses } from "./Button";
import { useWhatsAppPicker } from "./WhatsAppPicker";

/** Botón con el estilo de <Button> que abre el selector de WhatsApp. */
export function WhatsAppButton({
  variant = "solid",
  message,
  className,
  children,
}: {
  variant?: "solid" | "outline";
  /** Mensaje inicial distinto del genérico */
  message?: string;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useWhatsAppPicker();
  return (
    <button type="button" aria-haspopup="dialog" onClick={() => open(message)} className={buttonClasses(variant, className)}>
      {children}
    </button>
  );
}
