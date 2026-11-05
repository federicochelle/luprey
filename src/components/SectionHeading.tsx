import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  /** Título más chico (h1 de heros de dos columnas; h2 de secciones secundarias) */
  compact?: boolean;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, intro, as: Tag = "h2", compact, className }: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-tone-accent">{eyebrow}</p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-bold uppercase leading-[1.05] tracking-tight text-balance",
          Tag === "h1"
            ? compact
              ? "text-4xl sm:text-5xl xl:text-6xl"
              : "text-4xl sm:text-6xl lg:text-7xl"
            : compact
              ? "text-2xl sm:text-4xl"
              : "text-3xl sm:text-5xl",
        )}
      >
        {title}
      </Tag>
      {intro && <p className="mt-6 text-lg leading-relaxed text-tone-accent sm:text-xl">{intro}</p>}
    </div>
  );
}
