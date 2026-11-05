"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { esProduccion, site, tieneHeaderTransparente } from "@/content/site";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [arriba, setArriba] = useState(true);

  // "Arriba del todo" = el sentinel (los primeros 40 px de la página) está a la vista.
  // Un IntersectionObserver solo dispara al cruzar ese umbral: no hay listener de scroll ni re-renders por cada píxel.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entrada]) => setArriba(entrada.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Transparente solo en páginas con hero oscuro, arriba de todo y con el menú móvil cerrado
  const transparente = tieneHeaderTransparente(pathname) && arriba && !open;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Mientras el menú está abierto: sin scroll del body, y se cierra si la pantalla pasa a desktop
  useEffect(() => {
    if (!open) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previo;
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  // Cada elemento del menú recibe su posición para el escalonado: --i (entrada) y --r (salida, inversa)
  const total = site.menu.length;
  const escalonado = (i: number) => ({ "--i": i, "--r": total - 1 - i }) as React.CSSProperties;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-10 w-full" />
      <header
        data-tone={transparente ? "carbon" : "crema"}
        className={cn(
          esProduccion ? "top-0" : "top-8", // con la franja de preview, el header baja 2rem
          "fixed inset-x-0 z-50 border-b transition-[background-color,border-color,box-shadow,color] duration-[250ms] ease-out",
          transparente ? "border-transparent bg-transparent" : "border-tone-line bg-crema/95 shadow-sm backdrop-blur",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6 sm:h-20">
          <Logo />

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {site.menu.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "text-sm font-bold uppercase tracking-wide underline-offset-8 hover:underline",
                      isActive(item.href) && "underline",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex size-11 items-center justify-center md:hidden"
          >
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            <svg viewBox="0 0 24 24" className="burger size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line className="burger-top" x1="4" y1="7" x2="20" y2="7" />
              <line className="burger-mid" x1="4" y1="12" x2="20" y2="12" />
              <line className="burger-bot" x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </Container>

        {/* Panel superpuesto bajo la barra (no empuja el contenido). Se anima con data-open (ver globals.css). */}
        <nav
          id={menuId}
          aria-label="Menú móvil"
          data-open={open}
          data-tone="crema"
          className="mobile-menu absolute inset-x-0 top-full border-b border-tone-line bg-crema md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {site.menu.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                style={escalonado(i)}
                className={cn(
                  "mobile-menu-item py-3 text-xl font-bold uppercase",
                  isActive(item.href) ? "text-tone-fg underline underline-offset-8" : "text-tone-accent",
                )}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      </header>
    </>
  );
}
