import type { LucideIcon } from "lucide-react";

const sizes = { md: 36, lg: 48 } as const;

/** Ícono de servicio: trazo fino y color heredado (carbón sobre crema, crema sobre carbón). */
export function ServiceIcon({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: keyof typeof sizes }) {
  return <Icon size={sizes[size]} strokeWidth={1.25} aria-hidden="true" className="text-tone-fg" />;
}
